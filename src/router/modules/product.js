import store from '@/store'
import Product from '@/views/admin/Products'
import ProductForm from '@/views/admin/Products/form'
import ProductShow from '@/views/admin/Products/show'
import ProductEdit from '@/views/admin/Products/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Products = [
  {path: "/products",component: Product, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/products/create",component: ProductForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/products/show/:id",component: ProductShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/products/:id/edit",component: ProductEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
