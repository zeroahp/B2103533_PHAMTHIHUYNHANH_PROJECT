<template>
  <div class="container cart-shopping">
    <div class="cart-box">
      <div class="cart">
        <h3 class="my-cart">Giỏ Hàng</h3>
        <!-- <div class="row head-cart">
          
          <div class="col-md-3 space-30">
            <div class="item active center">
              <p class="icon">01</p>
              <h3>Giỏ Hàng</h3>
            </div>
          </div>

          <div class="col-md-3 space-30">
            <div class="item center">
              <p class="icon">02</p>
              <h3>Đã Đặt Hàng</h3>
            </div>
          </div>

          <div class="col-md-3 space-30">
            <div class="item center">
              <p class="icon">03</p>
              <h3>Đang Giao Hàng</h3>
            </div>
          </div>

          <div class="col-md-3 space-30">
            <div class="item center">
              <p class="icon">04</p>
              <h3>Đã Giao Hàng</h3>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <div class="box cart">
      <table class="table">
        <thead class="thead-light cart">
          <tr>
            <th class="product-photo" colspan="1">Hình ảnh</th>
            <th class="product-title" colspan="2">Tên sản phẩm</th>
            <th class="product-price">Giá</th>
            <th class="product-quantity">Số lượng</th>
            <th class="product-total">Tổng cộng</th>
            <th class="product-del">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item._id">
            <td class="item-col product-photo" colspan="1">
              <img alt="" :src="item.thumbnail" />
            </td>
            <td class="item-col product-title" colspan="2">
              {{ item.title }}
            </td>

            <td class="item-col product-price">{{ item.priceNew }}.000đ</td>
            <td class="item-col product-quantity" colspan="1">
              <button
                class="btn quantity btn-outline-secondary"
                @click="decreaseQuantity(item)"
                type="button"
              >
                -
              </button>
              <input
                type="number"
                class="form-control"
                v-model="item.quantity"
              />
              <button
                class="btn quantity btn-outline-secondary"
                @click="increaseQuantity(item)"
                type="button"
              >
                +
              </button>
            </td>

            <td class="item-col product-total">
              {{ item.priceNew * item.quantity }}.000đ
            </td>
            <td class="item-col product-del">
              <button class="btn-del" @click="removeFromCart(item)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="total-money" v-if="totalQuantity > 0">
      <h5>Tổng tiền: {{ totalQuantity }}.000đ</h5>
    </div>
    <div class="click-payment" v-if="totalQuantity > 0">
      <a @click="buyProduct">
        Đặt hàng
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AccountService from "@/services/client/account.service";

export default {
  components: {},

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalQuantity() {
      // console.log(product.quantity);
      return this.cart.reduce(
        (total, product) => total + product.priceNew * product.quantity,
        0
      );
    },

    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },

  methods: {
    decreaseQuantity(product) {
      this.$store.commit("decreaseQuantity", product);
    },
    increaseQuantity(product) {
      this.$store.commit("increaseQuantity", product);
    },
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
    },
    async buyProduct() {
      if (!this.isLoggedIn) {
        try {
          const result = await Swal.fire({
            title: "Vui lòng đăng nhập để thanh toán!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có",
          });

          if (result.isConfirmed) {
            this.$router.push({ name: "login-authen" });

            if (this.isLoggedIn) {
              this.$router.push({ name: "bill-detail" });
            }
          }
        } catch (error) {
          Swal.fire({
            title: "Đã xảy ra lỗi khi thanh toán",
            text: "Vui lòng thử lại sau.",
            icon: "error",
          });
        }
      } else {
        this.$router.push({ name: "bill-detail" });
      }
    },
  },
};
</script>
<style>
.cart-shopping {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.container.cart {
  padding: 20px 0;
}

.cart .my-cart{
  text-align: center;
  background: black;
  color: white;
  padding: 8px 0;
  font-size: 1.8rem;
}

.col-md-3.space-30 {
  /* background-color: aquamarine; */
  border: 1px solid #e6e3e3;
  padding: 50px 0;
  /* margin: 1px; */
}

.col-md-3.space-30 .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: antiquewhite; */
}

.col-md-3.space-30 .item.active p {
  background: black;
  color: white;
}

.col-md-3.space-30 .item p {
  border: 2px solid #e6e3e3;
  padding: 15px 20px;
  border-radius: 50px;
  margin: 0;
  margin-bottom: 20px;
  font-weight: 600;
}

.col-md-3.space-30 .item h3 {
  font-weight: 400;
  font-size: 1.4rem;
}

/* .click-payment */
.click-payment {
  position: absolute;
  right: 0;
}

.click-payment a {
  text-align: end;
  background-color: #e6e3e3;
  color: black;
  font-weight: 600;
  padding: 11px;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}
.click-payment a:hover {
  background-color: black;
  color: white !important;
}

/* table */
.item-col.product-photo {
  width: 150px;
  object-fit: cover;
}
.item-col.product-photo img {
  width: 100%;
  aspect-ratio: 1/1;
}
.item-col.product-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-col.product-quantity input {
  width: 50px;
  height: 30px;
}

.item-col.product-quantity .btn.quantity {
  border: none;
  padding: 5px;
  margin: 0;
  outline: none;
}

.item-col.product-quantity .btn.quantity:hover {
  background: none;
  color: black;
}

.thead-light.cart th,
.item-col {
  /* vertical-align: middle; */
  text-align: center;
}
.item-col {
  vertical-align: middle;
}
.item-col.product-del button {
  border: none;
  color: white;
  background: brown;
}

.total-money h5 {
  text-align: end;
  color: orangered;
  margin-bottom: 30px;
}
</style>