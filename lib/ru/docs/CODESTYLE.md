CodeStyle проекта

------- 1) Все селекторы начинаются с get (например getLoadingStatus)

------- 3) Имена переменных и функций даются строго в соответствии с обозначаемой сущностью
см статью https://ymatuhin.ru/front-end/how-to-name-variables/
Исключения:
    а) const cn = classNames.bind(styles) - cx является названием функции, которая вызывается для присваивания класса в разметке
    б) const t = i18next.t - t является функцией переводчиком 

------- 4) Использовать только функциональные выражения (functional expressions) с присвоением через const:

const foo = () => 'bar'

------- 5) Внутри блока if() необходимо явно приводить к типу Boolean если тип переменной не boolean во избежании ошибок приведения типов

if(Boolean(this.state.foo)){
    ...
}

------- 6) Все action-creators который направлены на взаимодействие с redux-saga-watcher должны
иметь добавление в конце имени Saga, а у константы _Saga
    - const logoutActionSaga: BaseAction = () => ({type: LOGOUT_USER_Saga});

------- 8) Разрешается экспортировать из файла только несвязанные между собой функции

// нельзя экспортировать
export const foo = (value) => 'Hello '+value
export const baz = () => foo('Nick')

// можно экспортировать
export const foo = (value) => 'Hello '+value
export const baz = () => 'Hello Nick'

// лучший вариант!
// файл foo.js
export const foo = (value) => 'Hello '+value 

// файл baz.js
export const baz = () => 'Hello Nick' 

P.S. это связано с тем, что при тестировании функции foo, нужно будет мокать сторонние модули, и если данные модули не находятся в разных файлах, мокать не получится => протестировать не получится.

------- 9) Имена файлов и папок не должны содержать заглавных букв! Возникнут проблемы у пользователей ОС Windows

------- 10) Не должно быть типов в тестах. Нужно писать тип any для вариативности теста 

------- 11) Существует три типа компонентов,

    а) View компоненты
    Пример:
    src/_components/text

    b) Container компоненты
    Пример:
    репозиторий https://git.wildberries.ru/portals/suppliers-portal-business-card-frontend
    путь src/pages/home/page/_components/warehouses/_components/warehouse-form/index.jsx

    c) Redux-linked-view компоненты
    Пример:
    репозиторий https://git.wildberries.ru/portals/suppliers-portal-business-card-frontend
    путь src/pages/home/page/_components/title/index.tsx

------- 12) Методологию работы с формой смотрите в репозитории

    репозиторий https://git.wildberries.ru/portals/suppliers-portal-business-card-frontend
    путь src/pages/home/page/_components/warehouses/_components/warehouse-form/index.jsx

    Вкрадце:
    Если форма планируется что будет иметь некий компонент на время загрузки отправки формы (спиннер), или иметь предзагруженные данные, то для данной формы должен быть заведён отдельный модуль в редаксе с полями isLoading,data где

     - isLoading - состояние загрузки формы
     - data - данные формы (необходимо при каждом изменении стейта формы в редакс - прересохранять значения, тк они могут быть сброшены)

------- 13) На одну вотчер сагу - Одна воркер сага