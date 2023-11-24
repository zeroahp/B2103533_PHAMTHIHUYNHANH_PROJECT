<template>
  <div class="product-page">
    <!-- <div class="product-page-slide"></div> -->
    <div
      class="card-body"
      :class="{
        'category-all': category === '',
        'category-flower': category === 'Hoa Tươi',
        'category-noen': category === 'Noen',
        'category-gift': category === 'Set Quà',
        'category-feature': feature === 'true',
      }"
    ></div>
    <ProductFilter
      @search-product="handleSearch"
      @sort-product="handleSort"
      @filter-category="handleCategory"
    />

    <!-- product-list -->

    <div class="col-lg-12 col-md-8 col-sm-6 col-xs-6 page-product-item">
      <div class="product-item" v-for="item in products" :key="item._id">
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
          <p class="price-old" v-if="item.price != item.priceNew">
            {{ item.price }}.000đ
          </p>
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
  </div>
</template>
 
<script>
import ProductService from "@/services/client/product.service";
import ProductFilter from "@/components/client/ProductFilter.vue";
import Swal from "sweetalert2";

export default {
  components: {
    ProductFilter,
  },
  data() {
    return {
      products: [],
      searchText: "",
      category: "",
      feature: "",
    };
  },
  methods: {
    async retrieveProduct() {
      //lấy danh sách sp từ dịch vụ service
      try {
        this.products = await ProductService.getAll();
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

    handleSearch(newProduct) {
      this.products = newProduct;
    },

    handleSort(sortProduct) {
      this.products = sortProduct;
    },

    handleCategory(newProduct) {
      this.products = newProduct;
      this.category = newProduct[0].category;
      this.feature = newProduct[0].feature;
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

.product-page {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  font-family: "Margesh Regular";
}

/* product filter */

/* list product */
.page-product-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
}
.product-item {
  width: 250px;
  height: 380px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.product-item .product-image {
  height: auto;
  object-fit: cover;
  position: relative;
}

.product-discount {
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
.product-item .price-old {
  font-size: 0.9rem;
}
.product-item .product-image img {
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 2px 8px #7b7b7b;
  transition: transform 0.4s ease;
}

.product-item .product-image img:hover {
  transform: scale(1.02);
}
.page-product-item .product-item .product-title {
  color: #e18a93;
  font-size: 1.1rem;
  font-weight: 600;
}
.product-text-sale .product-option span i,
button i {
  color: #e18a93;
  margin: 0;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.product-text-sale .product-option span i:hover,
button i:hover {
  transform: scale(1.2);
}
.product-text-sale .product-option button {
  border: none;
  background: none;
}
.product-option {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-xem a {
  background-color: #e18a93;
  padding: 10px 15px;
  color: #dadada;
}

.btn-xem a:hover {
  color: white;
}

/* background-cate */
.category-handmade {
  margin-bottom: 20px;
  background-image: url("../../assets/image/handmade.png");
  height: 150px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.category-handmade::before {
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

.category-all {
  background-image: url("../../assets/image/bounquet.png");
  height: 150px;
  background-size: cover;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.category-all::before {
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
.category-gift {
  margin-bottom: 20px;
  background-image: url("../../assets/image/gift.png");
  height: 150px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.category-gift::before {
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
.category-flower {
  background-image: url("../../assets/image/flower.png");
  height: 150px;
  background-size: cover;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.category-flower::before {
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

.category-noen {
  background-image: url("../../assets/image/noen.png");
  height: 150px;
  background-size: cover;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.category-noen::before {
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
.category-feature {
  background-image: url("../../assets/image/Feature.png");
  height: 150px;
  background-size: cover;

  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.category-feature::before {
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
@keyframes slideIn {
  to {
    left: 100%; /* Di chuyển hình qua phải */
  }
}
</style>