<template>
    <div class="Order">
        <router-view></router-view>
        <ServiceBar></ServiceBar>
        <NavFooter></NavFooter>
    </div>
</template>

<script>
    import NavFooter from '../components/NavFooter'
    import ServiceBar from '../components/ServiceBar'

    export default {
        name: 'Order',
        components: {
            NavFooter,
            ServiceBar
        }
    }
</script>

<style>

</style>

