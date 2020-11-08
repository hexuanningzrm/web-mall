<template>
    <div class="NoData">
        <img src="../../public/imgs/icon/icon-no-data.png" alt="">
        <p>暂无数据</p>
    </div>
</template>

<script>
    export default {
        name: 'NoData'
    }
</script>

<style lang="scss">
    .NoData {
        text-align: center;
        font-size: 20px;
        color: #999999;
        margin: 50px 0;
        img {
            width: 240px;
            height: 180px;
            margin-bottom: 30px;
        }
    }
</style>
