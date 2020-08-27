Это проект что бы показать мой текущий опыт и практики, которые использую в своей работе.
Данный проект в данный момент не является законченным, готовым к PROD приложением, но достаточно близок к этому.

### Особенности проекта
* Локализация: сохранение локали в cookies, возможность менять язык
* Честный SSR с прокидыванием стейта редакса
* На примере авторизации пользователя показана работа с API
* Я больше фронт - по поводу архитектуры бэкенда у меня много вопросов, как и по шаринг типов между бэкендом и фронтом.
* Очень не нравится что `src/api` содержит жесткую привязку к методу хранения информации (redux/react state).
Но пока не нашел способа хорошо-поддерживаемого и понятного для работы с API, где бы логика загрузки от хранения данных была четко разделена.
Приемлимое решение еще одну папку создавать (aka `apiHooks` для хуков `useApi` и т.д. и `api` - для самой логики загрузки и парсинга данных с бэкенда), но кажется что и так уже достаточно сложно получилось.

### Особенности работы с формами
До этого проекта использовал 2 подхода:
* Свой конструктор форм, где вся бизнес-логика и правила отображения приходят с бэкенда. Решение проверено на очень 
сложном проекте где логика работы форм зависит от многих факторов. Минус - подходит только
 для проектов где не требуется большая кастомизация отображения интерфейса, улучшение UX часто требует много доработок
  для фронтов и бэкендеров
* Реализация простой обертки над `redux-forms`. Минус - логика работы с формами привязан к представлению. Нельзя
 отделить представление от логики, нельзя возвращать логику с бэкенда

В этом проекте конструктор форм написан с нуля на `final-form`. Вероятно, решение еще пока сырое, но у него есть преимущества:
* Отображение полностью отделено от логики: требуется просто набор стандартных полей, и дальше верстать их где нужно 
без лишней логики: `<Field name="login" label={msg(commonMessages.Login)}/>`
* В проекте я попробовал использовать общую модель данных на фронте и бэкенде.
В некоторых проектах, возможно, логичней доработать немного формы, чтобы они всегда приходили с бэкенда. 
Например когда там динамически добавляются/удаляются поля в зависимости от значений других полей.
* Это решение может хорошо себя показать только если есть дизайн-система - тогда поля будут верстаться предсказуемо в 
зависимости от типов. Без продуманной дизайн системы существуют риски что борьба с отступами, высоторй разных полей и т.д. 
будет очень дорого стоить

### Установка проекта
* Установить зависимости: `yarn install`
* Создать базу данных mysql, создать таблицы (`/etc/db.sql`)
* Создать пользователя. Если не задан пароль (`NULL`) - то первый вход будет всегда успешен, используемый пароль сохранится в БД  
* В папке `config/env` создать `.server.env`, заполнить значениями копировав переменные из `.example.dev.env`
* Для запуска в режиме dev запустить `yarn dev`
* Для запуска в режиме prod запустить `yarn build && yarn prod`
* Для запуска storybook выполнить `yarn storybook`

### Особенности работы с локализацией
* При добавлении новых сообщений перед публикацией проекта обязательно выполнить `yarn extract-intl` 
и посмотреть по diff какие новые ключи появились, что бы заполнить английские переводы

### TODO
* Добавить сборку в docker (для dev и для prod, что бы ручками не устанавливать mysql интервьюерам)
* Добавить eslint
* Добавить проверку типов ts
* Выполнять `yarn extract-intl` перед коммитом и валидатор на пустые значения сообщений
* Билдить storybook и добавить route `/storybook` (обычно в stage такое делаю, для demo-проекта его не будет)
* Добавить примеры unit-тестов
* Добавить протухание cookies, защитить cookies (httpOnly и т.д.), добавить чистку токенов из БД.
