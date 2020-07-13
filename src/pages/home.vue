<template>
	<div class="home">
		<!--<div class="ub top-bar">
			<div class="ub ub-ac logo-title" style="height:78px;">
				<img style="margin-left: 20px;" src="../assets/img/new_logo.png" alt="" />
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
					    &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;
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
		</div>-->
		<!--<div class="nav-tips" style="text-align: center;">
			<div class="tips-box" v-show="curActive" @mouseenter="enterCur" @mouseleave="leaveCur">
			<i></i>
			<i></i>
			<i></i>
				<a v-for="(item,index) in tipsData" :key="index" :class="{'last':index==tipsData.length-1}" href="javascript:;" @click="goin(item)">{{item.resourceName}}</a>
			</div>
		</div>-->
        <TopNav :permissions="permissions" :userInfo="userInfo"></TopNav>
		<!--<div class="left-bar">
			<div class="ub ub-ac ub-pc ub-ver time-box">
				<div>{{hourMinute}}</div>
				<div>{{dateTime}}</div>
				<div>{{week}}</div>
			</div>
			<div class="w100 menu">
				<span style="width:50px;height:0px;position: absolute;right:100px;top:0px;"></span>
				<img style="width:88px;height:20px;position: absolute;right:-1px;top:-10px;" src="../assets/img/Module_top_bg2.png" />

				<el-menu class="menu-item" :unique-opened="true" text-color="#496573" :default-openeds="defaultOpens" :default-active="$route.path" router>
					<NavMenu :navMenus="menuData"></NavMenu>
				</el-menu>
			</div>
		</div>-->
        <LeftBar :time="timeNum" :navMenus="menuData" :default-opens="defaultOpens"></LeftBar>
		<div class="right-content">
			<router-view class="second-view"></router-view>
		</div>
	</div>
</template>

