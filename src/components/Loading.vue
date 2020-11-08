<template>
    <div class="Loading">
        <img src="../../public/imgs/loading/loading-bars.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: 'Loading'
    }
</script>

<style lang="scss">
    .Loading {
        height: 80px;
        line-height: 80px;
        text-align: center;
        padding: 30px 0;
        img {
            height: 100%;
        }
    }
</style>
