<template>
  <div class="filter">
    <div class="card">
      <div class="card-header">Lọc sản phẩm</div>
      <div class="card-body">
        <div class="body-one">
          <div class="card-pro all">
            <a
              :class="{ active: clickStatus === '' }"
              @click="filterStatus('')"
            >
              Tất cả
            </a>
          </div>
          <div class="card-pro">
            <a
              :class="{ active: clickStatus === 'Hoạt động' }"
              @click="filterStatus('Hoạt động')"
              >Hoạt động
            </a>
          </div>
          <div class="card-pro inactive">
            <a
              :class="{ active: clickStatus === 'Ngừng hoạt động' }"
              @click="filterStatus('Ngừng hoạt động')"
            >
              Ngừng hoạt động
            </a>
          </div>
        </div>
        <div class="body-two">
          <li class="menu-item search">
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
          </li>
        </div>
        <div class="body-three">
          <select name="sort" id="sort" @change="Sort">
            <option value="default">Mặc định</option>
            <option value="position-asc">Vị trí tăng dần</option>
            <option value="position-desc">Vị trí giảm dần</option>
            <option value="priceNew-asc">Giá tăng dần</option>
            <option value="priceNew-desc">Giá giảm dần</option>
            <option value="stock-desc">Số lượng sản phẩm giảm dần</option>
            <option value="stock-desc">Số lượng sản phẩm tăng dần</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ProductService from "@/services/admin/product.service";

export default {
  data() {
    return {
      clickStatus: "",
      value: "",
    };
  },

  methods: {
    async filterStatus(status) {
      this.clickStatus = status;

      if (this.clickStatus === "") {
        this.$router.push({ name: "product" });
        window.location.reload();
      }

      try {
        const query = status ? { status } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });
        const filterProduct = await ProductService.getAll({ params: query });

        if (filterProduct) {
          this.$emit("filter-product", filterProduct);
          console.log("filterProduct = ", filterProduct);
        }
      } catch (error) {
        console.log(error);
      }
    },

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

        console.log("newProduct12", newProduct);

        if (newProduct) this.$emit("search-product", newProduct);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.body-one{
  display: flex;
}
.card-header {
  font-weight: 600;
  font-size: 1.2rem;
  color: white;
  background-color: #343a40;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-pro a {
  border-radius: 5px;
  border: 1px solid green;
  padding: 10px;
  box-shadow: 0px 2px 3px #9e9e9e;
  transition: background-color 0.5s ease;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none;
  color: #343a40;
}
.card-pro a:hover {
  background-color: green;
  color: white;
}

a.active {
  background-color: #218838;
  color: white;
}

/* body two */
.menu-item.search{
  display: flex;
  align-items: center;
}

.menu-item.search input{
  border: 2px solid #343a40;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
}

.menu-item.search i {
  color: white;
  border: 2px solid #343a40;
  background-color: #343a40;
  padding: 9px;
  margin-left: 2px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
}
.menu-item.search i:hover{
  border: 2px solid #343a40;
  color: #343a40;
  background-color: white;
}
.body-three select{
  box-shadow: 1px 2px 2px #c1c1c1;
  background-image: linear-gradient(to right,  black , grey);
  height: 30px;
  border-radius: 15px;
  text-align: center;
  color: white;
  border: 1px solid #76AEDD;
  cursor: pointer;
}
.body-three select:hover{
  background-image: linear-gradient(to left, black , grey);

}
.body-three select option{
  color: #343A40;
}
select option:hover{
  background-color: #343A40;
  color: white;
}


</style>