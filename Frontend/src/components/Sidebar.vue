<template >
    <div class="sider">
      <div class="inner-menu">
        <ul>
          <li>
            <router-link :to="{ name: 'admin' }"  class="nav-link">
              Sản phẩm
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'category' }"  class="nav-link">
              Danh mục
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'category' }"  class="nav-link">
              Quản lý nhân viên
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>