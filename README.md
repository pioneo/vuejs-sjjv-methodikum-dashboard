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

Run the script to install all required libaries:

```
. run-install-libraries.sh
```

This will install the following libraries:
- npm install vuefire firebase: https://vuefire.vuejs.org/vuefire/
- npm install vue-router@3: https://router.vuejs.org/
- npm install vuetify --save: https://vuetifyjs.com/en/
- npm install vuex@next --save: https://vuex.vuejs.org/

### Firebase connection

Retrieve the Firebase configuration from the corresponding Firebase project (Web App settings):
```
{
    "apiKey": "apikey",
    "authDomain": "xxx.firebaseapp.com",
    "databaseURL": "https://xxx.firebaseio.com",
    "projectId": "xxx",
    "storageBucket": "xxx.appspot.com",
    "messagingSenderId": "123456789",
    "appId": "xxx",
    "measurementId": "xxx"
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

