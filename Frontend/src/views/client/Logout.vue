<template>
  <div class="logout-authen">
    <h1></h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    this.showConfirmation();
  },
  methods: {
    showConfirmation() {
      Swal.fire({
        title: "Bạn chắc chắn muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          this.message = "Your file has been deleted.";
          Swal.fire({
            title: "Đăng xuất thành công!",
            text: this.message,
            icon: "success",
          });
        } else {
          this.message = "Operation canceled.";
        }
      });
    },
  },
};
</script>


<style>
.logout-authen {
  position: absolute;
  top: 100px;
  right: 0;
  left: 0;
}
</style>