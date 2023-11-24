<template>
  <div class="feature-product">
    <!-- <div class="feature-title">SẢN PHẨM NỔI BẬT</div> -->
    <div class="feature-banner"></div>
    <div class="col-lg-12 col-md-8 col-sm-6 col-xs-6 feature-product-item">
      <div
        class="product-item"
        v-for="item in products.slice(0, index)"
        :key="item._id"
      >
        <div class="product-image">
          <figure>
            <a href="#">
              <img :src="item.thumbnail" alt="" />
            </a>
          </figure>
          <span class="product-discount" v-if="item.discountPercentage != 0">
            {{ item.discountPercentage }}%
          </span>
        </div>

        <div class="product-text-sale">
          <h4 class="product-title">{{ item.title }}</h4>
          <p class="price-old">{{ item.price }}.000đ</p>
          <p class="price-new">{{ item.priceNew }}.000đ</p>
          <div class="product-option">
            <span @click="detailProduct(item._id)">
              <i class="far fa-eye"></i>
            </span>
            <button @click="addProductToCart(item)">
              <i class="fas fa-shopping-basket"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-xem">
      <router-link :to="{ name: 'product-client' }" class="nav-link feature-btn">
       Xem Thêm
      </router-link>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";
// import ProductFilter from "@/components/client/ProductFilter.vue";
export default {
  components: {
    // ProductFilter,
  },
  data() {
    return {
      products: [],
      searchText: "",
      feature: "",
      index: 5,
    };
  },
  methods: {
    async retrieveProduct() {
      const feature = "true";
      try {
        const query = feature ? { feature } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });

        // Thực hiện lọc sản phẩm và cập nhật danh sách
        const newProduct = await ProductService.getAll({
          params: query,
        });

        this.products = newProduct;
        // console.log("feature", newProduct);
      } catch (error) {
        console.log(error);
      }
    },

    addProductToCart(product) {
      this.$store.commit("addToCart", product);
    },

    detailProduct(productId) {
      this.$router.push({ name: "detail-product", params: { id: productId } });
      this.$emit("detail", productId);
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
@import url("https://fonts.cdnfonts.com/css/margesh");
* {
  box-sizing: border-box;
}
.feature-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Margesh Regular";
}

.feature-product .feature-title {
  /* margin-bottom: 30px; */
  font-size: 1.5rem;
  padding: 0 20px;
  border: 2px solid black;
  color: black;

  background-position: 0px 360px;
}

.feature-banner {
  margin-bottom: 20px;
  background-image: url("../../assets/image/Feature.png");
  width: 100%;
  height: 160px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.feature-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%; /* Bắt đầu từ ngoài màn hình bên trái */
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  animation: slideIn 2s linear infinite; /* Điều chỉnh thời gian và kiểu chuyển động tại đây */
}

.feature-product-item {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.feature-product-item .product-item {
  width: 250px;
  height: 380px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.feature-product-item .product-item .product-image {
  width: 100%;
  object-fit: cover;
  position: relative;
}

.feature-product-item .product-discount {
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: 0;
  right: 0;
  background: yellow;
  padding: 5px;
  color: red;
  border-bottom-left-radius: 5px;
  box-shadow: 1px 1px 3px rgb(224, 224, 224);
  z-index: 5;
}

.feature-product-item .product-item .product-image img {
  aspect-ratio: 1/1;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 2px 8px #7b7b7b;
  transition: transform 0.4s ease;
}

.product-item .product-image img:hover {
  transform: scale(1.02);
}

.feature-product-item .product-discount-feature {
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  /* top: 10px; */
  /* right:30px;  */
  right: 0;
  background: yellow;
  padding: 5px;
  color: red;
  border-bottom-left-radius: 5px;
  box-shadow: 1px 1px 3px rgb(224, 224, 224);
  z-index: 10;
}
.feature-product-item .product-title {
  color: #e18a93;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.product-title:hover {
  color: #e18a93;
}

.product-option a {
  color: #e18a93;
  margin: 0 8px;
}
.product-option a:hover {
  color: #e18a93;
}

.feature-product-item .btn-xem a {
  background-color: #e18a93;
  padding: 10px 15px;
  color: white;
  border: 2px solid #e18a93;
}

.feature-product-item .btn-xem a:hover {
  color: #e18a93;
  background: white;
}
</style>