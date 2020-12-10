import store from '@/store'
import Asset from '@/views/admin/Asset'
import AssetForm from '@/views/admin/Asset/form'
import AssetShow from '@/views/admin/Asset/show'
// import AssetEdit from '@/views/admin/Assets/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Assets = [

  {path: "/assets",component: Asset, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/assets/create",component: AssetForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/assets/show/:id",component: AssetShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  // {path: "/Assets/allocation",component: AssetAllocation, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
  // {path: "/Assets/allocation/:code",component: AssetAllocationShow, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
  // {path: "/Assets/:id/edit",component: AssetEdit, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
]
