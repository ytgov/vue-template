<template>
  <div class="books">
    <h1>This is a data grid</h1>

    <v-banner class="mb-5">
      The data table below is connected to a server-side API which waits 1
      second before returning results. All pagination and sort is done
      server-side.
    </v-banner>
    <v-text-field v-model="search" label="Search"></v-text-field>

    <v-data-table
      dense
      :items="items"
      :headers="headers"
      :options.sync="options"
      :loading="loading"
      :server-items-length="totalLength"      
      :search="search"
    ></v-data-table>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Grid",
  data: () => ({
    loading: false,
    items: [],
    search: "",
    options: {},
    totalLength: 0,
    headers: [
      { text: "id", value: "id" },
      { text: "name", value: "name" },
    ],
    page: 1,
    pageCount: 0,
    iteamsPerPage: 10,
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    search: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    getDataFromApi() {
      this.loading = true;

      axios
        .post(
          "http://localhost:3000/api/data?search=" + this.search,
          this.options
        )
        .then((resp) => {
          console.log(resp.data);
          this.items = resp.data.data;
          //this.pagination.totalLength = resp.data.meta.count;
          this.totalLength = resp.data.meta.count;

          console.log(this.totalLength);

          this.loading = false;
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
