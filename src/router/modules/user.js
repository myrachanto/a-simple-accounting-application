import store from '@/store'
import User from '@/views/admin/User'
import UserShow from '@/views/admin/User/show'
// import UserEdit from '@/views/admin/Users/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Users = [

  {path: "/users",component: User, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/user/messages",component: UserShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }}
]