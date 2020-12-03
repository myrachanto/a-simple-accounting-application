import store from '@/store'
import SupplierInvoice from '@/views/admin/SupplierInvoice'
import SupplierInvoiceForm from '@/views/admin/SupplierInvoice/form'
import SupplierInvoiceShow from '@/views/admin/SupplierInvoice/show'
import SupplierInvoiceEdit from '@/views/admin/SupplierInvoice/edit'
import SupplierCredit from '@/views/admin/Suppliercredit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const SupInvoice = [

  {path: "/grnnotes",component: SupplierCredit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/sinvoice",component: SupplierInvoice, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/sinvoice/create",component: SupplierInvoiceForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/sinvoice/show/:id",component: SupplierInvoiceShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/sinvoice/:id/edit",component: SupplierInvoiceEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
