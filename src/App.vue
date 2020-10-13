<template>
  <v-app>
    <Menu></Menu>
    <!-- <MatchInfo></MatchInfo> -->
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Menu from "./components/Menu.vue";
// import LiveMatches from "./components/LiveMatches.vue";
// import MatchInfo from "./components/MatchInfo";

export default {
  name: "App",

  components: {
    Menu,
    // LiveMatches,
    // MatchInfo,
  },

  data: () => ({
    //
  }),
};
</script>
