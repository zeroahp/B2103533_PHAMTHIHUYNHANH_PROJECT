<template>
  <div class="detail-page container">
    <h2>Chi Tiết Sản Phẩm</h2>
    <div class="container">

      <div class="detail-img col-lg-6 col-md-6">
        <img :src="product.thumbnail" alt="" />
      </div>

      <div class="detail-content col-lg-6 col-md-6">
        <h3 class="detail-content title">{{ product.title }}</h3>
        <div class="detail-content price">{{ product.priceNew }}.000đ</div>
        <div class="detail-content des">{{ product.description }}</div>
        <div v-if=" product.discountPercentage" class="detail-content discount">
          Giảm giá:{{ product.discountPercentage }}%
        </div>
        <div class="detail-content sold">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="detail-content stock">Còn lại: {{ product.stock }}</div>
        <div class="btn-detail-add-product"
        >
          <a @click="addProductToCart(product)">
            Thêm vào giỏ hàng
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";
import Swal from "sweetalert2";

export default {
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
    addProductToCart(product) {
      this.$store.commit("addToCart", product);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đã thêm vào giỏ hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  created() {
    const id = this.$route.params.id;
    this.getProduct(id);
  },
};
</script>
<style>
.detail-page {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  
}

.detail-page h2{
  text-align: center;
  margin-bottom: 20px;
}

.detail-page .container{
  width: 900px;
  height: 450px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  border: 1px solid black;
    border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 4px 5px #b7b7b7;

}

.detail-img.col-lg-6, .detail-content.col-lg-6{
  padding: 0;
  margin: 0;
}

.detail-content.col-lg-6{
  display: flex;
  flex-direction: column;
  padding: 20px 15px 10px 50px;
}
.detail-page .detail-img {
  width: 400px;
  height: 100%;
  object-fit: cover;
}

.detail-page .detail-img img {
  width: 100%;
  aspect-ratio: 1/1;
}

.detail-content.title, .price, .des, .discount, .sold, .stock{
  margin-bottom: 10px;
}
.detail-content.title{
  color: #445B6D;
  font-size: 1.5rem;
}

.detail-content.price{
  color: red;
  font-weight: 600;
  font-size: 2rem;
}

.detail-content.des{
  font-size: 1rem;
}

.btn-detail-add-product{
  text-align: center;
  color: white;
  width: 200px;
  background: orangered;
  padding: 10px;
  cursor: pointer;
}

.btn-detail-add-product:hover{
  background: black;
}

</style>