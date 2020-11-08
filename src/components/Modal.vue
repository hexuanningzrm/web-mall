<template>
    <transition class="fade">modal
        <div class="Modal" v-show="showModal">
            <!--遮罩-->
            <div class="mask"></div>
            <!--模态框-->
            <div class="modal-dialog">
                <div class="modal-header">
                    <!--标题-->
                    <span>{{title}}</span>
                    <!--关闭按钮-->
                    <a href="javascript:" class="icon-close" v-on:click="$emit('cancel')"></a>
                </div>
                <!--内容-->
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <!--操作按钮-->
                <div class="modal-footer">
                    <!--确定按钮-->
                    <a href="#" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
                    <!--取消按钮-->
                    <a href="javascript:" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    <!--确定取消按钮-->
                    <div class="btn-group" v-if="btnType==3">
                        <a href="#" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            // 弹框类型：小small、中middle、大large，表单form
            modalType: {
                type: String,
                default: 'form'
            },
            // 弹框标题
            title: String,
            // 按钮类型：1确定按钮、2取消按钮、3确定取消按钮
            btnType: String,
            sureText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            // 模态框动画
            showModal: Boolean
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/Modal";
    @import "../assets/scss/Button";
</style>
