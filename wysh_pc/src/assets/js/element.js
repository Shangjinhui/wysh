import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import {
    Pagination,
    // DatePicker,
    // Checkbox,
    // CheckboxGroup,
    // Dropdown,
    // DropdownMenu,
    // DropdownItem,
    // Input,
    Message,
    MessageBox,
    InfiniteScroll
} from 'element-ui'
Vue.use(Pagination)
// Vue.use(DatePicker)
// Vue.use(CheckboxGroup)
// Vue.use(Checkbox)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Input)
Vue.use(InfiniteScroll)
Vue.component(Message.name, Message)  //防止页面刷新空提示框
Vue.component(MessageBox.name, MessageBox)

Vue.prototype.$message = Message
// Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert