<template>
  <div class="product-filter">
    <div class="search-product">
      <input
        class="input-search form-control"
        type="search"
        placeholder="Tìm sản phẩm"
        aria-label="Search"
        @input="onSearch"
      />
      <a class="btn-search" type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
      </a>
    </div>

    <div class="filter-category">
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
              @click="getFeature"
              >Nổi Bật
            </a>
          </li>
          <li>
            <router-link :to="{ name: 'product-client' }" class="nav-link">
              Tất cả
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="sort-product">
      <select name="sort" id="sort" @change="Sort">
        <option value="default">Mặc định</option>
        <option value="priceNew-asc">Giá tăng dần</option>
        <option value="priceNew-desc">Giá giảm dần</option>
        <option value="title-asc">Tên từ A-Z</option>
        <option value="title-desc">Tên từ Z-A</option>
      </select>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";

export default {
  data() {
    return {
      clickCate: "",
      clickStatus: "",
      value: "",
    };
  },

  methods: {
    async Sort(sort) {
      this.clickStatus = sort.target.value;
      const [sortKey, sortValue] = this.clickStatus.split("-");

      try {
        this.$router.push({
          path: this.$route.path,
          query: { sortKey, sortValue },
        });

        const sortProduct = await ProductService.getAll({
          params: { sortKey, sortValue },
        });

        if (sortProduct) {
          this.$emit("sort-product", sortProduct);
          console.log("sort-product = ", sortProduct);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onSearch(e) {
      const title = e.target.value;
      const currentRoute = this.$router.currentRoute.value;

      try {
        this.$router.push({
          path: currentRoute.path,
          query: { ...currentRoute.query, title },
        });

        const newProduct = await ProductService.getAll({
          params: { title },
        });

        console.log("newProduct 1", newProduct);

        if (newProduct) this.$emit("search-product", newProduct);
      } catch (error) {
        console.log(error);
      }
    },

    async filterCate(category) {
      this.clickCate = category;
      try {
        const query = category ? { category } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });

        // Thực hiện lọc sản phẩm và cập nhật danh sách
        const newProduct = await ProductService.getAll({ params: query });

        if (newProduct) {
          this.$emit("filter-category", newProduct);
        }
        console.log(newProduct);
      } catch (error) {
        console.log(error);
      }
    },

    async getFeature() {
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

        if (newProduct) {
          this.$emit("filter-category", newProduct);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.product-filter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* search */

.search-product {
  display: flex;
  border: 2px solid #eeeeee;
  box-shadow: 2px 2px 5px #bdbdbd;
}

.search-product input {
  outline: none;
  height: 38px;
  border: none;
}

.search-product a {
  background-color: #eeeeee;
  color: black;
  padding: 9px;
}

/* dropdown */

.dropdown {
  box-shadow: 1px 2px 3px #919191;
  border-radius: 5px;
  background-color: #eeeeee;
  border: 1px solid #e9ecef;
  outline: none;
  width: 100%
}

.dropdown .btn {
  color: black;
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
.dropdown-menu {
  text-align: center;
}
.dropdown-menu li{
  margin: 0;
  padding: 0;
}
.dropdown-menu li a {
text-align: center;
  font-weight: 600;
  color: #343a40;
  cursor: pointer;
}

.dropdown-menu li a:hover {
  background-color: #343a40;
  color: white;
}

/* sort */
.sort-product select {
  width: 230px;
  height: 100%;
  background-color: #eeeeee;
  color: black;
  box-shadow: 2px 2px 5px #bdbdbd;
  border: none;
}

.sort-product select option {
  background: white;
  color: black;
}
</style>