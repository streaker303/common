<template>
    <div class="left-bar">
        <div class="ub ub-ac ub-pc ub-ver time-box">
            <div>{{time.hourMinute}}</div>
            <div>{{time.dateTime}}</div>
            <div>{{time.week}}</div>
        </div>
        <div class="w100 menu">
            <span style="width:50px;height:0px;position: absolute;right:100px;top:0px;"></span>
            <img style="width:88px;height:20px;position: absolute;right:-1px;top:-10px;" src="../src/assets/img/Module_top_bg2.png" />

            <el-menu class="menu-item" :unique-opened="true" text-color="#496573" :default-openeds="defaultOpens" :default-active="$route.path" router>
                <NavMenu :navMenus="navMenus"></NavMenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
export default {
    name: "LeftBar",
    data () {
        return {

        }
    },
    components: {
        NavMenu
    },
    props: ['time', 'navMenus', 'defaultOpens'],
}
</script>

<style lang="scss" scoped>
    .left-bar {
        width: 240px;
        color: #000;
        position: fixed;
        left: 0;
        top: 98px;
        bottom: 0;
        z-index: 20;
        border: 1px solid #4bacf9;
        box-shadow: 0px 0px 16px #4bacf9 inset;
        background-color: #010205;
    }

    .time-box {
        width: 238;
        height: 174px;
        margin: 30px auto;
        background-image: url(../src/assets/img/time_bg.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        div {
            font-size: 18px;
            font-weight: 500;
            color: #fff;
            text-shadow: 0px 0px 6px #00cffb, 0px 0px 6px #00cffb;
        }
    }

    .time-box>div:nth-child(1) {
        font-size: 48px;
        font-weight: 600;
        line-height:62px;
        letter-spacing: 7px;
        font-family: 'digital-7','Microsoft YaHei','微软雅黑', '宋体', 'Helvetica';
        text-shadow: 0px 2px 8px #00cffb, 0px 0px 8px #00cffb;
    }

    .menu {
        margin-top: 25px;
        box-sizing: border-box;
        height: calc(100vh - 340px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .menu-item{
        border: 0;
        background: transparent;
        padding: 0 15px;
        >>>.el-menu-item{
            margin: 14px auto;
            height: 44px;
            line-height: 44px;
            cursor: pointer;
            background: url(../src/assets/img/menu_bg.png) no-repeat;
            background-size: 100% 100%;
            span{
                color: #86939e;
            }
            i{
                width: 16px;
                margin-right: 10px;
                color: #6492b4;
            }
            &:hover{
                span{
                    color: #78ddff;
                }
                i{
                    color: #78ddff;
                }
            }
        }

        >>>.el-menu-item.is-active {
            background-image: url(../src/assets/img/menu_active_bg.png);
            span{
                color: #78ddff;
            }
            i{
                color: #78ddff;
            }
        }
        >>>.el-submenu{
            background: url(../src/assets/img/menu_bg.png) no-repeat;
            background-size: 100% 44px;
            margin-bottom: 14px;
            .el-submenu__title{
                height: 44px;
                line-height: 44px;
                span{
                    color: #86939e;
                }
                >i{
                    margin-right: 10px;
                    color: #6492b4;
                }
                .el-icon-arrow-down{
                    margin-right: 0;
                }
                &:hover{
                    background: transparent;
                    span{
                        color: #78ddff;
                    }
                    i{
                        color: #78ddff;
                    }
                }
            }
            .el-menu,.el-menu.el-menu--inline{
                background: transparent;
            }
            .el-menu.el-menu--inline{
                .el-menu-item{
                    background: none!important;
                    margin: 0;
                    i{
                        display: none;
                    }
                    span{
                        padding-left: 20px;
                    }
                    &.is-active{
                        background: none;
                    }
                }
            }
        }
        >>>.el-submenu.is-active .el-submenu__title{
		background: url(../src/assets/img/menu_active_bg.png) center no-repeat;
		background-size: 100% 100%;
            span {
                color: #78ddff;
            }
	    }
    }
</style>
