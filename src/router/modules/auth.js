// import store from '@/store'
import AdminRegister from '@/views/auth/register'
import adminLogin from '@/views/auth/login'


// var token = store.getters.Token
// var isadmin = store.getters.isadmin = true
export const auth = [
  {path: "/login",component: adminLogin},
  {path: "/register",component: AdminRegister}
]
