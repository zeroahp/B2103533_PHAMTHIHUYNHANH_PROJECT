<template>
  <div class="body-home">
    <HelloChristmas />
    <FeatureProduct />
    <AboutUs id="about-us" />
  </div>
</template>


<script>
import HelloChristmas from "../client/HelloChristmas.vue";
import FeatureProduct from "./FeatureProduct.vue";
import AboutUs from "../client/AboutUs.vue";
export default {
  components: {
    HelloChristmas,
    FeatureProduct,
    AboutUs
  },

  methods: {},
};
</script>
