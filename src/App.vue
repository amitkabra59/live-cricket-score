<template>
  <v-app>
    <Menu></Menu>
    <live-matches></live-matches>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Menu from "./components/Menu.vue";
import LiveMatches from "./components/LiveMatches.vue";

export default {
  name: "App",

  components: {
    Menu,
    LiveMatches,
  },

  data: () => ({
    //
  }),
};
</script>
