import store from '@/store'
import Majorcat from '@/views/admin/Majorcat'
import MajorcatForm from '@/views/admin/Majorcat/form'
import MajorcatShow from '@/views/admin/Majorcat/show'
import MajorcatEdit from '@/views/admin/Majorcat/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Majorcats = [

  {path: "/majorcat",component: Majorcat, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/majorcat/create",component: MajorcatForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/majorcat/show/:id",component: MajorcatShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/majorcat/:id/edit",component: MajorcatEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
