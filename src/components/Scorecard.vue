
<template>
  <div class="center">
    <h2>{{ batName }}</h2>
    <v-data-table
      dense
      :headers="batsmen"
      :items="bat"
      class="elevation-1"
    ></v-data-table>
    <div class="box"></div>
    <v-data-table
      dense
      :headers="bowler"
      :items="bow"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    bat: { type: Array },
    batName: { type: String },
    // bowName: { type: String },
    bow: { type: Array },
  },
  data() {
    return {
      batsmen: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Runs",
          value: "runs",
        },
        {
          text: "Balls",
          value: "balls",
        },
        { text: "Strike Rate", value: "strikeRate" },
        { text: "Four", value: "fours" },
        { text: "Six", value: "sixes" },
        { text: "Out", value: "howOut" },
        // { text: "Id", value: "id" },
        // { text: "Image Url", value: "imageURL" },
        // { text: "Fall Of Wicket", value: "fallOfWicket" },
        // { text: "Fall Of Wicket Over", value: "fallOfWicketOver" },
        // { text: "FOW Order", value: "fowOrder" },
      ],
      bowler: [
        { text: "Name", value: "name" },
        { text: "Runs Conceded", value: "runsConceded" },
        { text: "Maiden", value: "maidens" },
        { text: "Wickets", value: "wickets" },
        { text: "Over", value: "overs" },
        { text: "Wide", value: "wides" },
        { text: "No ball", value: "noBalls" },
        { text: "Economy", value: "economy" },
        // { text: "Id", value: "id" },
        // { text: "Image Url", value: "imageURL" },
      ],
    };
  },
};
</script>

<style>
.center {
  margin: auto;
  /* width: 50%; */
  border: 3px solid green;
  padding: 10px;
}
.box {
  margin: 10px 5px 10px 5px;
}
</style>