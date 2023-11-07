<template>
  <div id="app">
    <AppHeader />
      <router-view />
  </div>
</template>

<script >
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<style scoped>
</style>
