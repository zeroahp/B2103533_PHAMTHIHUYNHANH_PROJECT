<template>
  <div class="category">
    <AdminCategory
      :products="products"
      @delete-product="handleDelete"
      @filter-cate="handleCategory"
    />
  </div>
</template>

<script>
import AdminCategory from "@/components/AdminCategory.vue";
import ProductService from "@/services/admin/product.service";
import Swal from "sweetalert2";

export default {
  components: {
    AdminCategory,
  },
  data() {
    return {
      products: [],
    };
  },
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
    async handleDelete(productId) {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa sản phẩm này?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, tôi muốn xóa!",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        try {
          await ProductService.delete(productId);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Xóa sản phẩm thành công!",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.$router.go(0);
          });
        } catch (error) {
          console.log(error);
        }
      }
    },

    async handleCategory(filterProduct) {
      this.products = filterProduct;
    },
  },
  created() {
    this.retrieveProduct();

    const id = this.$route.params.id;
    if (id) {
      this.getProduct(id);
    }
  },
};
</script>

<style>
.category {
  position: absolute;
  left: 180px;
  top: 80px;
  right: 0;
}
</style>