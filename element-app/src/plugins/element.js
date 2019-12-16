// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
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
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Table,
    TableColumn,
    Dialog,
    Pagination,
    Card,
    Breadcrumb,
    BreadcrumbItem
} from 'element-ui'

Message.install = function (Vue, options) {
    Vue.prototype.$message = Message
}

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
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
