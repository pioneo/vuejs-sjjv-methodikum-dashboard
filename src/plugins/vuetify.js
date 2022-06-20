import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {
    iconfont: 'fa',
    options: {
        customProperties: true
    },
    theme: {
        light: true,
        themes: {
            light: {
                primary: '#424874',
                secondary: '#A6B1E1',
                accent: '#DCD6F7',//v-tabs-slider as well
                error: '#EA5455',
                info: '#FFD460',
                success: '#A8E6CF',
                warning: '#F07B3F',
                background: '#F0F5F9',
                white: "#FDFDFD"
            },
            dark: {
                primary: '',
                secondary: '',
                accent: '',
                error: '',
                info: '',
                success: '',
                warning: '',
                background: '',
                color1: ''
            }
        }
    }
}

export default new Vuetify(opts)