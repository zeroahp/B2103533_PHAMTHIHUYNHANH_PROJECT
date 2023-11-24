<template>
  <div id="app">
    <HeaderAdmin />

    <div :class="{ 'background-class': !isLoggedIn }">
      <div v-if="isLoggedIn">
        <Sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script >
import Sidebar from "@/components/Sidebar.vue";
import HeaderAdmin from "../../components/HeaderAdmin.vue";
import { mapState } from "vuex";

export default {
  name: "layout-admin",
  components: {
    Sidebar,
    HeaderAdmin,
  },
  computed: {
    isLoggedIn() {
      console.log(this.$store.state.isLoggedIn);
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style>
.background-class {
    height: 100vh;
    width: 100vw;
    background-image: url("../../assets/image/welcomadmin.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>


