<template>
<div>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  > 
  <template v-slot:[`item.UpdatedAt`]="{ item }">
      
        {{ formatdate(item.UpdatedAt) }}
    </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="openDialogRead(item.ID)"
              >
                mdi-eye
              </v-icon>
              </template></v-data-table>
        <messager :dialog="dialog" :closeDialogRead="closeDialogRead" :form="form"/>
</div>
</template> 

<script> 
import moment from 'moment'
import axios from '@/axios'
import messager from '../modals/messageread'
export default {
  props:{
    headers: Array,
    items: Array,
  },
  components:{
    messager
  },
  data(){
    return{
      dialog: false,
      form:{},
      store: 'api/messages',
    }
  },
  //       created(){
  //     this.fetchData()
  // },
methods:{
      formatdate(d) {
          return moment(d).fromNow();
        },
    openDialogRead(id){
      this.dialog = true
      this.updateMessages(id)
      this.fetchData(id)
    },
    closeDialogRead(){
      this.dialog = false

    },
     async fetchData(id){
      try{
        // console.log(this.store,this.$route.params.id)
          // const {data} = await axios.get(`${this.store}`)
          const {data} = await axios.get(`${this.store}/${id}`)
          this.form = data
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
        }
    },
     async updateMessages(id){
                try{
                  const {data} = await axios.put(`api/messages/${id}`)
                      if(data){
                      this.$router.push(this.redirect)
                      }
              }catch(err){
                  this.snackbar = true
                  this.errs = err.response.data

              }

        },
    },
      // async updateNortification(id){
      //           try{
      //             const {data} = await axios.put(`api/nortifications/${id}`)
      //                 if(data){
      //                 this.$router.push(this.redirect)
      //                 }
      //         }catch(err){
      //             this.snackbar = true
      //             this.errs = err.response.data

      //         }

      //   },

}
</script>

<style>

</style>