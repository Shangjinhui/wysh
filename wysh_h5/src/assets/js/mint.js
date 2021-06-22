import 'mint-ui/lib/style.css'
import Vue from 'vue'
import {
    InfiniteScroll,
    Toast
} from 'mint-ui'
Vue.use(InfiniteScroll)
// Vue.use(Toast)
// Vue.use(CheckboxGroup)
// Vue.use(Checkbox)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Input)
Vue.component(Toast.name, Toast)  //防止页面刷新空提示框
// Vue.component(MessageBox.name, MessageBox)

Vue.prototype.$toast = Toast
// Vue.prototype.$confirm = MessageBox.confirm