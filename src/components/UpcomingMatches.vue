<template>
  <v-app id="up">
    <v-row>
      <v-col
        v-for="(item, index) in matchInfo"
        cols="12"
        sm="10"
        lg="6"
        xl="6"
        :key="index"
        align-self="center"
      >
        <v-card elevation="2">
          <v-card-title class="pa-0">
            <v-toolbar flat>
              <v-toolbar-title
                >{{ item.home }} vs {{ item.away }}</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <p>Start date: {{ item.startDateTime }}</p>
            <p>Venue: {{ item.venue }}</p>
            <p>
              <b>{{ item.matchSummaryText }}</b>
            </p>
          </v-card-text>
        </v-card>

        <v-divider :key="`divider-${index}`"></v-divider>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
const dotenv = require("dotenv");
dotenv.config();
export default {
  data() {
    return {
      info: null,
      responseAvailable: false,
      apiKey: process.env.API_KEY,
      upcoming: 0,
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
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?upcominglimit=150",
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
          if (this.info.meta.upcomingMatchCount > 0) {
            this.upcoming = this.info.meta.upcomingMatchCount;
            this.matches = this.info.matchList.matches.filter(
              (mat) => mat.status === "UPCOMING"
            );

            this.matches.map((data) => {
              if (data.homeTeam.name != "Unknown") {
                this.matchInfo.push({
                  home: data.homeTeam.name,
                  away: data.awayTeam.name,
                  matchSummaryText: data.matchSummaryText,
                  venue: data.venue.name,
                  startDateTime: new Date(data.startDateTime),
                });
              }
            });
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
#up {
  margin: 5rem auto;
  /* padding: 0 5rem; */
}
</style>

