<!-- Trong ShowCategory.vue -->
<template>
  <div class="show-cate">
   
      <div class="dropdown">
        <button
          class="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          Chọn danh mục
        </button>
        
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a
              class="dropdown-item"
              :class="{ flower: clickCate === 'Hoa Tươi' }"
              @click="filterCate('Hoa Tươi')"
            >
              Hoa Tươi
            </a>
          </li>
          <li>
            <a
              class="dropdown-item"
              :class="{ gift: clickCate === 'Set Quà' }"
              @click="filterCate('Set Quà')"
              >Set quà</a
            >
          </li>
         
          <li>
            <a
              class="dropdown-item"
              :class="{ noen: clickCate === 'Noen' }"
              @click="filterCate('Noen')"
              >Noen
            </a>
          </li>
          <li>
            <a
              class="dropdown-item"
              :class="{ feature: clickCate === 'Nổi Bật' }"
              @click="filterCate('Nổi Bật')"
              >Nổi Bật
            </a>
          </li>
          <li>
            <router-link :to="{ name: 'category' }" class="nav-link">
              Tất cả
            </router-link>
          </li>
        </ul>

      </div>
   
  </div>
</template>

<script>
import ProductService from "@/services/admin/product.service";

export default {
  data() {
    return {
      clickCate: "",
    
    };
  },

  methods: {
    async filterCate(category) {
      this.clickCate = category;
      try {
        const query = category ? { category } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });

        // Thực hiện lọc sản phẩm và cập nhật danh sách
        

        if (newProduct) {
          this.$emit("filter-category", newProduct);
        }
        console.log(newProduct);
      } catch (error) {
        console.log(error);
      }
    },

    // Các phương thức khác (ví dụ: xóa sản phẩm, sửa sản phẩm, ...)
  },
};
</script>

<style>

.dropdown{
  box-shadow: 1px 2px 2px #343A40;
  border-radius: 5px;
  background-color: #343A40;
  border: 1px solid #E9ECEF;
  outline: none;
}

.dropdown .btn{
  color: white;
}
.btn.dropdown-toggle {
  width: 100%;
}
.dropdown:hover > .dropdown-menu {
  display: block;
}

.dropdown > .dropdown-toggle:active {
  /*Without this, clicking will make it sticky*/
  pointer-events: none;
  outline: none;
}
.dropdown-menu{
  text-align: center;
}
.dropdown-menu li a{
  font-weight: 600;
  color: #343A40;
  cursor: pointer;
}

.dropdown-menu li a:hover{
  background-color: #343A40;
  color: white;
}
</style>

