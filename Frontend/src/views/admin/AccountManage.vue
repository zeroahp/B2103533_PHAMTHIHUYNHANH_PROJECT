<template>
  <div class="account-management">
    <div class="container">
      <h3 class="account-management-title">DANH SÁCH KHÁCH HÀNG</h3>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên Khách Hàng</th>
            <th scope="col">Email</th>
            <th scope="col">SĐT</th>
            <th scope="col">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userInfo" :key="user._id">
            <th scope="row">{{ user.position }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.updatedAt }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import AccountService from "@/services/admin/account.service";

export default {
  data() {
    const userInfo = reactive({
      name: "",
      email: "",
      position: "",
      phone: "",
    });
    return {
      userInfo,
    };
  },
  methods: {
    async mounted() {
      try {
        const user = await AccountService.accountmanagement();
        // Lưu thông tin user vào biến dữ liệu
        // Object.assign(this.userInfo, user);
        this.userInfo = user;
        console.log("alo",this.userInfo.length);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  },

  created() {
    this.mounted();
  },
};
</script>


<style>
.account-management {
  position: absolute;
  top: 100px;
  left: 180px;
  right: 0;
  bottom: 0;
}

.account-management-title {
  font-size: 1.5rem;
  color: #343A40;
  text-align: center;

  margin-bottom: 30px;
}
</style>