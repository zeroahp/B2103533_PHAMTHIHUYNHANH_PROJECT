<template>
  <div v-if="product" class="detail">
    <h2>Chi tiết sản phẩm</h2>
    <Detail 
      :product="product" 
    />
     
  </div>
</template>

<script>
import Detail from "@/components/DetailProduct.vue";
import ProductService from "@/services/admin/product.service";
import Swal from 'sweetalert2';

export default {
  components: {
    Detail,
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
            console.log(id);
            console.log(this.product);
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
.detail{
   position: absolute;
  top: 80px;
  left: 150px;
  width: calc(100% - 150px);
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.detail h2{
  margin-bottom: 20px;
}
</style>
