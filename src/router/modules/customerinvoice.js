import store from '@/store'
import CustomerInvoice from '@/views/admin/CustomerInvoice'
import CustomerInvoiceForm from '@/views/admin/CustomerInvoice/form'
import CustomerInvoiceShow from '@/views/admin/CustomerInvoice/show'
import CustomerInvoiceEdit from '@/views/admin/CustomerInvoice/edit'
import CustomerCredit from '@/views/admin/Customercredit/index'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const CustInvoice = [

  {path: "/creditnotes",component: CustomerCredit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/invoice",component: CustomerInvoice, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/invoice/create",component: CustomerInvoiceForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/invoice/show/:id",component: CustomerInvoiceShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/invoice/:id/edit",component: CustomerInvoiceEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
