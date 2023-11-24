<template >
  <div class="ad-category">
    <div class="card">
      <div class="card-header">
        <ShowCategory @filter-category="handleCategoryFilter" />
        <div class="create-product">
          <router-link :to="{ name: 'create' }" class="nav-link">
            <i class="fa-solid fa-plus"></i>
            Thêm sản phẩm
          </router-link>
        </div>
      </div>

      <div
        class="card-body"
        :class="{
          'category-flower': category === 'Hoa Tươi',
          'category-noen': category === 'Noen',
          'category-handmade': category === 'Đồ Handmade',
          'category-gift': category === 'Set Quà',
          'category-feature': category === 'Nổi Bật',
        }"
      ></div>
    </div>

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
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item-tb" v-for="item in products" :key="item._id">
            <td class="position">{{ item.position }}</td>

            <td>
              <img
                :src="item.thumbnail"
                alt="Thumbnail"
                class="product-thumbnail"
              />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.priceNew }}.000đ</td>
            <td>{{ item.stock }} SP</td>
            <td class="td-status">
              <!-- <button type="button" class="btn btn-success"> -->
                <p>{{ item.status }}</p>
              <!-- </button> -->
            </td>
            <td class="action">
              <button
                type="button"
                class="btn btn-secondary edit"
                @click="editProduct(item._id)"
              >
                Sửa
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteProduct(item._id)"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ShowCategory from "@/components/ShowFilterCategory.vue";

export default {
  components: {
    ShowCategory,
  },
  props: {
    products: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeIndex: -1,
      category: "",
    };
  },
  computed: {
    //san pham dang duoc chon
    activeProduct() {
      if (this.activeIndex >= 0) {
        return this.products[this.activeIndex]._id;
      }
      return null;
    },
  },
  methods: {
    editProduct(productId) {
      this.$router.push({ name: "edit", params: { id: productId } });
    },
    deleteProduct(productId) {
      this.$emit("delete-product", productId);
    },

    handleCategoryFilter(newProduct) {
      this.$emit("filter-cate", newProduct);

      this.category = newProduct[0].category;
      // console.log("cate", this.category);
    },
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  background-color: #343a40;
}

 
thead{
  background-color: #343A40;
}
.create-product {
  background-color: orangered;
  border-radius: 10px;
  border: 2px solid white;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 4px;
}

.create-product:hover {
  cursor: pointer;
  background-color: white;
  border: 2px solid orangered;
}
 
.create-product a {
  color: white;
  font-size: 1rem;
}

.create-product a:hover {
  color: orangered;
}


.category-handmade {
  background-image: url("../assets/image/handmade.png");
  height: 150px;
  background-size: cover;
}
.category-gift {
  background-image: url("../assets/image/gift.png");
  height: 150px;
  background-size: cover;
}
.category-flower {
  background-image: url("../assets/image/flower.png");
  height: 150px;
  background-size: cover;
}

.category-noen {
  background-image: url("../assets/image/noen.png");
  height: 150px;
  background-size: cover;
}

.category-feature {
  background-image: url("../assets/image/Feature.png");
  height: 150px;
  background-size: cover;
}
td img {
  width: 150px;
} 


tbody .item-tb td {
  border: none;
  outline: none;
}
.position {
  margin-left: 25px;
  width: 80px;
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

.td-status p{
  font-weight: 600;
}
</style>
