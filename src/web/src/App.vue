<template>
  <v-app>
    <v-navigation-drawer
      v-bind:app="hasSidebar"
      permanent
      :expand-on-hover="hasSidebarClosable"
      clipped
      color="#f1f1f1"
      v-bind:class="{'d-none': !hasSidebar}"
    >
      <v-list dense nav style="" class="mt-4">
        <v-list-item
          link
          nav
          v-bind:title="section.name"
          v-bind:to="section.url"
          v-for="section in sections"
          v-bind:key="section.name"
        >
          <v-list-item-icon>
            <v-icon>{{ section.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ section.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#fff" flat height="70" style="left: 0; border-bottom: 3px #f3b228 solid">
      <!-- <v-icon color="#f3b228" class="mr-5">{{ applicationIcon }}</v-icon> -->
      <img src="/yukon.svg" style="margin: -8px 155px 0 0" height="44"/>
      <v-toolbar-title>
        <span style="font-weight: 700">{{ applicationName }}</span>

        <v-progress-circular
          :class="loadingClass"
          indeterminate
          color="#f3b228"
          size="20"
          width="2"
          class="ml-4"
        ></v-progress-circular>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-label dark>License Year:</v-label>
      <v-select
        v-model="licenseYear"
        smaller
        :items="licenseYears"
        dense
        style="margin-left: 15px; max-width: 150px; margin-right: 20px"
        hide-details
      ></v-select> -->
      <span>Michael Johnson</span>
      <v-menu bottom left class="ml-0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense style="min-width: 200px">
          <v-list-item to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item to="/sign-out">
            <v-list-item-icon>
              <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon> -->
    </v-app-bar>

    <v-main v-bind:style="{'padding-left: 33px !important': !hasSidebar}">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router";
//import { mapState } from "vuex";
//import store from "./store";
import config from "./config";

export default {
  name: "App",
  components: {},
  computed: {},
  data: () => ({
    //logoUrl: `${config.publicPath}logo.svg`,
    dialog: false,
    drawer: null,
    drawerRight: null,
    headerShow: false,
    menuShow: false,
    loadingClass: "d-none",
    applicationName: config.applicationName,
    applicationIcon: config.applicationIcon,
    sections: config.sections,
    hasSidebar: config.hasSidebar,
    hasSidebarClosable: config.hasSidebarClosable
  }),
  created: function() {
    //store.dispatch("load");
    //console.log(config);
  },
  methods: {
    nav: function(location) {
      router.push(location);
      console.log(location);
    },
    toggleHeader: function() {
      this.headerShow = !this.headerShow;
    },
    toggleMenu: function() {
      this.menuShow = !this.menuShow;
    }
  }
};
</script>
