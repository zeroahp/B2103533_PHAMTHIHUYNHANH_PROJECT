<template>
  <div class="bill-detail">
    <div class="container">
      <h1>Chi tiết hóa đơn </h1>
      <p class="currentDate">
        Số: #HD{{ billNumber }}<br/>
        Thời gian: {{currentDate}}
      </p>
      <div class="bill-box">
        <div class="bill-username"><b>Tên khách hàng:</b> {{ userInfo.name }}</div>
        <div class="bill-phone"><b>SĐT:</b> {{ userInfo.phone }}</div>
        <div class="bill-email"><b>Email:</b> {{ userInfo.email }}</div>
        <div class="bill-locate">
          <p><b>Nhập địa chỉ nhận hàng:</b></p>
          <textarea name="location" id="location"  rows="2" required>
          </textarea>
        </div>

        <div class="bill-product">
          <p><b>Sản phẩm:</b></p>
          <table>
            <thead>
               <tr>
                <th>Tên SP</th>
                <th>SL</th>
                <th>Giá bán</th>
            </tr> 
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item._id" >
                <td>{{item.title}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.priceNew * item.quantity }}.000đ</td>
                
            </tr>
            </tbody>
            
          </table>
        </div>
        <div class="bill-ship">
            *Phí ship toàn quốc: 30.000đ
        </div>
        <div class="bill-total">
            <p>Tổng cộng: {{totalQuantity + 30}}.000đ</p>
        </div>

        <div class="bill-confirm">
            <button @click="buyProduct">Đặt hàng</button>
            <button @click="notBuy">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/client/account.service";
import { reactive } from "vue";
import Swal from "sweetalert2";

export default {
  data() {
    const userInfo = reactive({
      name: "",
      email: "",
      phone: "",
    });
    return {
      billNumber: "",
      userInfo,
      currentDate : new Date(),
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalQuantity() {
      // console.log(product.quantity);
      return this.cart.reduce(
        (total, product) => total + product.priceNew * product.quantity,
        0
      );
    },
  },
  methods: {
    generateBillNumber() {
      return Math.floor(10000 + Math.random() * 90000).toString(); //random 4 so
    },
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
    },
    async mounted() {
      try {
        const user = await AccountService.getuser();
        this.userInfo = user;
      } catch (error) {
        console.error("Error fetching admin info:");
      }
    },

    async buyProduct(){
        for (const item of this.cart) {
          await this.removeFromCart(item);
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 2500,
        });
        this.$router.push({ name: "home" });
    },

    notBuy(){
      this.$router.push({ name: "home" });
    }
  },
  created() {
    this.billNumber = this.generateBillNumber();
    this.mounted();
    this.currentDate = new Date().toLocaleString('vi-VN');
  },
};
</script>
<style >
.bill-detail {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
}

.bill-detail .container{
    width: 600px;
    border: 1px inset black;
    padding: 40px;
    box-shadow: 2px 2px 5px #C4C4C4;
}
.bill-detail .currentDate{
  text-align: end;
  font-size: 0.9rem;
}

.bill-detail .container h1{
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
}

.bill-detail .container textarea{
    width: 100%;
}

.bill-detail .container table{
    width: 100%;
    border: 1px solid #C4C4C4;
    margin: 10px 0;
}
.bill-detail .container table th{
    background: #e0e0e0;
}

.bill-ship{
    font-size: 0.9rem;
}
.bill-total p{
    text-align: end;
    font-weight: 600;
}

.bill-confirm{
    text-align: center;
} 

.bill-confirm button{
    margin: 5px;
    border: none;
    background: #C4C4C4;
    padding: 4px 8px;
}

.bill-confirm button:hover{
    color: white;
}
</style>