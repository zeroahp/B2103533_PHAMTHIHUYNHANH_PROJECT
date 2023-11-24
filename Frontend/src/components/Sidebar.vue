<template >
  <div class="sider">
    <div class="inner-menu">
      <ul>
        <li>
          <router-link
            :class="{ active: $route.name === 'product' }"
            :to="{ name: 'product' }"
            class="nav-link"
          >
            Sản phẩm
          </router-link>
        </li>
        <li>
          <router-link
            :class="{ active: $route.name === 'category' }"
            :to="{ name: 'category' }"
            class="nav-link"
          >
            Danh mục
          </router-link>
        </li>
        <li>
          <router-link
            :class="{ active: $route.name === 'management' }"
            :to="{ name: 'management' }"
            class="nav-link"
          >
            Quản lý tài khoản
          </router-link>
        </li>
      </ul>
    </div>

    <div class="inner-account">
      <div class="inner-account-img">
        <i class="fa-solid fa-user-gear"></i>
      </div>
      <div class="inner-account-name">
        {{ adminInfo.name }}
      </div>
    </div>
  </div>
</template>

<script>
import ShowFilterCategory from "../components/ShowFilterCategory.vue";
import AccountService from "@/services/admin/account.service";
import { reactive } from "vue";

export default {
  components: {
    ShowFilterCategory,
  },

  data() {
    const adminInfo = reactive({
      name: "",
      email: "",
      phone: "",
    });
    return {
      adminInfo,
    };
  },
  methods: {
    async mounted() {
      try {
        const adminInfo = await AccountService.welcom();
        // Lưu thông tin admin vào biến dữ liệu
        Object.assign(this.adminInfo, adminInfo);

        // Hiển thị thông tin admin
        console.log("abc", this.adminInfo);
      } catch (error) {
        console.error("Error fetching admin info:", error);
        // Xử lý lỗi nếu cần
      }
    },
  },

  created() {
    this.mounted();
  },
};
</script>

<style>
.sider {
  position: fixed;
  top: 80px;
  left: 0;
  color: white;
  background-color: #343a40;
  width: 180px;
  height: 100vh;
  z-index: 9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.sider .inner-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sider .inner-menu ul li a {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  display: block;
  padding: 25px;
  text-decoration: none;
  text-align: center;
}

.sider .inner-menu ul li a {
  transition: background-color 0.3s ease;
}

.sider .inner-menu ul li a:hover {
  color: black;
  background-color: #ffffff;
}

.sider .inner-menu ul li a.active {
  background-color: #ffffff;
  color: black;
}

.sider .inner-account {
  width: 100%;
  color: white;
  padding: 20px 10px 20px 10px ;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid white;
  transition: background 0.3s ease;
  cursor: pointer;
}

.sider .inner-account:hover{
  background: white;
  color: black;
}
</style>