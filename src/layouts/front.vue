<template>
<v-app id="inspire">
       <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
        
    <v-app-bar app>
      <!-- <span class="hidden-sm-and-up"><v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon></span> -->
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
            <v-toolbar-title>
              <router-link to="/" tag="span" style="cursor: pointer">
                {{ appTitle }}
              </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
              <v-btn text
              to="/">
              <v-icon left dark>
                home
              </v-icon>
              Home
              </v-btn>
              
            </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>

    <foot/>
  </v-app>
</template>

<script>
import foot from './foot'
  export default {
    data: () => ({ drawer: null,
             appTitle: 'Accounting',
            sidebar: false,
            menuItems: [
                { title: 'Home', path: '/', icon: 'home' },
                
          ]
    }),
    components:{
        foot,
    },
    methods:{
        home(){
        this.$router.push("/")
        },
    }
  }
</script>