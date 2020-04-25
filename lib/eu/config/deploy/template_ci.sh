#!/bin/bash

UNIT=infrastructure
PROJECT_NAME='front'
K8S_KLUSTER=$1
REPO_NAME=$2
DEPLOY_TOKEN=$3
NAMESPACE=$REPO_NAME
VERSION=v0.0.1

if [ ! "$K8S_KLUSTER" -o "$K8S_KLUSTER" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct k8s cluster name \033[0m\n"
  echo -en "\033[40;1;41m K8S_KLUSTER $K8S_KLUSTER \033[0m\n"
fi

if [ ! "$DEPLOY_TOKEN" -o "$DEPLOY_TOKEN" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct deploy token \033[0m\n"
  echo -en "\033[40;1;41m DEPLOY_TOKEN $DEPLOY_TOKEN \033[0m\n"
  echo -en "\033[40;1;41m To fix that - please run npm run setup \033[0m\n"
fi

if [ ! "$REPO_NAME" -o "$REPO_NAME" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct repo name \033[0m\n"
  echo -en "\033[40;1;41m REPO_NAME $REPO_NAME \033[0m\n"
fi

if [ ! "$1" -o "$1" == 'undefined' -o ! "$2" -o "$2" == 'undefined' -o ! "$3" -o "$3" == 'undefined' -o ! "$4" -o "$4" == 'undefined'  ];
then
  exit 2
fi

PREV_TAG=$(git describe --abbrev=0 --tags)
IFS='-'
read -ra ADDR <<<"$PREV_TAG"

LEN=${#ADDR[@]}
LAST_INDEX=${ADDR[$LEN - 1]}
NEXT_INDEX=$((LAST_INDEX + 1))
NEW_TAG="${VERSION}-${K8S_KLUSTER}-${NEXT_INDEX}"

mkdir -p ./k8s/v1/${PROJECT_NAME}/base/
mkdir -p ./k8s/v1/${PROJECT_NAME}/overlays/${K8S_KLUSTER}

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: ${NAMESPACE}
  name: ${PROJECT_NAME}
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  selector:
    matchLabels:
      app: ${PROJECT_NAME}
  template:
    metadata:
      name: ${PROJECT_NAME}
      labels:
        app: ${PROJECT_NAME}
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/metrics"
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - ${PROJECT_NAME}
                topologyKey: rack
              weight: 100
      containers:
        - name: ${PROJECT_NAME}
          image: git.wildberries.ru:4567/${UNIT}/${REPO_NAME}/${REPO_NAME}:${NEW_TAG}
          ports:
            - containerPort: 80
          env: []
      imagePullSecrets:
        - name: gitlab-registry-secret
---
apiVersion: v1
kind: Service
metadata:
  namespace: ${NAMESPACE}
  name: ${PROJECT_NAME}
spec:
  selector:
    app: ${PROJECT_NAME}
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
_EOF_

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/base/gitlab-registry-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  namespace: ${NAMESPACE}
  name: gitlab-registry-secret
data:
  .dockerconfigjson: ew0KICAiYXV0aHMiOiB7DQogICAgImdpdC53aWxkYmVycmllcy5ydTo0NTY3Ijogew0KICAgICAgImF1dGgiOiAiY21WbmFYTjBjbmxmYzNaak9uTTBXbE5JVDJkSWQwYzNZdz09Ig0KICAgIH0NCiAgfQ0KfQ==
type: kubernetes.io/dockerconfigjson
_EOF_

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/base/kustomization.yaml
resources:
  - deployment.yaml
  - gitlab-registry-secret.yaml
_EOF_

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/overlays/${K8S_KLUSTER}/kustomization.yaml
resources:
  - namespace.yaml
bases:
  - ../../base
patches:
  - patch.yaml
_EOF_

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/overlays/${K8S_KLUSTER}/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ${NAMESPACE}
_EOF_

cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/overlays/${K8S_KLUSTER}/patch.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: ${NAMESPACE}
  name: ${PROJECT_NAME}
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: ${PROJECT_NAME}
          image: git.wildberries.ru:4567/${UNIT}/${REPO_NAME}/${REPO_NAME}:${NEW_TAG}
          resources:
            limits:
              memory: "128Mi"
              cpu: "0.1"
_EOF_

cat << _EOF_ > ./deploy-service-client.conf.yaml
---
deploy_service_address: http://api.deploy-service.svc.k8s.datapro
deploy_service_auth_address: http://api.deploy-service.svc.k8s.datapro
manifests_path: k8s
project_token: ${DEPLOY_TOKEN}
images:
  - dockerfile: ./config/deploy/Dockerfile
    context: .
    name: ${PROJECT_NAME}
    build:
      - option: --ulimit
        value: nofile=262144:262144
      - option: --ulimit
        value: nproc=262144:262144
      - option: --build-arg
        value: VERSION=\${VERSION}
      - option: --build-arg
        value: APP_PKG_NAME=\${GO_PROJECT}
      - option: --build-arg
        value: GOOS=\${GOOS}
      - option: --build-arg
        value: PROJECT_NAME=${PROJECT_NAME}
_EOF_

if [ "${DRY_RUN}" == "true" ];
then
	exit 0
fi

git add "."
HUSKY_SKIP_HOOKS=1 git commit -m "'update tag $NEW_TAG'"
git tag -m "'$NEW_TAG'" -a "$NEW_TAG"
git push --follow-tags

echo -en "\n PROJECT_NAME: \e[40;1;42m $PROJECT_NAME \e[m\n"
echo -en "\n K8S_KLUSTER: \e[40;1;42m $K8S_KLUSTER \e[m\n"
echo -en "\n Tag is pushed: \e[40;1;42m $NEW_TAG \e[m\n"
