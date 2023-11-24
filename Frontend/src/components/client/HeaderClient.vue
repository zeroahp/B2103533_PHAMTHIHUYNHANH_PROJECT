<template>
  <div class="header">
    <div class="container">
      <div class="header-menu">
        <div class="product-logo">
          <router-link :to="{ name: 'home' }" class="nav-link">
            <img src="../../assets/image/3.png" alt="" />
          </router-link>
        </div>

        <ul class="option-menu">
          <li class="menu-item home">
            <!-- <a href="http://127.0.0.1:3001/client"> -->
            <router-link :to="{ name: 'home' }" class="nav-link">
              Trang chủ
            </router-link>
            <!-- </a> -->
          </li>
          <li class="menu-item pro">
            <router-link :to="{ name: 'product-client' }" class="nav-link">
              Sản phẩm
            </router-link>
          </li>

          <li class="menu-item about">
            <router-link :to="{ name: 'about-us' }" class="nav-link">
              Về chúng tôi
            </router-link>
          </li>
        </ul>

        <ul class="product-cartanduser">
          <li class="cartanduser cart">
            <router-link
              :to="{ name: 'cart' }"
              class="nav-link cartanduser cart"
            >
              <i class="fa-solid fa-cart-shopping"></i>
            <span v-if="cart.length" class="quantitycart">{{cart.length}}</span>

            </router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              :to="{ name: 'register-authen' }"
              class="nav-link cartanduser register"
            >
              Đăng ký
            </router-link>
          </li>

          <li v-if="!isLoggedIn">
            <router-link
              :to="{ name: 'login-authen' }"
              class="nav-link cartanduser login"
            >
              Đăng nhập
            </router-link>
          </li>

          <li>
            <div class="accountInfo">
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-user"></i>
                </button>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <router-link
                      :to="{ name: 'detail-account' }"
                      class="nav-link"
                    >
                      Hồ sơ
                    </router-link>
                  </li>
                  <li>
                    <button class="btn-logout" @click="showConfirmation">
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AccountService from "@/services/client/account.service";
import { reactive } from "vue";
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  data() {
    const userInfo = reactive({
      name: "",
      email: "",
    });
    return {
      userInfo,
    };
  },
  methods: {
    async mounted() {
      try {
        const user = await AccountService.getuser();
        // Lưu thông tin admin vào biến dữ liệu
        this.userInfo = user;
      } catch (error) {
        console.error("Error fetching admin info:", error);
        // Xử lý lỗi nếu cần
      }
    },
    async showConfirmation() {
      try {
        const result = await Swal.fire({
          title: "Bạn chắc chắn muốn đăng xuất?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Có",
        });

        if (result.isConfirmed) {
          await AccountService.logout();
          this.$store.commit("SET_LOGIN_STATE", false);
          Swal.fire({
            title: "Đăng xuất thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log("Người dùng hủy đăng xuất.");
        }
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        Swal.fire({
          title: "Đã xảy ra lỗi khi đăng xuất",
          text: "Vui lòng thử lại sau.",
          icon: "error",
        });
      }
    },
  },

  created() {
    this.mounted();
  },
};
</script>


<style>
.header {
  width: 100vw;
  padding: 5px 0;
  box-shadow: 2px 2px 5px #7e7e7e;
  position: fixed;
  z-index: 99;
  font-size: 1.2rem;
  background-color: white;
}
.header .nav-link.cartanduser.cart{
  position: relative;
}
.header .quantitycart{
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 0.7rem;
  color: white;
  background: red;
  padding:  1px 7px;
  border-radius: 50%;
}

.header-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.option-menu {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option-menu,
.product-cartanduser,
.dropdown-menu {
  padding: 0;
}

.option-menu .menu-item {
  margin: 0;
}

.option-menu .menu-item a {
  color: black;
  transition: color 0.4s ease;
}

.option-menu .menu-item a:hover {
  color: palevioletred;
}

.product-logo img {
  width: 100px;
}

.product-cartanduser {
  margin: 0;
  display: flex;
  align-items: center;
}

.cartanduser {
  padding: 0;
  margin: 0 10px;
  color: black;
  transition: color 0.4s ease;
}

.cartanduser:hover {
  color: palevioletred;
}
/* dropdown */
.accountInfo .dropdown {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  box-shadow: none;
}
.accountInfo i {
  color: black;
}
.accountInfo .dropdown .btn {
  color: black;
}
.accountInfo .btn.dropdown-toggle {
  width: 100%;
}
.dropdown:hover > .dropdown-menu {
  display: block;
}

.accountInfo .dropdown > .dropdown-toggle:active {
  /* pointer-events: none; */
  outline: none;
}

.accountInfo .dropdown-menu {
  text-align: center;
}

.accountInfo li {
  color: black;
}
.accountInfo li .infoUser {
  font-size: 1rem;
  width: 100vw;
}
.accountInfo .btn-logout {
  font-size: 1rem;
  border: none;
  background: none;
  font-weight: 600;
}

.accountInfo .infoUser:hover,
.btn-logout:hover {
  color: palevioletred;
  background: none;
}

/* reponsive */

@media (max-width: 992px) {
  .option-menu .menu-item a {
    font-size: 1rem;
    padding: 5px;
  }
  .product-cartanduser a {
    font-size: 1rem;
    margin: 0;
    padding: 5px;
  }
}
@media (max-width: 768px) {
  .product-logo img {
    width: 60px;
  }
  .option-menu .menu-item a {
    font-size: 0.8rem;
    padding: 3px;
  }
  .product-cartanduser a {
    font-size: 0.8rem;
    padding: 3px;
  }
  .accountInfo .fa-user {
    font-size: 0.8rem;
  }
}
@media (max-width: 576px) {
  .product-logo img {
    width: 40px;
  }
}
</style>