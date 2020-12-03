import store from '@/store'
import Supplier from '@/views/admin/Suppliers'
import SupplierForm from '@/views/admin/Suppliers/form'
import SupplierShow from '@/views/admin/Suppliers/show'
import SupplierEdit from '@/views/admin/Suppliers/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Suppliers = [
  {path: "/supplier",component: Supplier, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/supplier/create",component: SupplierForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/supplier/show/:id",component: SupplierShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/supplier/:id/edit",component: SupplierEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
