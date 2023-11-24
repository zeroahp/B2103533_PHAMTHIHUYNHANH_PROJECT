<template>
  <Form
    class="form-register"
    :validation-schema="accountFormSchema"
    @submit.prevent="submit"
  >
    <div class="container register">
      <div class="register-img">
        <img src="../../assets/image/xinh/lyly.png" alt="" />
      </div>

      <div class="register-authen">
        <h3>ĐĂNG KÝ</h3>

        <div class="register-page" action="">
          <div class="form-group">
            <label for="name">Họ và tên</label>
            <Field
              name="name"
              type="text"
              class="form-control"
              placeholder="Nhập họ và tên"
              v-model="account.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email"> Email </label>
            <Field
              name="email"
              type="email"
              class="form-control"
              placeholder="Nhập email"
              v-model="account.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="phone"> Số điện thoại </label>
            <Field
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              v-model="account.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="passwrd"> Mật khẩu </label>
            <Field
              type="password"
              class="form-control"
              id="passwd"
              name="passwd"
              placeholder="Nhập mật khẩu"
              v-model="account.passwd"
            />
            <ErrorMessage name="passwd" class="error-feedback" />
          </div>
        </div>

        <div class="form-group ">
          <button @click="submit" type="submit" class="btn btn-register">Đăng ký</button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import AccountService from "@/services/client/account.service";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const accountFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Nhập họ và tên.")
        .max(30, "Tiêu đề có nhiều nhất 30 ký tự."),
      email: yup.string().email("E-mail không đúng.").required("Nhập email."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      passwd: yup
        .string()
        .required("Nhập mật khẩu.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
    });

    const account = reactive({
      name: "",
      email: "",
      phone: "",
      passwd: "",
    });
    return {
      account,
      accountFormSchema,
    };
  },

  methods: {
    async submit(e) {
      e.preventDefault();

      try {
        await AccountService.register(this.account);
        Swal.fire({
          title: "Thành công!",
          text: "Đăng ký tài khoản thành công",
          icon: "success",
          timer: 1000, // Tự đóng sau 2 giây (3000ms)
          showConfirmButton: false, // Ẩn nút xác nhận
        });
        this.$router.push({name:"login-authen"});

      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/margesh");

.form-register {
  position: absolute;
  right: 0;
  left: 0;
  top: 100px;
  /* font-family: "Margesh Regular"; */
}

.container.register {
  display: flex;
  align-items: center;
  width: 800px;
  border: 2px solid #445b6d;
  border-radius: 20px;
  padding: 0;
  transform: translateY(30px);
  animation: fadeInDown 2s ease-out;
}

.container .register-img {
  width: 400px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  overflow: hidden;
  object-fit: cover;
}
.container .register-img img {
  width: 100%;
  margin-right: 20px;
  height: 100%;
  aspect-ratio: 3/4;
  /* display: inline-block; */
}

/* register-authen */
.register-authen {
  flex: 1;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-authen h3 {
  font-size: 1.5rem;
}

.register-authen .form-control {
  width: 320px;
}

.check-user {
  display: flex;
  justify-content: space-between;
}

.btn-register {
  border: none;
  background-color: #445b6d;
  padding: 8px 10px;
  color: white;
  border: 1px solid #445b6d;
  box-sizing: border-box;
  transition: background-color 0.3s ease-in-out;
}

.btn-register:hover {
  background-color: white;
  color: #445b6d;
}
.error-feedback{
  color: red;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(40);
  }
}
</style>