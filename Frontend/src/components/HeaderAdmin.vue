<template>
  <div class="header">
    <div class="container">
      <div class="header-menu">
        <div class="product-logo">
          <router-link :to="{ name: 'home' }" class="nav-link">
            <img src="../assets/image/3.png" alt="" />
          </router-link>
        </div>

        <ul class="option-menu" v-if="isLoggedIn">
          <li class="menu-item home">
            <!-- <a href="http://127.0.0.1:3001/client"> -->
            <router-link :to="{ name: 'home' }" class="nav-link">
              Trang chủ
            </router-link>
            <!-- </a> -->
          </li>
          <li class="menu-item pro">
            <router-link :to="{ name: 'product' }" class="nav-link">
              Sản phẩm
            </router-link>
          </li>
          <li class="menu-item about">
            <router-link :to="{ name: 'category' }" class="nav-link">
              Về chúng tôi
            </router-link>
          </li>
        </ul>

        <ul class="product-cartanduser">
        
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'register' }" class="nav-link">
              Đăng ký
            </router-link>
          </li>

           <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'login-admin' }" class="nav-link">
              Đăng nhập
            </router-link>
          </li>

          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'login-admin' }" class="nav-link">
              Đăng xuất
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
  isLoggedIn() {
    return this.$store.state.isLoggedIn;
  },
},
  setup() {},
};
</script>


<style>
@import url("https://fonts.cdnfonts.com/css/margesh");

.header {
  width: 100vw;
  padding: 5px 0;
  box-shadow: 2px 2px 5px #7e7e7e;
  position: fixed;
  z-index: 99;
  font-size: 1.2rem;
  font-family: "Margesh Regular";
  background-color: white;
}

/* ul.option-menu {
  
  margin: 0;
}

.product-logo img{
  width: 100px;
}

ul.product-cartanduser{
  margin: 0;
}

li {
  margin: 0;
}

li a{
  color:  black;
}
.header-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

/* .product-cartanduser{
  display: flex;
  align-items: center;
  justify-content: space-between;
} */
</style>