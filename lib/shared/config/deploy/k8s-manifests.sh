#!/bin/bash

UNIT=portals
REPO_NAME=$1
DEPLOY_TOKEN=$2
NAMESPACE=$3
NAMESPACE_PASSPORT=$NAMESPACE
PROJECT_NAME='front'
KLUSTER_ARRAY=($4 $5 $6 $7)
VERSION=v0.0.5

PREV_TAG=$(git describe --abbrev=0 --tags)
IFS='-'
read -ra ADDR <<<"$PREV_TAG"

LEN=${#ADDR[@]}
LAST_INDEX=${ADDR[$LEN - 1]}
NEXT_INDEX=$((LAST_INDEX + 1))

if [ ! "$REPO_NAME" -o "$REPO_NAME" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct repo name \033[0m\n"
  echo -en "\033[40;1;41m REPO_NAME $REPO_NAME \033[0m\n"
  echo -en "\033[40;1;41m To fix that - please run npm run setup if you have cli \033[0m\n"
fi

if [ ! "$DEPLOY_TOKEN" -o "$DEPLOY_TOKEN" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct deploy token \033[0m\n"
  echo -en "\033[40;1;41m DEPLOY_TOKEN $DEPLOY_TOKEN \033[0m\n"
  echo -en "\033[40;1;41m To fix that - please run npm run setup if you have cli \033[0m\n"
fi

for K8S_KLUSTER in ${KLUSTER_ARRAY[@]};
do
  if [[ "$K8S_KLUSTER" && "$K8S_KLUSTER" != 'undefined' ]];
  then
  
  NEW_TAG="${VERSION}-${K8S_KLUSTER}-${NEXT_INDEX}"

if [ ! "$1" -o "$1" == 'undefined' -o ! "$2" -o "$2" == 'undefined' ];
then
  exit 2
fi

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
          image: git.wildberries.ru:4567/${UNIT}/${REPO_NAME}/${REPO_NAME}:${VERSION}-dataline-${NEXT_INDEX}
          volumeMounts:
            - name: certs-volume
              mountPath: "/certs"
      volumes:
        - name: certs-volume
          secret:
            secretName: front-certs
      
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
    - port: 443
      targetPort: 443
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

if [  "$K8S_KLUSTER" == 'test' -o "$K8S_KLUSTER" == 'stage' ];
then
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
    metadata:
      labels:
        app: front
        version: ${NEW_TAG}
    spec:
      containers:
        - name: ${PROJECT_NAME}
          image: git.wildberries.ru:4567/${UNIT}/${REPO_NAME}/${REPO_NAME}:${NEW_TAG}
          resources:
            limits:
              memory: "128Mi"
              cpu: "0.1"
          env:
            - name: CLUSTER
              value: ${K8S_KLUSTER}
            - name: NAMESPACE_PASSPORT
              value: ${NAMESPACE_PASSPORT}
_EOF_
fi

if [  "$K8S_KLUSTER" == 'dataline' -o "$K8S_KLUSTER" == 'datapro' ];
then
cat << _EOF_ > ./k8s/v1/${PROJECT_NAME}/overlays/${K8S_KLUSTER}/patch.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: ${NAMESPACE}
  name: ${PROJECT_NAME}
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: front
        version: ${NEW_TAG}
    spec:
      containers:
        - name: ${PROJECT_NAME}
          image: git.wildberries.ru:4567/${UNIT}/${REPO_NAME}/${REPO_NAME}:${NEW_TAG}
          resources:
            limits:
              memory: "1Gi"
              cpu: "1"
          env:
            - name: CLUSTER
              value: ${K8S_KLUSTER}
            - name: NAMESPACE_PASSPORT
              value: ${NAMESPACE_PASSPORT}
_EOF_
fi

cat << _EOF_ > ./deploy-service-client.conf.yaml
---
deploy_service_address: http://api.deploy-service.svc.k8s.datapro
deploy_service_auth_address: http://api.deploy-service.svc.k8s.datapro
manifests_path: k8s
project_token: ${DEPLOY_TOKEN}
images:
  - dockerfile: config/deploy/Dockerfile
    context: .
    name: ${REPO_NAME}
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
        value: BINARY_NAME=${REPO_NAME}
_EOF_

echo -en "\n \e[40;1;42m k8s folder generated for cluster ${K8S_KLUSTER}  \e[m\n"

  fi
done

git add "."
HUSKY_SKIP_HOOKS=1 git commit -m "update tag"

git push --no-verify


for K8S_KLUSTER in ${KLUSTER_ARRAY[@]};
do
  NEW_TAG="${VERSION}-${K8S_KLUSTER}-${NEXT_INDEX}"
  git tag -m "'$NEW_TAG'" -a "$NEW_TAG"
  echo -en "\n Tag is created: \e[40;1;42m $NEW_TAG \e[m\n"
  git push --tags

  # this is because of cluster dependency
  if [[ "$K8S_KLUSTER" != ${KLUSTER_ARRAY[${#KLUSTER_ARRAY[@]}-1]} && ${#KLUSTER_ARRAY[@]} != '1' ]];
  then
    echo -en "\n\033[40;1;41m PLEASE BE CAREFUL IF USE MULTIPLE CLUSTERS - THEY MAY HAVE DEPENDENCIES \033[0m\n"
  fi
done

echo -en "\n Deployed repo: \e[40;1;42m $REPO_NAME \e[m\n"


