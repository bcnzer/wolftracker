<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile exact key="4" v-if="!authenticated" @click="login()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile exact key="4" v-if="authenticated" @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <router-view 
              :auth="auth" 
              :authenticated="authenticated">
            </router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; Wolf Tracker 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import AuthService from './auth/AuthService'

  const auth = new AuthService()

  const { login, logout, authenticated, authNotifier } = auth

  export default {
    data () {
      authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        auth,
        authenticated,
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'pets', title: 'Wolves', to: '/' },
          { icon: 'cloud_upload', title: 'Upload Wolf', to: '/uploadwolf' },
          { icon: 'help_outline', title: 'About', to: '/about' }
        ],
        miniVariant: false,
        rightDrawer: false,
        title: 'Wolf Tracker'
      }
    },
    methods: {
      login,
      logout
    }
  }
</script>
