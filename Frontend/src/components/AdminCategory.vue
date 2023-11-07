<template >
  <div class="ad-pro">
    <Sidebar />
    <div class="filter">
      <div class="card">
        <div class="card-header">Danh mục</div>
        <div class="card-body">
          <div class="body-one">
            <div class="card-cate flow">
              <a href="">Hoa Tươi</a>
            </div>
            <div class="card-cate gift">
              <a href="">Set quà</a>
            </div>
            <div class="card-cate handmade">
              <a href="">Đồ Handmade</a>
            </div>
          </div>
          <div class="body-two">
            <div class="admin-create">
              <router-link :to="{ name: 'create' }"  class="nav-link">
                <i class="fa-solid fa-plus"></i>
                Thêm sản phẩm
              </router-link>
            </div>
            <div class="admin-dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Sắp xếp
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Sắp xếp theo giá tăng dần</a>
                <a class="dropdown-item" href="#">Sắp xếp theo giá giảm dần</a>
              </div>
            </div>
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
            <td>{{item.position}}</td>
            <td>
                <img
                  :src="item.thumbnail"
                  alt="Thumbnail"
                  class="product-thumbnail"
                />
            </td>
            <td>{{item.title}}</td>
            <td>{{item.price}}.000đ</td>
            <td>{{item.stock}} SP</td>
            <td>
              <button type="button" class="btn btn-success">
                {{item.status}}
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-secondary edit" @click="editProduct(item._id)">
                  Sửa
              </button>
              <button type="button" class="btn btn-danger" @click="deleteProduct(item._id)">
                Xóa
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
// import ProductService from "@/services/admin/product.service";
import Sidebar from "@/components/Sidebar.vue";


export default {
  components : {
    Sidebar
  },
  props: {
    products: {
      type: Array,
      default: [],
    },
  },
  data(){
    return{
      activeIndex: -1,
  
    }
  },
  computed: {
    //san pham dang duoc chon
    activeProduct(){
      if(this.activeIndex >= 0){
        return this.products[this.activeIndex]._id;
      }
      return null;
    }
  },
  methods: {
    editProduct(productId){
      this.$router.push({name: 'edit', params: {id : productId}})
    },
    deleteProduct(productId){
      this.$emit('delete-product', productId);
    },
  },

};
</script>