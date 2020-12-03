import store from '@/store'
import Expence from '@/views/admin/Expence'
import ExpenceForm from '@/views/admin/Expence/form'
import ExpenceShow from '@/views/admin/Expence/show'
import ExpenceEdit from '@/views/admin/Expence/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Expences = [

  {path: "/expence",component: Expence, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/expence/create",component: ExpenceForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/expence/show/:id",component: ExpenceShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/expence/:id/edit",component: ExpenceEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
