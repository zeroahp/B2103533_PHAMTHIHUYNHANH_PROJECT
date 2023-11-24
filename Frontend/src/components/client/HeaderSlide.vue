<template>
  <div class="slide">
    <div class="image-slide">
      <img src="../../assets/image/slider-1.png" alt="" />
    </div>

    <div class="overlay-content">
      <div class="content">
        <h1>Aliya</h1>
        <hr />
        <p>
          Nơi của những bông hoa tươi cùng những món quà tinh tế, làm say đắm
          mọi cảm xúc đến từng chi tiết để chia sẻ niềm vui và tình cảm trong
          mỗi dịp đặc biệt. làm tươi mới không khí trong cuộc sống của bạn.
        </p>
        <div class="line-image">
          <img src="../../assets/image/Pattern.png" alt="" />
        </div>
      </div>
      <div class="btn-shopping">
        <a class="buy-product"> Mua sản phẩm </a>
      </div>
    </div>

    <div class="flower-outer">
      <img
        class="rotate-left-and-right"
        src="../../assets/image/rose (1).png"
        alt=""
      />
    </div>
  </div>
</template>


<script>
export default {
  methods: {},
};
</script>


<style>
@import url("https://fonts.cdnfonts.com/css/margesh");
@import url("https://fonts.cdnfonts.com/css/dancing-script");

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-slide {
  width: 100%;
  position: relative;
}

.image-slide img {
  object-fit: cover;
  max-width: 100%;
}
.overlay-content {
  z-index: 3;
  position: absolute;
  top: 60px;
  width: 1000px;
  height: 550px;
  background: rgba(255, 255, 255, 0.551);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(171, 172, 172, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #362320;
  font-family: "Margesh Regular";
}
.content {
  width: 740px;
}
.content h1 {
  text-align: center;
  font-size: 120px;
  font-weight: 400;
  color: black;
  color: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: url("../../assets/image/bounquet.png");
  background-position: -360px -290px;
}
.content p {
  line-height: 2;
  text-align: center;
}

.content .line-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content .line-image img {
  margin-top: 40px;
  width: 200px;
}

.btn-shopping a {
  background-color: #e0868f;
  padding: 15px 25px;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  transition: background-color 0.5s ease;
  font-weight: 600;
}

.btn-shopping .buy-product:hover {
  color: #e0868f;
  background-color: white;
}

.flower-outer {
  position: absolute;
  right: 60px;
  z-index: 4;
}

.flower-outer img {
  width: 650px;
}

@media (max-width: 1200px) {
  .flower-outer {
    position: absolute;
    right: 0px;
  }
}

@media (max-width: 1100px) {
  .overlay-content {
    width: 800px;
    height: 450px;
  }

  .content {
    width: 450px;
  }
  .flower-outer img {
    width: 500px;
  }
}

@media (max-width: 992px) {
  .overlay-content {
    width: 550px;
    height: 350px;
  }

  .content {
    width: 400px;
  }

  .flower-outer img {
    width: 400px;
  }

  .content img {
    display: none;
  }
  .btn-shopping a {
    background-color: #e0868f;
    padding: 10px 15px;
    border-radius: 25px;
  }
}

@media (max-width: 768px) {
  .overlay-content {
    width: 400px;
    height: 350px;
  }

  .flower-outer img {
    width: 300px;
  }

  .content {
    width: 250px;
  }

  .content h1 {
    font-size: 4rem;
  }

  .content p{
    font-size: 0.9rem;
  }
  .btn-shopping a {
    background-color: #e0868f;
    padding: 5px 15px;
    border-radius: 25px;
  }
}
@media (max-width: 576px){
 .flower-outer img {
    width: 180px;
    
  } 

  .overlay-content {
    width: 350px;
    height: 200px;
  }


  .content {
    width: 250px;
  }

  .content h1 {
    font-size: 2rem;
  }

    .content p{
      font-size: 0.8rem;
    }
  .btn-shopping a {
    background-color: #e0868f;
    padding: 5px 15px;
    border-radius: 25px;
    font-size: 0.8rem;
  }
}


</style>