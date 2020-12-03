import store from '@/store'
import Category from '@/views/admin/Category'
import CategoryForm from '@/views/admin/Category/form'
import CategoryShow from '@/views/admin/Category/show'
import CategoryEdit from '@/views/admin/Category/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Categorys = [

  {path: "/categorys",component: Category, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/categorys/create",component: CategoryForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/categorys/show/:id",component: CategoryShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/categorys/:id/edit",component: CategoryEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
