
<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        align-self="center"
        class="center"
        xl="8"
        lg="8"
        md="10"
        sm="12"
      >
        <div>
          <p>{{ summary }}</p>
          <h2>{{ batName }}</h2>
          <v-flex md12 xs12 style="overflow: auto">
            <v-data-table
              dense
              disable-sort
              fixed-header
              :headers="batsmen"
              :items="bat"
              height="300"
              class="elevation-1 light-grey overflow-y-auto"
              :items-per-page="30"
              hide-default-footer
              max-height="calc(90vh - 520px)"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.runs }}</td>
                  <td class="text-xs-right">{{ props.item.balls }}</td>
                  <td class="text-xs-right">{{ props.item.strikeRate }}</td>
                  <td class="text-xs-right">{{ props.item.fours }}</td>
                  <td class="text-xs-right">{{ props.item.howOut }}</td>
                  <td class="text-xs-right">{{ props.item.sixes }}</td>
                </tr>
              </template>
              <template v-slot:[`item.runs`]="{ item }">
                <v-chip :color="getColor(item.runs)" dark>
                  {{ item.runs === "" ? "-" : item.runs }}
                </v-chip>
              </template>
              <template v-slot:[`item.imageURL`]="{ item }">
                <v-avatar color="indigo" size="36">
                  <img
                    :src="
                      !item.imageURL
                        ? 'https://central.wisd.us/uploaded/CENTRAL/Pics/Staff/No_photo.png'
                        : item.imageURL
                    "
                    alt="No image"
                    width="50"
                    height="50"
                  />
                </v-avatar>
              </template>
            </v-data-table>
          </v-flex>
          <div class="box"></div>
          <h2>{{ bowName }}</h2>
          <v-flex md12 style="overflow: auto">
            <v-data-table
              dense
              disable-sort
              fixed-header
              height="300"
              :headers="bowler"
              :items="bow"
              class="elevation-1 overflow-y-auto"
              :items-per-page="30"
              hide-default-footer
              max-height="calc(90vh - 520px)"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.runsConceded }}</td>
                <td class="text-xs-right">{{ props.item.maidens }}</td>
                <td class="text-xs-right">{{ props.item.overs }}</td>
                <td class="text-xs-right">{{ props.item.wickets }}</td>
                <td class="text-xs-right">{{ props.item.wides }}</td>
                <td class="text-xs-right">{{ props.item.noBalls }}</td>
                <td class="text-xs-right">
                  {{ props.item.economy }}
                </td>
              </template>
              <template v-slot:[`item.imageURL`]="{ item }">
                <v-avatar color="indigo" size="36">
                  <img
                    :src="
                      !item.imageURL
                        ? 'https://central.wisd.us/uploaded/CENTRAL/Pics/Staff/No_photo.png'
                        : item.imageURL
                    "
                    alt="No image"
                    width="50"
                    height="50"
                  />
                </v-avatar>
              </template>
            </v-data-table>
          </v-flex>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Axios from "axios";
export default {
  props: {
    bat: { type: Array },
    batName: { type: String },
    bowName: { type: String },
    bow: { type: Array },
    matchIds: { type: String },
    seriesIds: { type: String },
    summary: String,
  },
  data() {
    return {
      batsmen: [
        { text: "Photo", value: "imageURL" },
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

        // { text: "Fall Of Wicket", value: "fallOfWicket" },
        // { text: "Fall Of Wicket Over", value: "fallOfWicketOver" },
        // { text: "FOW Order", value: "fowOrder" },
      ],
      bowler: [
        { text: "Photo", value: "imageURL" },
        { text: "Name", value: "name" },
        { text: "Runs Conceded", value: "runsConceded" },
        { text: "Maiden", value: "maidens" },
        { text: "Wickets", value: "wickets" },
        { text: "Over", value: "overs" },
        { text: "Wide", value: "wides" },
        { text: "No ball", value: "noBalls" },
        { text: "Economy", value: "economy" },
        // { text: "Id", value: "id" },
      ],
    };
  },
  methods: {
    getColor(runs) {
      if (runs === "") return "blue";
      else if (runs < 10) return "red";
      else if (runs > 10 && runs < 30) return "orange";
      else return "green";
    },
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
  padding: 1%;
  margin: 10px 5px 10px 5px;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
tbody tr:hover {
  color: blue;
}
</style>