import store from '@/store'
import Liability from '@/views/admin/Liability'
import LiabilityForm from '@/views/admin/Liability/form'
import LiabilityShow from '@/views/admin/Liability/show'
// import LiabilityEdit from '@/views/admin/Liabilitys/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Liabilitys = [

  {path: "/liability",component: Liability, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/liability/create",component: LiabilityForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/liability/show/:id",component: LiabilityShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  // {path: "/Liabilitys/allocation",component: LiabilityAllocation, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
  // {path: "/Liabilitys/allocation/:code",component: LiabilityAllocationShow, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
  // {path: "/Liabilitys/:id/edit",component: LiabilityEdit, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
]
