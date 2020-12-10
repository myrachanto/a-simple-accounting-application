import store from '@/store'
import ExpenceTran from '@/views/admin/ExpenceTrans'
import ExpenceTransForm from '@/views/admin/ExpenceTrans/form'
import ExpenceTransShow from '@/views/admin/ExpenceTrans/show'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const ExpenceTrans = [

  {path: "/expenceTran",component: ExpenceTran, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/expenceTran/create",component: ExpenceTransForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/expenceTran/show/:id",component: ExpenceTransShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]