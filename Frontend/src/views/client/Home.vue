
<template>
  <div class="home-page">
      <div class="video-section">
        <HeaderSlide />
      </div>
      <div class="body-section">
        <BodyHome />
      </div>
      <div class="footer-section">
        <Footer />
      </div>
  </div>
</template>
 
<script>
import HeaderSlide from "@/components/client/HeaderSlide.vue";
import BodyHome from "@/components/client/BodyHome.vue";
import Footer from "@/components/client/Footer.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/client/product.service";

export default {
  components: {
    HeaderSlide,
    BodyHome,
    ProductList,
    Footer
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async retrieveProduct() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {}
    },
  },
  created() {
    // Gọi phương thức retrieveContacts khi component được tạo
    this.retrieveProduct();
    console.log(this.products);
  },
};
</script>

<style>
.home-page {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  /* min-height: 100vh; */
}

/* .body-section{
  background-color: aqua;
} */
</style>