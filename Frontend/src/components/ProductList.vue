<template >
  <div class="cate-pro">
    <div class="container">
      <div class="category">Danh mục</div>
      <div class="product-list">
        <ul class="list-group">
          <li class="list-item" v-for="item in products" :key="item._id">
            <div class="item">
              <div class="item-one">
                <img
                  :src="item.thumbnail"
                  alt="Thumbnail"
                  class="product-thumbnail"
                />
                <p class="product-discountPercentage">
                  {{ item.discountPercentage }}%
                </p>
              </div>
              <div class="item-two">
                <h3 class="product-title">{{ item.title }}</h3>
                <p class="product-price">Price: {{ item.price }} VNĐ</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      deleted: false,
      default: [],
    },
  },
  created() {
    // console.log('Prop "products" đã được truyền vào component:', this.products);
  },
};
</script>