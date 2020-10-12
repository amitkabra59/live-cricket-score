<template>
  <v-app id="live">
    <v-col
      v-for="(item, index) in matchInfo"
      cols="6"
      :key="index"
      align-self="center"
    >
      <v-card elevation="2">
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-toolbar-title
              ><div
                @click="
                  this.window.location.href = 'http://localhost:8000/completed'
                "
              >
                {{ item.home }} vs {{ item.away }}
              </div></v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <!-- <p class="display-1 text--primary">
            {{ item.home }} vs {{ item.away }}
          </p> -->
        </v-card-text>
      </v-card>

      <v-divider :key="`divider-${index}`"></v-divider>
    </v-col>
  </v-app>
</template>

<script>
const dotenv = require("dotenv");
// import Menu from "./Menu";
dotenv.config();
export default {
  //   components: { Menu },
  data() {
    return {
      info: null,
      matchId: String,
      seriesId: String,
      responseAvailable: false,
      apiKey: process.env.API_KEY,
      ongoing: 0,
      matches: null,
      matchInfo: [],
    };
  },
  mounted() {
    this.fetchApiData();
  },
  methods: {
    fetchApiData() {
      fetch(
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?inprogresslimit=55",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "733111b33bmshcd8aef05769f691p1598d2jsnfb47abdea95a",
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((response) => {
          this.info = response;
          this.responseAvailable = true;
          if (this.info.meta.inProgressMatchCount > 0) {
            this.ongoing = this.info.meta.inProgressMatchCount;
            console.log(this.ongoing);
            this.matches = this.info.matchList.matches.filter(
              (mat) => mat.status === "LIVE"
            );

            this.matches.map((data) => {
              (this.matchId = data.id), (this.seriesId = data.series.id);
              if (data.homeTeam.isBatting) {
                this.matchInfo.push({
                  home: data.homeTeam.name,
                  away: data.awayTeam.name,
                  batting: data.homeTeam.name,
                });
              } else {
                this.matchInfo.push({
                  home: data.homeTeam.name,
                  away: data.awayTeam.name,
                  batting: data.awayTeam.name,
                });
              }
            });
            console.log(this.matchInfo);
          } else {
            alert("No matches ongoing");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#live {
  margin: 5rem auto;
  /* padding: 0 5rem; */
}
</style>