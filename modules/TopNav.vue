<template>
    <div>
        <div class="ub top-bar">
            <div class="ub ub-ac logo-title" style="height:78px;">
                <img style="margin-left: 20px;" src="../src/assets/img/new_logo.png" alt="" />
            </div>
            <div class="ub ub-f1 top-right">
                <div class="ub ub-f1 ub-ac ub-pc" style="width:80%;height:70px;">
                    <div class="swiper-container" style="width:100%;height:100%;padding-top:0!important">
                        <div class="swiper-wrapper">
                            <div class="ub ub-ac ub-pc swiper-slide" v-for="(item,index) in permissions" :key="index">
                                <a class="top-menu" @mouseenter="enter(_item)" @mouseleave="leave(_item)" v-for="(_item,_index) in item" :key="_index" :class="{'active':_item.isActive}" href="javascript:;">
                                    <div v-if="_item.modularMenuList&&_item.modularMenuList.length > 1" class="box" style="width:100%">
                                        <div style="width:100%;margin-left:5px;text-align: center;"><i :class="[_item.iconUrl]"></i></div>
                                        <div class="text" style="width:100%;margin-left:-10px;text-align: center;">{{_item.name}}</div>
                                    </div>
                                    <div v-if="_item.modularMenuList&&_item.modularMenuList.length == 1" class="box" style="width:100%"  @click="goin(_item.modularMenuList[0])">
                                        <div style="width:100%;margin-left:5px;text-align: center;"><i :class="[_item.iconUrl]"></i></div>
                                        <div class="text" style="width:100%;margin-left:-10px;text-align: center;">{{_item.name}}</div>
                                    </div>
                                    <div v-if="_item.modularMenuList&&_item.modularMenuList.length == 0" class="box" style="width:100%"  @click="tips">
                                        <div style="width:100%;margin-left:5px;text-align: center;"><i :class="[_item.iconUrl]"></i></div>
                                        <div class="text" style="width:100%;margin-left:-10px;text-align: center;">{{_item.name}}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- 如果需要导航按钮 -->
                        <div v-if="permissions.length>1" class="swiper-button-prev"></div>
                        <div v-if="permissions.length>1" class="swiper-button-next"></div>
                    </div>
                </div>
                <div class="ub ub-ac ub-pe nav-menu" style="width:20%;height:70px;padding-right:15px;">
                    <div class="ub ub-ac exit" style="padding-right:15px;">
                        <div style="font-size:14px;"><i style="font-size:16px;margin-right:10px;" class="el-icon-s-custom"></i>您好，{{userInfo.cnName}}</div>
                    </div>
                    <div class="home">
                        <router-link style="color:#FFFFFF;font-size:14px;" to="/entrance" class="link-home" title="首页"><i style="font-size:16px;margin-right: 10px;" class="el-icon-s-home bell"></i>返 回</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-tips" style="text-align: center;">
            <div class="tips-box" v-show="curActive" @mouseenter="enterCur" @mouseleave="leaveCur">
                <i></i>
                <i></i>
                <i></i>
                <a v-for="(item,index) in tipsData" :key="index" :class="{'last':index==tipsData.length-1}" href="javascript:;" @click="goin(item)">{{item.resourceName}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopNav",
    data () {
        return {
            tipsData:[],
            timer1:0,
            timer2:0,
            curActive:false,
        }
    },
    props: ['userInfo', 'permissions', 'userInfo'],
    methods: {
        enter(item){
            clearTimeout(this.timer1);
            this.timer1 = 0;
            clearTimeout(this.timer2);
            this.timer2 = 0;
            item.isActive = true;
            if(item.modularMenuList.length>1){
                this.curActive = true;
                this.tipsData = item.modularMenuList;
            }else{
                this.curActive = false;
            }

        },
        leave(item){
            item.isActive = false;
            this.timer1=setTimeout(()=>{
                this.curActive = false;
            },1000)

        },
        enterCur(){
            clearTimeout(this.timer1);
            this.timer1 = 0;
            clearTimeout(this.timer2);
            this.timer2 = 0;
            this.curActive = true;
        },
        leaveCur(){
            this.timer2=setTimeout(()=>{
                this.curActive = false;
            },1000)

        },

        tips(){
            this.$message({
                message: '请先关联相关模块',
                type: 'warning'
            })
        },
        goin(val) {
            console.log(val)
            if(val.id == 13) {
                return
            } else {
                if(val.url != '' && val.url != null) {
                    window.location.href = encodeURI(val.url);
                } else {
                    this.$message({
                        message: '请设置模块链接',
                        type: 'warning'
                    })
                }

            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .top-bar {
        width: 100%;
        height: 78px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        padding-right: 20px;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0);
        min-width: 1200px;
    }

    .top-menu {
        width: 117px;
        height: 64px;
        display: flex;
        margin: 0 5px;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #fff;
        transform: skewX(-45deg);
        background-image: url(../src/assets/img/btn_bg.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }

    .top-menu.active {
        background-image: url(../src/assets/img/btn_Selection_bg.png);
    }

    .top-menu .box {
        i {
            font-size: 20px;
            color: #5ed8ff;
        }
        .text {
            color: #5ed8ff;
        }
    }

    .top-menu.active .box {
        i {
            color: #ffffff;
        }
        .text {
            color: #ffffff;
        }
    }

    .top-menu>div {
        transform: skewX(45deg);
        div {
            font-size: 12px;
        }
    }

    .top-right {
        height: 78px;
        background-image: url(../src/assets/img/header_right_bg.png);
        background-position: right 0;
        background-repeat: no-repeat;
        background-size: auto 100%;
    }
    .nav-menu>div {
        color: #86939e;
        cursor: pointer;
    }

    .bell {
        font-size: 20px;
        color: #ffffff;
    }

    .nav-menu>div:hover {
        color: #03a9f4;
    }

    .nav-icon {
        font-size: 14px;
        color: #86939e;
    }

    .nav-title {
        font-size: 16px;
        color: #333333;
        margin-left: 10px;
    }

    .login-user {
        margin-left: 20px;
        font-size: 14px;
    }

    .exit {
        margin-left: 20px;
        div {
            color: #ffffff;
        }
        i {
            font-weight: 600;
        }
    }

    .changePassword-dialog .el-form-item {
        margin-bottom: 22px;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    .link-home {
        color: #86939e;
        cursor: pointer;
        &:hover {
            color: #03a9f4;
        }
    }

    .logo-title {
        width: 25%;
        background-image: url(../src/assets/img/header_left_bg.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 0;
        img {
            vertical-align: top;
            width: 85%;
            margin-top: -12px;
        }
    }
    .swiper-container{
        width:800px;
    }
    .swiper-inner::after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden;
    }
    .swiper-inner>.inner-box{
        width:120px;
        float:left;
        cursor: pointer;
        position: relative;
        background-color: red;
    }
    .nav-tips{
        width:100%;
        position: fixed;
        left:0;
        top:70px;
        height:42px;
        z-index: 9999999;
    }
    .tips-box{
        display: inline-block;
        height:42px;
        line-height: 42px;
        padding:0 20px;
        box-sizing: border-box;
        background-color:#010205;
        border: 1px solid #4bacf9;
        cursor: pointer!important;
        position: relative;
        -webkit-box-shadow: 0px 0px 16px #4bacf9 inset;
        a{
            color:#fff;
            font-size:14px;
            padding:0 10px;
            cursor: pointer!important;
            border-right: 1px solid #008797;
        }
        a.last{
            border-right: 1px solid rgba(0,0,0,0);
        }
    }
    .tips-box i:nth-child(1){
        width:35px;
        height:18px;
        position: absolute;
        left:1px;
        top:0px;
        background-image: url(../src/assets/img/Popup_nav_top_left.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }
    .tips-box i:nth-child(2){
        width:25px;
        height:36px;
        position: absolute;
        right:1px;
        top:0px;
        background-image: url(../src/assets/img/Popup_nav_top_right.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }
    .tips-box i:nth-child(3){
        width:81px;
        height:4px;
        position: absolute;
        left:0px;
        bottom:0px;
        background-image: url(../src/assets/img/Popup_nav_bottom_left.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }
    .swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after{
        content:'';
    }
    .swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after{
        content:'';
    }
    .swiper-container .swiper-button-prev {
        margin: 0;
        width:40px;
        top:4px;
        height:82%;
        background-image: url(../src/assets/img/topbtn_right.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 96%;
    }
    .swiper-container .swiper-button-next {
        margin: 0;
        width:40px;
        top:4px;
        height:82%;
        background-image: url(../src/assets/img/topbtn_left.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 96%;
    }
</style>
