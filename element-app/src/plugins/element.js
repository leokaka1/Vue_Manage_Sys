import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Message
} from 'element-ui'

Message.install = function (Vue, options) {
    Vue.prototype.$message = Message
}

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Message)
