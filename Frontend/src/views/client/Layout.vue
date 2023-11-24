<template>
  <div class="Layout">
    <HeaderClient />
    <router-view />

  </div>
</template>

<script>
    import HeaderClient  from "../../components/client/HeaderClient.vue";

export default {
    
    name: "layout-client",
    components :{
        HeaderClient
    },
};
</script>