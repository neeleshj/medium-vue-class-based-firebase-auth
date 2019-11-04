<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>App Name</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!userLoggedIn">
        <v-btn flat v-for="item in itemsNoAuth" :key="item.title" :to="item.link">
          {{item.title}}
          <v-icon right>{{item.icon}}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn flat v-for="item in itemsAuth" :key="item.title" :to="item.link">
          {{item.title}}
          <v-icon right>{{item.icon}}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn flat @click="logout">
          Logout
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class NavBar extends Vue {
  get itemsNoAuth() {
    let menuItems = [
      {
        title: "Register",
        icon: "add",
        link: "/register"
      },
      {
        title: "Login",
        icon: "send",
        link: "/login"
      }
    ];
    return menuItems;
  }

  get itemsAuth() {
    let menuItems = [
      {
        title: "Home",
        icon: "home",
        link: "/"
      }
    ];
    return menuItems;
  }

  get userLoggedIn() {
    return this.$store.getters.user;
  }

  public logout() {
    this.$store.dispatch("LOGOUT_USER");
  }
}
</script>

<style scoped>
</style>