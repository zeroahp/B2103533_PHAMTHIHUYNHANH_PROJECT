<template>
  <div class="about-us">
    <div class="aboutus-content">
      <div class="who">
        <figure>
          <h1 class="mb-5">Aliya ?</h1>
          <p class="aboutus-detail mb-4">
            Chào mừng bạn đến với Aliya! Tại đây, Aliya không chỉ là một đội ngũ
            chuyên nghiên cứu sâu rộng về nghệ thuật <br />
            cắm hoa tươi và đồ handmade mà còn là những người đam mê cuồng nhiệt
            về việc mang lại niềm vui qua các sản phẩm độc đáo của mình.<br />
            Chúng tôi không chỉ tập trung vào việc tạo ra những bức tranh sống
            động từ các loại hoa theo mùa, mà còn đặt trái tim vào việc thiết kế
            gói quà độc đáo, <br />làm nổi bật giá trị của mỗi sản phẩm. Sứ mệnh
            của chúng tôi là mang đến không gian xinh đẹp và ấm cúng cho mọi
            dịp, từ những sự kiện lớn đến những<br />
            khoảnh khắc đơn giản trong cuộc sống hàng ngày. Với tâm huyết và
            kiến thức chuyên sâu, chúng tôi tự hào là đối tác đáng tin cậy cùng
            bạn<br />
            trải qua những ngày ý nghĩa. Hãy đồng hành cùng chúng tôi để chia sẻ
            yêu thương và tạo nên những kỷ niệm đáng nhớ!
          </p>

          <div class="media">
            <div class="media-contact mr-5">
              <a href=""> Liên hệ ngay </a>
            </div>
            <div class="media-founder ml-5">
              <div class="media-image mr-2">
                <img src="../../assets/image/meo-hehe.jpg" alt="">
              </div>
              <div class="founder-content">
                <h3>Aliya Pham</h3>
                <p>Chủ shop</p>
              </div>
            </div>
          </div>

        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about-us",
  setup() {},
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/margesh");

.about-us {
  width: 100%;
  height: 911px;
  background-image: url("../../assets/image/who.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  /* font-family: "Margesh Regular"; */
}

.who {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center ;
 /* height: 100%;  */
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.who h1 {
    font-size: 4rem;
    color: white;
    text-shadow: 5px 2px 1px black;
    position: relative;
}

.who .media{
    display: flex;
    align-items: center;
    justify-content: center;
}

.who .aboutus-detail{
  color: black;
    text-shadow: 2px 2px 0px white;
    line-height: 1.7rem;
}
.media-contact a{
    background-color: white;
    color: black;
    padding: 10px;
    text-align: center;
    box-shadow: 2px 2px 8px #bcbcbc;
}

.media-contact a:hover{
  background-color: black;
  color: white;
}

.media-founder{
    display: flex;
    align-items: center;
}
.media-image{
    width: 100px;
    height: 100%;
    object-fit: cover;

}
.media-founder img{
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid white;    
}


.founder-content h3{
    font-size: 1.2rem;
    margin: 0;
}

/* reponsive */

@media (max-width: 1350px) { 
  .who {
  width: calc(100% - 30px);

  top: 10px;
  /* left: 100px; */

}

 .who h1{
  margin-bottom: 10px;
 }
 }

 @media (max-width: 1200px) { 
  .who {

  top: 40px;
  left: 100px;

}
 }
@media (max-width: 992px) {  }
@media (max-width: 768px) {  }
@media (max-width: 576px) {  }
</style>