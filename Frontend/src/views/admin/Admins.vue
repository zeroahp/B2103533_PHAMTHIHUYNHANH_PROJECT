<template>
  <div class="admin">
    <h3>Chào mừng đến trang Admin</h3>
    <AdminProduct :products="products" @change-status="handleChangeStatus" />
  </div>
</template>

<script>
import AdminProduct from "@/components/AdminProduct.vue";
import ProductService from "@/services/admin/product.service";

export default {
  components: {
    AdminProduct,
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
    async getProduct(id) {
      try {
        this.products = await ProductService.get(id);
      } catch (error) {
        console.log(error);
      }
    },
    async handleChangeStatus(productId) {
      try {
        //Thay đổi bên BE
        await ProductService.changeStatus(productId);
        
        //Cập nhật thay đổi bên FE
        const productToUpdate = this.products.find(
          (product) => product._id === productId
        );

        if (productToUpdate) {
          if (productToUpdate.status === "Active") {
            productToUpdate.status = "Inactive";
          } else {
            productToUpdate.status = "Active";
          }
        } 
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    // Gọi phương thức retrieveContacts khi component được tạo
    this.retrieveContacts();
    const id = this.$route.params.id;
    if (id) {
      this.getProduct(id);
    }
  },
};
</script>

