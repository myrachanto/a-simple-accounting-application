import store from '@/store'
import Dashboard from '@/views/admin/general/dashboard'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const general = [
  {path: "/dashboard",component: Dashboard, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
