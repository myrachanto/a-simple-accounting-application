<template>
    <v-dialog
      v-model="dialog">
                  <v-card  
                      class="mx-auto my-12"
                      max-width="500">
               <v-row class="fill-height">
              
                 <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">
                       Message
                      </h1>
                                                        <template>
                                    <v-card color="basil">
                                      <v-card-title class="text-center justify-center py-6">
                                        <h1 class="font-weight-bold display-1 basil--text">
                                         {{form.Name}}
                                        </h1>

                                      </v-card-title>
                                        <v-card
                                            color="basil"
                                            flat
                                          >
                                            <v-card-text>
                                              <v-card-title class="text-center display-1">Name: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.name}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Subject: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.title}}</span></v-card-title>
                                              <v-card-title class="text-center display-1">Description: <span class="text-center ml-3 display-1 teal--text text--accent-3">{{form.description}}</span></v-card-title>
                                           </v-card-text>
                                          </v-card>

                                      
                                    </v-card>
                                  </template>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDialogRead"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                    </v-col>
               </v-row>
              
          </v-card>
    </v-dialog>
</template>
<script>
  
export default {
  name: "messagereadmodal",

    props: ['dialog','closeDialogRead', 'form'],
    data(){
      return{
      }
    },
  
  }
</script>