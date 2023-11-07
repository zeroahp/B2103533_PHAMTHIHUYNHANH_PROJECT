<template>
  <div v-if="product" class="admin">
    <h3>Trang thêm sản phẩm mới</h3>
    <ProductForm 
      :product="product" 
      @submit:product="createProduct"
    />
    <!-- <div class="create-message">{{message}}</div> -->
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/admin/product.service";
import Swal from 'sweetalert2';

export default {
  components: {
    ProductForm,
  },
  data() {
    return {
      product: {},
      message: "",
    };
  },
  methods: {
    async createProduct(data) {
      try {
        await ProductService.create(data);
        Swal.fire({
          title: 'Thành công!',
          text: 'Đã thêm một sản phẩm mới!',
          icon: 'success',
          timer: 1500, // Tự đóng sau 2 giây (3000ms)
          showConfirmButton: false // Ẩn nút xác nhận
        })
        this.$router.push({name: "category"});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
