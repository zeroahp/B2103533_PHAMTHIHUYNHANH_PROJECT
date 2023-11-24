<template>
  <div v-if="product" class="admin">
    <h3>Trang chỉnh sửa thông tin sản phẩm</h3>
    <ProductForm 
      :product="product" 
      @submit:product="updateProduct"
    />
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
      product: null,
    };
  },
  methods: {
    async getProduct(id) {
        try {
            this.product = await ProductService.get(id);
        } catch (error) {
            console.log(error);
            
        }
    },
    async updateProduct(data) {
      try {
        await ProductService.update(this.product._id, data);
        
        Swal.fire({
          title: 'Thành công!',
          text: 'Đã cập nhật sản phẩm!',
          icon: 'success',
          timer: 1500, // Tự đóng sau 2 giây (3000ms)
          showConfirmButton: false // Ẩn nút xác nhận
        })
        this.$router.push({name: "product"});
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    this.getProduct(id);
  },
};
</script>


<style>
.admin{
  /* position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  width: 100%; */
  display: flex;
  flex-direction: column;
}
.admin h3{
  padding: 10px;
  color: white;
  font-size: 1.2rem;
  background-color: #343A40;
  text-align: center;
}

.container.create {
  width: 600px;
}
.create-page {
  margin: 20px 0;
  border: 1px solid #515151;
  border-radius: 10px;
  padding: 35px;
}

.create-page label {
  font-weight: 600;
}
</style>
