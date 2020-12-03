import store from '@/store'
import Discount from '@/views/admin/Discount'
import DiscountForm from '@/views/admin/Discount/form'
import DiscountShow from '@/views/admin/Discount/show'
import DiscountEdit from '@/views/admin/Discount/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Discounts = [

  {path: "/discounts",component: Discount, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/discounts/create",component: DiscountForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/discounts/show/:id",component: DiscountShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/discounts/:id/edit",component: DiscountEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
