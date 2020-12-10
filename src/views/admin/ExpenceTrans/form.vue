<template>
<back>
  <v-container>   
    <v-toolbar
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

    </v-toolbar>
    <v-form>
      <v-card >
    <v-row><v-col cols="12" md="4">
      <v-row><v-col>
      <v-autocomplete
                  v-model="expence"
                  :items="expences"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Search Expence..."
                  solo
                  @change="getExpence(expence)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for 
                        <strong>Expence</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-account-circle
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
  </v-col></v-row><v-row>
  <v-col>
      <v-autocomplete
                  v-model="liability"
                  :items="liabilitys"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Search Liability..."
                  solo
                  @change="getlia(liability)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for 
                        <strong>Liability</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-account-circle
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
  </v-col></v-row><v-row>
  <v-col >
      <v-autocomplete
                  v-model="asset"
                  :items="assets"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Search Asset..."
                  solo
                  @change="getassets(asset)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for 
                        <strong>Asset</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-account-circle
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
                </v-col></v-row>
  </v-col>
  <v-col cols="12" md="8">
      <v-card 
    class="ma-5">
        <v-row align="center" justify="center" v-if="expen.expencecode">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title> Name: {{expen.name}} </v-card-title>
              <v-card-title>Code: {{expen.expencecode}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Title: {{expen.title}}</v-card-title>
              <v-card-title>User Code: {{expen.usercode}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" min-height="130">
              <p > Description:{{expen.description}}</p>
            </v-card>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" v-if="expen.liacode">
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title> Name: {{expen.name}} </v-card-title>
              <v-card-title>Code: {{expen.liacode}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title>Creditor: {{expen.creditor}}</v-card-title>
              <v-card-title>Approved By: {{expen.approvedby}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title>Monthly payment: {{expen.monthlypayment}}</v-card-title>
              <v-card-title>Amount: {{expen.amount}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto" min-height="130">
              <p> Description:{{expen.description}}</p>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row align="center" justify="center" v-if="expen.assetcode">
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title> Name: {{expen.name}} </v-card-title>
              <v-card-title>Code: {{expen.assetcode}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title>Ownership: {{expen.ownership}}</v-card-title>
              <v-card-title>Depreciation Rate: {{expen.depreciationrate}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto">
              <v-card-title>Liscence: {{expen.liscence}}</v-card-title>
              <v-card-title>Amount: {{expen.price}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <v-card class="mx-auto" min-height="130">
              <p> Description:{{expen.description}}</p>
            </v-card>
          </v-col>
        </v-row>
        <div v-if="expen.name">
                  <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
                      <template >  
                                  <v-snackbar
                                  :timeout="timeout"
                                  v-model="snackbar"
                                  :value="true"
                                  absolute
                                  left
                                  shaped
                                  top
                                  dismisable
                                  color="red"
                                >
                              <h2>{{errs.error}}</h2>
                              <p>{{errs.message}}</p>
                                </v-snackbar>
                            
                          </template>
                              <v-row >
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="title"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.title"
                                        :error-messages="errors"      
                                        label="Title"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4">
                                      <validation-provider
                                        v-slot="{ errors }"
                                        name="amount"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.amount"
                                        :error-messages="errors"      
                                        label="Amount"
                                        type="Number"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      md="4">
                                      <validation-provider
                                        v-slot="{ errors }"
                                        name="direct"
                                        rules="required"
                                      >
                                      <v-select
                                    v-model="form.direct"
                                  :items="itemos"
                                  :error-messages="errors" 
                                  label="Status"
                                ></v-select>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Description"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.description"
                                        label="Description"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>

                    <div class="text-center mt-3">
                      <v-btn class="ma-3" color="teal accent-3" @click="save">Save</v-btn>
                    </div>
                  </ValidationObserver>
        </div>
      </v-card>
  </v-col></v-row>
      </v-card>
    </v-form>
  </v-container>
</back>
</template>
<script>
 import axios from '@/axios'
import back from '@/layouts/back'
 import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  name: "login",
  components: {
      ValidationProvider,
      ValidationObserver,
      back
    },
      data(){
          return{
            status:'',
            form:{
              name:'',
              title:'',
              description:'',
              status:'',
              amount:0,
            },
              title:'Expence Processing',
              source: 'api/expencetransanctions/view',
              dialog: false,
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'suppliername' },
                { text: 'Description', value: 'description' },
                { text: 'Payment Form', value: 'type' },
                { text: 'Clearance Date', value: 'clearancedate' },
                { text: 'Amount', value: 'amount' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
                itemos:[
                  "inderect",
                  "direct",
                ],
              errs:{},
              snackbar:false,
              timeout:3000,
              operators:['like'],
              asset:{},
              liability:{},
              expence:{},
             assets:[],
             liabilitys:[],
             expences:[],
             expen:{}          
          }
      },

    created(){
          this.GetData()
       },
      //  computed:{
      //    getExpence(name){

      //    }
      //  },
       methods:{
        getExpence(name){
          let exp = this.expences.find(a => {
                  return a.name == name
                })
              this.expen = exp
        },
        getlia(name){
          let exp = this.liabilitys.find(a => {
                  return a.name == name
                })
              this.expen = exp
        },
        getassets(name){
          let exp = this.assets.find(a => {
                  return a.name == name
                })
              this.expen = exp
        },

        editItem(item) {
          //  console.log(item)
          this.editedIndex = this.pending.indexOf(item);
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
         async save() {
           var code = ''
           if (this.expen.expencecode){
             code = this.expen.expencecode
           }else if(this.expen.liacode){
             code = this.expen.liacode
           }else{
             code = this.expen.assetcode
           }


          try {
            let fd = new FormData();
            fd.append("name", this.expen.name);
            fd.append("title", this.form.title);
            fd.append("description", this.form.description);
            fd.append("amount", this.form.amount);
            fd.append("status", this.form.status);
            fd.append("code", code);
            fd.append("usercode", this.$store.getters.usercode);
            await axios.post("api/expencetransanctions/create", fd, {
              "Content-Type": "multipart/form-data",
            });
            this.$router.push('/expenceTran');
          } catch (err) {
            this.snackbar = true;
            this.errs = err.response.data
          }
        },
          async GetData(){
            try{
              const {data} = await axios.get(this.source)
                const {assets,expences,liabilitys} = data  
              this.assets = assets
              this.expences = expences
              this.liabilitys = liabilitys
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