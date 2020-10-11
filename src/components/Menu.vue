<template>
  <span>
    <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-btn to="item.to">{{ item.title }}</v-btn>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      app
      color="primary"
      dark
      fixed
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text class="hidden-sm-and-down" to="/">
        <span class="mr-2">On-going Matches</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/upcoming">
        <span class="mr-2">Upcoming Matches</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/completed">
        <span class="mr-2">Completed Matches</span>
      </v-btn>
    </v-app-bar>
  </span>
</template>

<script>
// import LiveMatches from "./LiveMatches";
// import CompletedMatches from "./CompletedMatches";
export default {
  //   components: { CompletedMatches, LiveMatches },
  data() {
    return {
      drawer: false,
      fixed: false,
      appTitle: "Live Cricket Score",
      items: [
        {
          icon: "mdi-calculator",
          title: "On-going Matches",
          to: "/live",
        },
        {
          icon: "mdi-view-dashboard",
          title: "Completed Matches",
          to: "/completed",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
    };
  },
  computed: {},
  methods: {},
};
</script>
