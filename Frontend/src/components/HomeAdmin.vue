<template>
    <div class="home-admin">
        <HeaderAdmin />
        <div class="home-admin-box">
            <h1 class="home-admin-title">Chào mừng đến trang quản trị viên !</h1>
        </div>
    </div>
</template>


<script>
import HeaderAdmin  from "../components/HeaderAdmin.vue";

export default {
    components:{
        HeaderAdmin
    },
    setup() {
        
    },
}
</script>

<style>
.home-admin{
    /* display:  flex; */
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: url("../assets/image/bg-404.png");
    background-repeat: no-repeat;
    align-items: center;
}

.home-admin-box{
    width: 100vw;
    position: absolute;
    top: 300px;
    left: 0;

}

.home-admin-title{
    text-align: center;
    color: white;
}

</style>