<template>
  <v-app id="com">
    <Menu></Menu>
    <div v-if="loading && !showSc">
      <h1>Loading ........................</h1>
    </div>

    <v-col
      v-else-if="!showSc"
      v-for="(item, index) in matchInfo"
      cols="6"
      :key="index"
      align-self="center"
    >
      <v-card elevation="2" color="#f0f2f5" v-if="!showSc">
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-toolbar-title>
              {{ item.home }} vs {{ item.away }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <p>Venue: {{ item.venue }}</p>
          <p>
            Result: <b>{{ item.matchSummaryText }}</b>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click.prevent="
              showScorecard(
                item.matchIds,
                item.seriesIds,
                item.matchSummaryText
              )
            "
          >
            Score
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-divider :key="`divider-${index}`"></v-divider>
    </v-col>
    <div v-else-if="showSc">
      <v-btn @click.prevent="showScorecard(null, null)"> back </v-btn>
      <match-infos
        :matchId="mId"
        :seriesId="sId"
        :summary="matchSummary"
      ></match-infos>
    </div>
  </v-app>
</template>

<script>
import Menu from "./Menu";
import MatchInfo from "./MatchInfo";
const dotenv = require("dotenv");
dotenv.config();
export default {
  components: { Menu, matchInfos: MatchInfo },
  data() {
    return {
      info: null,
      loading: true,
      responseAvailable: false,
      showSc: false,
      apiKey: process.env.API_KEY,
      completed: 0,
      matches: null,
      matchInfo: [],
      mId: "",
      sId: "",
      matchSummary: "",
    };
  },
  mounted() {
    this.fetchApiData();
    this.loading = false;
  },
  methods: {
    showScorecard(matchIds, seriesIds, summary) {
      this.mId = matchIds;
      this.sId = seriesIds;
      this.matchSummary = summary;
      this.showSc = !this.showSc;
    },
    fetchApiData() {
      fetch(
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?completedlimit=15",
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
          if (this.info.meta.completedMatchCount > 0) {
            this.completed = this.info.meta.completedMatchCount;
            this.matches = this.info.matchList.matches.filter(
              (mat) => mat.status === "COMPLETED"
            );

            this.matches.map((data) => {
              this.matchInfo.push({
                matchIds: data.id,
                seriesIds: data.series.id,
                home: data.homeTeam.name,
                away: data.awayTeam.name,
                matchSummaryText: data.matchSummaryText,
                venue: data.venue.name,
              });
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
#com {
  margin: 5rem auto;
  justify-content: center;
  /* padding: 0 5rem; */
}
</style>