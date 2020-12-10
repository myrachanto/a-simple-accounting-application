<template>
<back>
  <v-container>
    <v-row><v-col>
       <v-toolbar
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>


      <v-btn >
        Pdf
      </v-btn>

      <v-btn >
        Excel
      </v-btn>
    </v-toolbar> <template>
  <v-expansion-panels>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        Search
      </v-expansion-panel-header>
      <v-expansion-panel-content>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
            @keyup.enter="GetData"
          ></v-text-field>
        </v-col>

       
        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData"
    >
      Search
    </v-btn>
         <v-btn class="ma-2" 
      depressed
      color="primary"
      @click="resetFilter"
    >
      Reset
    </v-btn>
        </v-col>
      </v-row></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </template>
      </v-col></v-row>
    <v-row><v-col>
<h1>All users</h1>
 <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >  
  
   <template v-slot:[`item.actions`]="{ item }">
              
              <v-btn class="ma-2" 
                  depressed
                  color="primary" 
                  @click="editItem(item)"
                >
                  Edit Roles
    </v-btn>
            </template></v-data-table>
  </v-col>
 </v-row><v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Update the User Role Status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                 <v-select
                    v-model="role"
                  :items="itemos"
                  label="Role"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save(form)"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</back>
</template>
<script>
 import axios from '@/axios'
import back from '@/layouts/back'
export default {
      name: 'usersIndex',
    components:{
        back,
        
    },
      data(){
          return{
            role:'',
            form:{},
              title:'users',
              source: '/api/users',
              show: '/users/',
              search : '',
              page:1,
              pagesize:12,
              dialog:false,
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'First Name', value: 'fname' },
                { text: 'Last Name', value: 'lname' },
                { text: 'User Name', value: 'uname' },
                { text: 'Email', value: 'email' },
                { text: 'Phone', value: 'phone' },
                { text: 'Address', value: 'address' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
                itemos:[
                  "employee",
                  "supervisor",
                  "admin",
                ],
             items:[],
            
          }
      },

    created(){
          this.GetData()
       },
       methods:{
        editItem(item) {
          //  console.log(item)
          this.editedIndex = this.items.indexOf(item);
          this.form = Object.assign({}, item);
          this.dialog = true;
        },
        close() { 
          this.dialog = false;
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
          });
        },
        resetFilter(){
            this.search = ''
            this.page=1,
            this.pagesize=12     
            this.GetData()
        },

         async save(form) {
          try {
            let fd = new FormData();
            fd.append("role", this.role);
            fd.append("usercode", this.$store.getters.usercode);
            await axios.put(`api/users/role/${form.ID}`, fd, {
              "Content-Type": "multipart/form-data",
            });
            this.close()
            this.GetData()
          } catch (err) {
            this.close()
            this.snackbar = true;
            this.errs = err.response.data
          }
        },
       async GetData(){
        try{
          let vm = this
           const {data} = await axios.get(`${this.source}?q=${vm.search}&&page=${vm.page}&&pagesize=${vm.pagesize}`)
            this.items = data 

            // console.log(data)
        }catch(err){
           console.log(err)
        }
       }, 
       }
}
</script>

<style>

</style>