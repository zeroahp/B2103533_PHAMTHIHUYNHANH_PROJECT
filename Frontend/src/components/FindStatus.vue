<template >
  <div class="ad-pro">
    <!-- <Sidebar /> -->
    <div class="filter">
      <div class="card">
        <div class="card-header">Lọc sản phẩm</div>
        <div class="card-body">
          <div class="body-one">
            <div class="card-pro all">
              <a href="">Tất cả</a>
            </div>
            <div class="card-pro active">
              <!-- <a @click="filterStatus('active')">Hoạt động</a> -->
              <router-link
                :to="{
                  name: 'findstatus',
                  params: { status: 'Hoạt động' },
                  props: { products: products },
                }"
              >
                Hoạt động
              </router-link>
            </div>
            <div class="card-pro inactive">
              <!-- <a @click="filterStatus('inactive')">Ngừng hoạt động</a> -->
               <router-link
                :to="{
                  name: 'findstatus',
                  params: { status: 'Ngừng hoạt động' },
                  props: { products: products },
                }"
              >
                Ngừng hoạt động
              </router-link>
            </div>
          </div>
          <div class="body-two">
            <label for="sort">Sắp xếp :</label>
            <select name="sort" id="sort">
              <option value="default">Mặc định</option>
              <option value="pos-asc">Vị trí tăng dần</option>
              <option value="pos-desc">Vị trí giảm dần</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </div>
      <div class="product-list">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Vị trí</th>
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
              <td>{{ item.position }}</td>
              <td>
                <img
                  :src="item.thumbnail"
                  alt="Thumbnail"
                  class="product-thumbnail"
                />
              </td>
              <td>{{ item.title }}</td>
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
              <td>
                <button type="button" class="btn btn-secondary edit">
                  Sửa
                </button>
                <button type="button" class="btn btn-danger">Xóa</button>
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
// import ProductService from "@/services/admin/product.service";

export default {
  components: {
    // Sidebar,
  },
  props: {
    products: {
      type: Array,
      default: [],
    },
    status: String
  },
  methods: {
    changeStatus(productId) {
      this.$emit("change-status", productId);
    },
  },
  created() {
    console.log(this.status);
  },
};
</script>