<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{user.uid}}</h1>
    <h1>{{user.email}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  get user() {
    return this.$store.getters.user;
  }
}
</script>
