import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItemGroup,
  Submenu,
  MenuItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Tooltip,
  MessageBox

} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