<script>
	import {
		get_menu,
		exit,
		change_pwd,
		get_time,
	} from '../server/api.js'
	import {
		getNewSysMenus,
	} from '../server/users.js'
	import md5 from '../assets/js/md5.js'

	import LeftBar from "../../modules/LeftBar";
	import TopNav from "../../modules/TopNav";

	export default {
		name: 'home',
		components: {
            LeftBar: LeftBar,
            TopNav: TopNav
		},
		data() {
			return {
				tipsData:[],
				curActive:false,
				timer: null,
                timeNum: {
                    week: '',
                    hourMinute: '',
                    dateTime: ''
                },
				sysId: '',
				logoName: '',
				menu: [],
				userInfo: {
					cnName: '',
				},
				permissions: [],
				exitDialog: false,
				formLabelWidth: '120px',
				mySwiper:null,
				timer1:0,
				timer2:0,

				defaultOpens:[],
				activeIndex: '',
				menuData: [],
				timeStr:null,
			}
		},

		created() {
			let userInfo = this.$getsessionStorage('userInfo');
			console.log('userInfo',userInfo)
			if(userInfo != '') {
				this.userInfo = userInfo;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initTime();
				this.get_data();
				this.getSys();

			})
		},
		methods: {
			initTime(){
				let data = {
					queryData: {},
					paramsData: {}
				}
				get_time(data).then(res => {
					console.log('32132132',res)
					this.timeStr = res.ms;
					this.writeCurrentDate(this.timeStr);
				}).catch(error => {
					console.log('error', error)
				})
			},
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
			splitArray(data,num){
				var result = [];
				for(var i=0;i<data.length;i+=num){
				    result.push(data.slice(i,i+num));
				}
				return result;
				console.log('asadad',result)
			},
			writeCurrentDate(date) {
				var now = new Date(date);
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				var day = now.getDay(); //得到周几
				var hour = now.getHours(); //得到小时
				var minu = now.getMinutes(); //得到分钟
				var sec = now.getSeconds(); //得到秒
				　　
				var MS = now.getMilliseconds(); //获取毫秒
				month = month + 1;
				if(month < 10) month = "0" + month;
				if(date < 10) date = "0" + date;
				if(hour < 10) hour = "0" + hour;
				if(minu < 10) minu = "0" + minu;
				if(sec < 10) sec = "0" + sec;
				if(MS < 100) MS = "0" + MS;
				var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.timeNum.week = arr_week[day];
				this.timeNum.hourMinute = hour + ":" + minu;
				this.timeNum.dateTime = year + "-" + month + "-" + date;
				//设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
				this.timer = setTimeout(() => {
					this.timeStr+=1000;
					this.writeCurrentDate(this.timeStr)
				}, 1000);
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
			get_data() {
				this.menuData = [];
				this.defaultOpens = [];
				let datamenu = {
					queryData: {},
					paramsData: {}
				}
				get_menu(datamenu).then(res => {
					console.log('aaa', res)
					this.$setsessionStorage('menu', res.data);
					let data = res.data;
					if(data.length === 0) {
						this.$message({
							message: '该用户无任何权限',
							type: 'warning'
						});
						return;
					}
					this.activeIndex = res.data[0].url;
					if(res.data[0].menus.length > 0){
						this.defaultOpens = [
							res.data[0].menus[0].modular
						]
						// this.$router.replace({
						// 	path:res.data[0].menus[0].url
						// })
					}else{
						this.defaultOpens = [
							res.data[0].modular
						]
						// this.$router.replace({
						// 	path:res.data[0].url
						// })
					}
					this.menuData = res.data;
					this.menuData = this.menuData.map(items => {
						if(items.menus.length == 0){
							delete items.menus
						}
						return items;
					})
					console.log('this.menuData',this.menuData);
				}).catch(error => {
					console.log('error', error)
				})
			},
			getSys() {
				this.permissions = [];
				let permissions = [];
				let data = {
					queryData: {},
					paramsData: {}
				}
				getNewSysMenus(data).then(res => {
					console.log('success', res)
					res.forEach(item => {
						item.isActive = false;
						permissions.push(item);
					})
				}).then(()=>{
					if(window.screen.width > 1680){
				       	this.permissions = this.splitArray(permissions,9);
				    }else{
				    	this.permissions = this.splitArray(permissions,5);
				    }
					console.log('this.permissions',this.permissions)
					setTimeout(()=>{

						  if(this.permissions.length<=1){
							 this.mySwiper = new Swiper ('.swiper-container', {
							    loop: false, // 循环模式选项
								resistanceRatio:0,
							  })
						  }else{
							  this.mySwiper = new Swiper ('.swiper-container', {
							     loop: false, // 循环模式选项

							     // 如果需要前进后退按钮
							     navigation: {
							       nextEl: '.swiper-button-next',
							       prevEl: '.swiper-button-prev',
							     },
								 resistanceRatio:0,
							   })
						  }
					},0)
				}).catch(error => {
					console.log('error', error)
				})

			},
			exit() {
				exit({}).then(res => {
					console.log(res)
					if(res.code == 1) {
						this.$router.replace({
							path: '/login'
						})
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						});
					}

				}).catch(error => {
					console.log('error', error)
				})
			},
		}
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
		background-image: url(../assets/img/time_bg.png);
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
			background: url(../assets/img/menu_bg.png) no-repeat;
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
			background-image: url(../assets/img/menu_active_bg.png);
			span{
				color: #78ddff;
			}
			i{
				color: #78ddff;
			}
		}
		>>>.el-submenu{
			background: url(../assets/img/menu_bg.png) no-repeat;
			background-size: 100% 44px;
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
	}
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
		background-image: url(../assets/img/btn_bg.png);
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
	}

	.top-menu.active {
		background-image: url(../assets/img/btn_Selection_bg.png);
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
		background-image: url(../assets/img/header_right_bg.png);
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

	.second-view {
		width: 100%;
		height: auto;
		transition: all .3s cubic-bezier(.55, 0, .1, 1);
	}

	.right-content {
		position: absolute;
		left: 240px;
		padding-left: 20px;
		top: 88px;
		right: 20px;
		bottom: 0;
		min-width: 950px;
		// overflow-y: auto;
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
		background-image: url(../assets/img/header_left_bg.png);
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
		background-image: url(../assets/img/Popup_nav_top_left.png);
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
		background-image: url(../assets/img/Popup_nav_top_right.png);
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
		background-image: url(../assets/img/Popup_nav_bottom_left.png);
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
		background-image: url(../assets/img/topbtn_right.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 96%;
	}
	.swiper-container .swiper-button-next {
		margin: 0;
		width:40px;
		top:4px;
		height:82%;
		background-image: url(../assets/img/topbtn_left.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 96%;
	}
</style>
