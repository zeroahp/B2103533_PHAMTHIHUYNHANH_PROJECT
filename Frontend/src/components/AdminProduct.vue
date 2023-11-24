<template >
  <div class="ad-product">
    <div class="side-right">
      <Filter
        @filter-product="handleProductsFilter"
        @sort-product="handleProductsFilter"
        @search-product="handleSearch"
      />

      <div class="product-list">
        <table class="table">
          <thead class="thead-dark">
            <tr class="thead-title">
              <th class="position" scope="col">Vị trí</th>

              <th scope="col">Hình ảnh</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Giá</th>
              <th scope="col">Kho</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Tải lên lúc</th>
            </tr>
          </thead>

          <tbody>
            <tr class="item-tb" v-for="item in products" :key="item._id">
              <td class="position">{{ item.position }}</td>

              <td class="thumbnail" @click="detailProduct(item._id)">
                <img
                  :src="item.thumbnail"
                  alt="Thumbnail"
                  class="product-thumbnail"
                />
              </td>
              <td class="title">{{ item.title }}</td>
              <td>{{ item.price }}.000đ</td>
              <td>{{ item.stock }} SP</td>
              <td>
                <button
                  @click="changeStatus(item._id)"
                  type="button"
                  class="btn btn-success"
                >
                  {{ item.status }}
                </button>
              </td>
              <td class="action">
                <!-- <button type="button" class="btn btn-secondary edit">
                  Sửa
                </button>
                <button type="button" class="btn btn-danger">Xóa</button> -->
                {{item.updatedAt}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import Sidebar from "@/components/Sidebar.vue";
import Filter from "@/components/AdminFilter.vue";

export default {
  components: {
    Filter,
  },
  props: {
    products: {
      type: Array,
      default: [],
    },
  },
  methods: {
    changeStatus(productId) {
      this.$emit("change-status", productId);
    },

    handleProductsFilter(newProducts) {
      this.$emit("filter-admin", newProducts);
      // console.log("newproduct", newProducts);
    },

    handleSearch(newProduct) {
      this.$emit("search-pro", newProduct);
    },

    detailProduct(productId) {
      this.$router.push({ name: "detail", params: { id: productId } });
      this.$emit("detail", productId);
    },
  },
  created() {
    // const savedProducts = localStorage.getItem("filteredProducts");
    // if (savedProducts) {
    //   this.localProducts = JSON.parse(savedProducts);
    // } else {
    //   // this.localProducts = this.products;
    //   const savedOriginalProducts = localStorage.getItem("originalProducts");
    //   if (savedOriginalProducts) {
    //     this.localProducts = JSON.parse(savedOriginalProducts);
    //   } else {
    //     this.localProducts = this.products;
    //   }
    // }
    // console.log("localprodut", this.localProducts);
  },
};
</script>


<style>
td img {
  width: 150px;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 10px;
}

.thead-title{
  text-align: center;
}

.item-tb td{
  vertical-align: middle;
  text-align: center;
}

.position{
  width: 4rem ;
}

.action button{
  margin-right: 5px;
}
</style>