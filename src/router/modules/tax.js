import store from '@/store'
import Tax from '@/views/admin/Tax'
import TaxForm from '@/views/admin/Tax/form'
import TaxShow from '@/views/admin/Tax/show'
import TaxEdit from '@/views/admin/Tax/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Taxs = [

  {path: "/tax",component: Tax, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/tax/create",component: TaxForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/tax/show/:id",component: TaxShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/tax/:id/edit",component: TaxEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
