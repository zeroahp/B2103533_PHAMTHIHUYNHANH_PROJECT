<template>
  <div class="admin">
    <AdminProduct
      :products="products"
      @change-status="handleChangeStatus"
      @filter-admin="handleProductsFilter"
      @search-pro="handleSearch"
    />
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
      searchText: "",
      activeIndex: -1,
    };
  },

  

  // },
  methods: {
    async retrieveProduct() {
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
        console.log("admin", productId);
        await ProductService.changeStatus(productId);

        //Cập nhật thay đổi bên FE
        const productToUpdate = this.products.find((product) =>
           product._id === productId
        );

        if (productToUpdate) {
         console.log(" productToUpdate.status",  productToUpdate.status);
          if (productToUpdate.status === "Hoạt động") {
            productToUpdate.status = "Ngừng hoạt động";
          } else {
            productToUpdate.status = "Hoạt động";
          }

         console.log(" productToUpdate.status",  productToUpdate.status);

        }
      } catch (error) {
        console.log(error);
      }
    },

    handleProductsFilter(newProducts) {
      this.products = newProducts;
    },

    handleSearch(newProduct) {
      this.products = newProduct;
    },
  },

  created() {
    // Gọi phương thức retrieveProduct khi component được tạo
    this.retrieveProduct();
    const id = this.$route.params.id;
    if (id) {
      this.getProduct(id);
    }
  },
};
</script>
<style>
.admin {
  position: absolute;
  left:180px;
  right: 0;
  top: 80px;  
  
}

</style>