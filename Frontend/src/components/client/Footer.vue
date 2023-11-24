<template>
  <div class="footer">
    <div class="footer-box">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul>
              <li>
                <a href="">
                    <h3>Aliya</h3>
                </a>
              </li>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <li>
                <h5>Điều khoản dịch vụ</h5>
              </li>
              <li>
                <a href="">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="">Mua hàng</a>
              </li>
              <li>
                <a href="">Đổi trả</a>
              </li>
            </ul>
          </div>
          <div class="col contact">
            <ul>
              <li>
                <h5>Liên hệ</h5>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/oqPeVQ5pXqsuQx5f9">
                  <i class="fa-solid fa-location-dot"></i>
                  Lê Anh Xuân, Cần Thơ
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa-solid fa-phone-volume"></i>
                  0334683588
                </a>
              </li>
              <li class="contact-social">
                <a href="https://www.google.com/intl/vi/gmail/about/">
                  <i class="fa-solid fa-envelope"></i>
                </a>
                <a href="https://www.facebook.com/">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/">
                  <i class="fa-brands fa-square-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-textbox">
            <h5>Cập nhật nhanh</h5>
            <p>
              Đăng ký để nhận thông tin cập<br />
              nhật và ưu đãi mới nhất.
            </p>
            <div class="textbox-email">
              <input type="email" placeholder="Nhập email tại đây" />
              <a class="btn-email">Gửi</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="footer-copyright">Coppyright by B2103533</div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>


<style>
.footer {
  width: 100%;
  background: rgb(247, 216, 222);
  background: linear-gradient(
    347deg,
    rgba(247, 216, 222, 1) 29%,
    rgba(219, 231, 237, 1) 100%
  );
  font-family: Abril Fatface;
}

hr {
  margin: 0;
}
.footer-box {
  /* background-color: bisque; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px 0;
}

.footer-box ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.footer-box ul li a{
  color: black;
}

.footer-box ul li a:hover{
    color: #E18A93;
    
}

.footer-box ul h3,
h5 {
  font-family: Abril Fatface;
  font-weight: 600;
  margin: 0;
  color: black;
}

.footer-box ul li a h3:hover{
    color: #E18A93;
}

.footer-box .col {
  display: flex;
  /* align-items: center; */
}

/* contact-social */
.contact-social a{
    margin-right: 15px;
}

/**/

.col-textbox .textbox-email{
  border: 2px solid black;
}

 .footer-box .col-textbox input {
  outline: none;
}


.footer-box .col-textbox a {
  background-color: black;
  padding: 6px;
  color: white;
  cursor: pointer;
}
.footer-box .col-textbox a:hover{
    background-color: #E18A93;
    color: black;
} 




/* copyright */
.footer-copyright{
    text-align: center;
    padding: 10px;
}

</style>