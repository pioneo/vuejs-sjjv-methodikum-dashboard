# Methodikum Firebase Connector

* [Technology Stack](#technology-stack)
* [Project setup](#project-setup)
    * [Install requirements](#install-requirements)
    * [Firebase connection](#firebase-connections)
    * [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    * [Compiles and minifies for production](#compiles-and-minifies-for-production)
    * [Customize configuration](#customize-configuration)
* [Dependencies](#dependencies)


## Technology Stack
- **Vue.js**
- **Firebase Firestore**

## Project setup
```
npm install
```

### Install requirements

This project is based on Vue 2. Run the script to install all required libraries (Vue 2 compatible versions):

```
. run-install-libraries.sh
```

This will install the following libraries:
- npm install vuefire firebase: https://vuefire.vuejs.org/vuefire/
- npm install vue-router@3: https://router.vuejs.org/
- npm install vuetify --save: https://vuetifyjs.com/en/
- npm install vuex@3 --save: https://vuex.vuejs.org/

### Firebase connection

Retrieve the Firebase configuration from the corresponding Firebase project (Web App settings):
```
{
  "apiKey": "my-api-key",
  "authDomain": "my-auth-domain",
  "databaseURL": "my-database-url",
  "projectId": "my-project-id",
  "storageBucket": "my-storage-bucket",
  "messagingSenderId": "my-messaging-sender-id",
  "appId": "my-app-id",
  "measurementId": "my-measurement-id"
}
```
and store it as JSON file: 'firebaseConfig.json'


Add the Firebase configuration file (named 'firebaseConfig.json') to: 
```
src/modules/firebase/assets/firebaseConfig.json
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Dependencies
- **Vuefire**
    <br> [Vuefire](https://vuefire.vuejs.org/vuefire/) is a solution to create a realtime connection between a Vue application and a Firebase RTDB or a Firebase Cloud Firestore.
    <br>LICENSE: MIT
- **Vue-router**
    <br> [Vue-router](https://router.vuejs.org/) is the official router for Vue.js.
    <br>LICENSE: MIT
- **Vuetify**
    <br> [Vuetify](https://vuetifyjs.com/en/) is a UI library for Vue.js.
    <br>LICENSE: MIT
- **Vuex store**
    <br> [Vuex store](https://vuex.vuejs.org/) is a state management library for Vue.js.
    <br>LICENSE: MIT

