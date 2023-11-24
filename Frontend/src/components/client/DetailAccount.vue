<template>
  <div class="detail-account">
        <h4>Thông Tin Người Dùng</h4>

    <div class="container">
      <div class="detail-account-box1">
        <div class="detail-account-img">
          <img src="../../assets/image/avt-user.png" alt="" />
        </div>
        <h5>{{ userInfo.name }}</h5>
      </div>
      <div class="detail-account-box2">
        <p>Email: {{ userInfo.email }}</p>
        <p>SĐT: {{ userInfo.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/client/account.service";
import { reactive } from "vue";
export default {
  data() {
    const userInfo = reactive({
      name: "",
      email: "",
    });
    return {
      userInfo,
    };
  },
  methods: {
    async mounted() {
      try {
        const user = await AccountService.getuser();
        // Lưu thông tin admin vào biến dữ liệu
        this.userInfo = user;

        // Hiển thị thông tin admin
        // console.log("abc", userInfo);
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
.detail-account{
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
}

.detail-account .container{
    width: 400px;
    border: 1px solid black;
}
.detail-account h4{
    text-align: center;
    font-size: 1.2rem;
}

.detail-account-box1 {
    display: flex;
    margin: 20px;
    /* justify-content: space-evenly; */
}

.detail-account-box2{
    margin: 20px;

}
.detail-account-box1 img{
    width: 50px;
}

</style>