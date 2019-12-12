import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Message,
    Row,
    Col,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu
} from 'element-ui'

Message.install = function (Vue, options) {
    Vue.prototype.$message = Message
}

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Message)
