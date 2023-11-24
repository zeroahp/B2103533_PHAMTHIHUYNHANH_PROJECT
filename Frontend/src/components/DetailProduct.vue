<template>
  <div class="dextailBox">
    <div class="detail-box1">
      <img :src="product.thumbnail" alt="" />
    </div>
    <div class="detail-box2">
      <div class="box-detail">
        <h3 class="box2 title">{{ product.title }}</h3>
        <div class="box2 des">Mô tả: {{ product.description }}</div>
        <div class="box2 price">Giá: {{ product.price }}.000đ</div>
        <div class="box2 discount">
          Giảm giá: {{ product.discountPercentage }}%
        </div>
        <div class="box2 sold">Đã bán: chưa bán sản phẩm</div>
        <div class="box2 stock">Còn lại: {{ product.stock }} sản phẩm</div>
        <button type="button" class="btn btn-success">
          {{ product.status }}
        </button>
      </div>
      <div class="box-button">
        <button
          type="button"
          class="btn btn-secondary edit"
          @click="editProduct(product._id)"
        >
          Sửa
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteProduct(product._id)"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/admin/product.service";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editProduct(productId) {
      this.$router.push({ name: "edit", params: { id: productId } });
    },
    deleteProduct(productId) {
      this.$emit("delete-product", productId);
    },
  },

  created() {
    console.log("da trueyn", this.product);
  },
};
</script>

<style>
.dextailBox {
  border: 2px solid #0a6f8c;
  border-radius: 10px;
  display: flex;
  padding: 30px;
}
.detail-box1 img {
  width: 400px;
  border-radius: 10px;
  margin-left: 30px;
  aspect-ratio: 1/1;
}

.detail-box2 {
  margin-right: 100px;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.detail-box2 .box2-title {
  margin-bottom: 30px;
}

.box2 {
  margin-bottom: 20px;
}
</style>