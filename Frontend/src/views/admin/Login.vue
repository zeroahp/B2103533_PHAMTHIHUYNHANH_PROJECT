<template>
  <Form
    class="form-login"
    :validation-schema="accountFormSchema"
    @submit.prevent="submit"
  >
    <div class="container login">
      <div class="login-img">
        <img src="../../assets/image/login.png" alt="" />
      </div>

      <div class="login-authen">
        <h3>ĐĂNG NHẬP</h3>

        <div class="login-page" action="">
          <div class="form-group">
            <label for="email"> Email </label>
            <Field
              name="email"
              type="email"
              class="form-control"
              placeholder="Nhập email"
              v-model="loginAccount.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="passwrd"> Mật khẩu </label>
            <Field
              type="password"
              class="form-control"
              id="passwd"
              name="passwd"
              placeholder="Nhập mật khẩu"
              v-model="loginAccount.passwd"
            />
            <ErrorMessage name="passwd" class="error-feedback" />
          </div>
        </div>
        <div class="form-group">
          <button @click="submit" type="submit" class="btn btn-login">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import AccountService from "@/services/admin/account.service";
import { mapMutations } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const accountFormSchema = yup.object().shape({
      email: yup.string().email("E-mail không hợp lệ").required("Nhập email"),
      passwd: yup
        .string()
        .required("Nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    });

    const loginAccount = reactive({
      email: "",
      passwd: "",
    });
    return {
      loginAccount,
      accountFormSchema,
    };
  },

  methods: {
    async submit(e) {
      e.preventDefault();

      try {
        await AccountService.login(this.loginAccount);
        this.$store.commit("SET_LOGIN_STATE", true);
        this.$router.push({ name: "product" });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email hoặc mật khẩu sai, vui lòng nhập lại!",
        });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/margesh");

.form-login {
  position: absolute;
  right: 0;
  left: 0;
  top: 100px;
  /* font-family: "Margesh Regular"; */
}

.container.login {
  display: flex;
  align-items: center;
  width: 800px;
  border: 2px solid #c2c0c1;
  border-radius: 20px;
  padding: 0;
  transform: translateY(30px);
  animation: fadeInDown 2s ease-out;
}

.container .login-img {
  width: 400px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  overflow: hidden;
}
.container .login-img img {
  width: 100%;
  margin-right: 20px;
}

/* login-authen */
.login-authen {
  flex: 1;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-authen h3 {
  font-size: 1.5rem;
}

.login-authen .form-control {
  width: 320px;
}

.check-user {
  display: flex;
  justify-content: space-between;
}

.btn-login {
  border: none;
  background-color: #445b6d;
  padding: 8px 10px;
  color: white;
  border: 1px solid #445b6d;
  box-sizing: border-box;
  transition: background-color 0.3s ease-in-out;
}

.btn-login:hover {
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