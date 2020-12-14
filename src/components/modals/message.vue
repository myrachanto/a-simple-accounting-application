<template>
  <v-row justify="center">
    <v-dialog
    
      v-model="dialog">

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
            <v-row>
                <v-col
                                      cols="12"
                                    >  <v-autocomplete
                                        v-model="user"
                                        :items="users"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="uname"
                                        item-value="uname"
                                        label="Search User..."
                                        solo
                                      @change="getUser(user)"
                                      >
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>User</strong>
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
                                            <span v-text="item.uname"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.uname.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.uname"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.fname}}  {{item.lname}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-account-circle</v-icon>
                                          </v-list-item-action>
                                        </template>
                                      </v-autocomplete>
                </v-col>
                                      <v-col
                  cols="12"
                  md="12"
                > <validation-provider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                  >
                  <v-text-field
                    v-model="form.title"
                    :error-messages="errors"      
                    label="Subject"
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
            @click="closeDialog"
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
    props: ['dialog','closeDialog','users'],
    data(){
      return{
        form:{
            title:'',
            description:'',
        },
        user:'',
        userd:{},
        errs:{},
        store: 'api/messages',
        snackbar:false,
        timeout:3000
      }
    },
    methods: {
      
    getUser(name) {
      console.log(name)
      const userdata = this.users.find(user => {
        return user.uname == name
      })
      this.userd = userdata
      console.log(this.userd)
    },

    async save() {
      console.log("try again")
      try {       
      console.log("try again in =side try") 
        let fd = new FormData();
        fd.append("title", this.form.title);
        fd.append("description", this.form.description);
        fd.append("tousercode", this.userd.usercode);
        fd.append("fromusercode", this.$store.getters.usercode);
       console.log("try again with fd")
        await axios.post('api/messages', fd, { 
          "Content-Type": "multipart/form-data",
        });
      console.log("try again, success")
        this.closeDialog()
      } catch (err) {
        this.snackbar = true;
        this.errs = err.response.data
      }
    },
    },
  }
</script>