<template>
  <div>
    <!-- <HeaderSlide /> -->
    <ProductList :products="products"/>
  </div>
</template>
 
<script>
import HeaderSlide from "@/components/HeaderSlide.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/client/product.service";

export default {
  components: {
    HeaderSlide,
    ProductList,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async retrieveContacts() {
      //lấy danh sách sp từ dịch vụ service
      try {
        this.products = await ProductService.getAll();
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    // Gọi phương thức retrieveContacts khi component được tạo
    this.retrieveContacts();
    console.log(this.products);
  },
};
</script>