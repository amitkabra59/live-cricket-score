<template>
  <div match>
    <div v-if="loading" align-center>
      <p>Loading .....</p>
    </div>
    <div v-else>
      <score-card
        :summary="summary"
        v-bind:bat="batting"
        v-bind:batName="teamName1"
        v-bind:bow="bowling"
        :matchIds="matchId"
        :seriesIds="seriesId"
      ></score-card>
      <div class="box"></div>
      <score-card
        v-bind:bat="batting2"
        v-bind:batName="teamName2"
        v-bind:bow="bowling2"
        :matchIds="matchId"
        :seriesIds="seriesId"
      ></score-card>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import ScoreCard from "./Scorecard";
export default {
  // name: "Match Scorecard",
  props: {
    matchId: { type: String },
    seriesId: { type: String },
    summary: String,
  },
  data() {
    return {
      teamName1: "First Innings",
      teamName2: "Second Innings",
      loading: true,
      scorecard: null,
      innings1: [],
      batting: [],
      bowling: [],
      innings2: [],
      batting2: [],
      bowling2: [],
      fullSc1: [],
      fullSc2: [],
    };
  },
  async mounted() {
    console.log("hi");
    await this.fetchScorecard();
    this.loading = false;
  },
  methods: {
    async fetchScorecard() {
      console.log(
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid=" +
          this.seriesId +
          "&matchid=" +
          this.matchId
      );
      axios
        .get(
          "https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid=" +
            this.seriesId +
            "&matchid=" +
            this.matchId,
          {
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
            this.fullSc1.push(response.data.fullScorecard.innings[0]);
            this.fullSc1.map((data) => {
              console.log(data);
              this.teamName1 = data.name || "";
              this.batting = data.batsmen;
              this.bowling = data.bowlers;
            });
            console.log(this.innings1);
            this.fullSc2.push(response.data.fullScorecard.innings[1]);
            this.fullSc2.map((data) => {
              this.batting2 = data.batsmen;
              this.bowling2 = data.bowlers;
            });
          } else {
            alert(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
  components: { "score-card": ScoreCard },
};
</script>

<style scoped>
.box {
  padding: 1%;
  margin: 10px 5px 10px 5px;
}
</style>