<template>
  <div class="hello-christmas">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 banner-sale">
      <img src="../../assets/image/bg-noen.png" alt="" />
      <div class="banner-sale-title">
        <p class="title-hello">Chào Giáng Sinh</p>
        <h1 class="title-sale">SALE 25%</h1>
        <a class="btn-buy-product">Mua ngay</a>
      </div>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 product-sale">
      <div
        class="col-lg-6 col-sm-6 col-xs-6 product-sale-item"
        v-for="item in products.slice(0, index)"
        :key="item._id"
      >
        <div class="product-image-sale">
          <figure>
            <a href="#">
              <img :src="item.thumbnail" alt="" />
            </a>
          </figure>
        </div>
        <div class="product-text-sale">
          <a class="product-title" href="">
            <h4>{{ item.title }}</h4>
          </a>
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
  </div>
</template>


<script>
import ProductService from "@/services/client/product.service";

export default {
  data() {
    return {
      products: [],
      searchText: "",
      feature: "",
      index: 4,
    };
  },
  methods: {
    async retrieveProductSale() {
      const discountPercentage = 25;
      try {
        const query = discountPercentage ? { discountPercentage } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });

        // Thực hiện lọc sản phẩm và cập nhật danh sách
        const newProduct = await ProductService.getAll({
          params: query,
        });

        this.products = newProduct;
        console.log("feature", newProduct);
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
    this.retrieveProductSale();
    const id = this.$route.params.id;
    if (id) {
      this.getProduct(id);
    }
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/rangile");

.hello-christmas {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

a {
  text-decoration: none;
  margin: 0;
}

a:hover {
  text-decoration: none;
}
.banner-sale {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner-sale img {
  width: 560px;
  height: 800px;
  position: relative;
}

.banner-sale-title {
  position: absolute;
  top: 12rem;
  left: 10rem;
  text-align: center;
}

.banner-sale-title .title-hello {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black;
}

.banner-sale-title .title-sale {
  font-size: 5.5rem;
  margin-bottom: 4rem;
  color: black;
}

.banner-sale-title .btn-buy-product {
  background-color: black;
  padding: 15px 25px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.banner-sale-title .btn-buy-product:hover {
  background: white;
  color: black;
}

/* product salw */
.product-sale {
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.product-sale .product-sale-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.product-image-sale {
  width: 250px;
  object-fit: cover;
  position: relative;
  transition: transform 0.4s ease;
}

.product-image-sale:hover {
  transform: scale(1.1);
  padding: 100;
}

.product-image-sale figure img {
  aspect-ratio: 1/1;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 2px 5px #7b7b7b;
}

.product-icon-sale {
  position: absolute;
  z-index: 5;
  text-align: center;
  top: 30%;
}

.product-icon-sale a {
  background: rgba(202, 202, 202, 0.6);
  margin: 10px;
  font-size: 25px;
  color: black;
  padding: 10px 12px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: 4;
}

.product-icon-sale:hover a {
  opacity: 1;
  background: rgba(202, 202, 202, 0.6);
  color: black;
  transform: scale(1);
}

.product-icon-sale a:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* product-text-sale */
.product-text-sale {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-text-sale .price-old {
  text-decoration: line-through;
  color: #7b7b7b;
  font-size: 1rem;
}
.product-text-sale .product-title h4 {
  margin-bottom: 0;
  font-size: 1.2rem;
  color: black;
}

.product-text-sale .product-title:hover {
  color: #e13062;
}
.product-text-sale .price-new {
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
.product-option a:hover {
  color: #e18a93;
}

/* reponsive */

@media (max-width: 1170px) {
  .banner-sale-title {
    top: 16rem;
    left: 4rem;
  }

  .product-image-sale {
    width: 200px;
  }
}
@media (max-width: 992px) {
  .banner-sale-title {
    top: 16rem;
    left: 3rem;
  }

  .product-image-sale {
    width: 180px;
  }

  .banner-sale-title .title-hello {
    font-size: 2rem;
    color: black;
  }

  .banner-sale-title .title-sale {
    font-size: 4.5rem;
  }

  .banner-sale-title .btn-buy-product {
    padding: 10px 25px;
  }
}
@media (max-width: 768px) {
  .banner-sale-title {
    top: 16rem;
    left: 2rem;
  }

  .product-image-sale {
    width: 130px;
  }

  .banner-sale-title .title-hello {
    font-size: 2rem;
    color: black;
  }

  .banner-sale-title .title-sale {
    font-size: 4rem;
  }

  .banner-sale-title .btn-buy-product {
    padding: 10px 25px;
  }
}
@media (max-width: 576px) {
  .product-image-sale {
    width: 250px;
  }

  .banner-sale-title .title-sale {
    font-size: 5rem;
  }
}
</style>