import store from '@/store'
import Price from '@/views/admin/Price'
import PriceForm from '@/views/admin/Price/form'
import PriceShow from '@/views/admin/Price/show'
import PriceEdit from '@/views/admin/Price/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Prices = [

  {path: "/prices",component: Price, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/prices/create",component: PriceForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/prices/show/:id",component: PriceShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/prices/:id/edit",component: PriceEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
