<template>
  <div class="header">
    <div class="container">
      <div class="product">
        <div class="product-logo">
          <router-link :to="{name: 'home'}" class="nav-link">
            LOGO
          </router-link>
        </div>
        <ul class="product-menu">
          <li class="menu-item home">
            <a href="http://127.0.0.1:3001/client">
              <router-link :to="{name: 'home'}" class="nav-link">
              Trang chủ
              </router-link>
            </a>
          </li>
          <li class="menu-item category">
            <router-link :to="{name: 'category'}" class="nav-link">
            Danh mục
            </router-link>
          </li>
          <li class="menu-item search">
            <form class="form-search">
              <input
                class=" input-search form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <a
                class="btn-search"
                type="submit"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </a>
            </form>
          </li>
        </ul>
        <div class="product-cartanduser">
          <div class="product-cart">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div class="product-user">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>