<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog2">

                  <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
      <v-card 
    class="mx-auto my-12"
    max-width="500">
        <v-card-title>
          <span class="headline">Create message</span>
        </v-card-title>
        <v-card-text>
          <v-container><template >  
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
            <v-row>              <v-col
                  cols="12"
                  md="12"
                > <validation-provider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                  >
                  <v-text-field
                    v-model="form.name"
                    :error-messages="errors"      
                    label="Name"
                    required
                  ></v-text-field>
                  </validation-provider>
                </v-col>
                 <v-col
                  cols="12"
                  md="12"
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
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog2"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save()"
          > 
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
                  </ValidationObserver>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from '@/axios'
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
  name: "messagemodal",

  components: {
      ValidationProvider,
      ValidationObserver,
    },
    props: ['dialog2','closeDialog2','users'],
    data(){
      return{
       form:{
            name:'',
            title:'',
            description:'',
            majorcategory:''
        },
        errs:{},
        option:[],
        title:'Create',
        // init:'api/tax/view',
        redirect: '/tax',
        store: 'api/tax',
        method: 'post',
        snackbar:false,
        timeout:3000
      }
    },
    methods: {
     async save(){
        try{
          console.log(this.form)
                const response = await axios.post(this.store, {
                    name: this.form.name,
                    title: this.form.title,
                    description: this.form.description,
                    usercode: this.$store.getters.usercode,
                })
                if(response.status === 201){
                    this.$router.push(this.redirect)
                }
        }catch(err){
            this.snackbar = true
            console.log(err)
            this.errs = err.response.data
    
        }
    },
    },
  }
</script>