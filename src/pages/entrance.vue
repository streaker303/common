<template>
	<div class="entrance event">
		<p style="width:390px;text-align:center;position:fixed;z-index:2000;left:50%;margin-left:-195px;top:24px;font-size: 40px;font-family:'Hkxzy';color: #fff;letter-spacing:6px ">积极安全感知平台</p>
<!--		<img style="width:390px;position:fixed;z-index:2000;left:50%;margin-left:-195px;top:26px;" src="../assets/img/login_title.png"-->
<!--		 alt="">-->
		<div class="ub ub-pj entrance-top">
			<div style="padding-top:16px;">{{dateTime+'&nbsp;&nbsp;&nbsp;'}}{{hourMinute+'&nbsp;&nbsp;&nbsp;'}}{{week}}</div>
		</div>
		<div class="ub exit" style="padding-top:16px; position: absolute;top:0;right:20px;z-index: 1000;color:#fff;">
			<div style="font-size: 14px">您好，{{userInfo.cnName}}</div>
			<div style="margin-left: 10px;font-size:16px">
				<i class="iconfont icon-xiugaimima"></i>
			</div>
			<div style="margin-left: 10px;font-size:14px;cursor: pointer;" @click="changePasswordDialog = true">修改密码</div>
			<div style="margin-left: 10px;font-size:14px;cursor: pointer;" @click="exit">退 出</div>
		</div>
		<div class="ub ub-ver ub-ac ub-pc entrance-middle">
			<div class="swiper-container" style="width:100%;height:100%;">
				<div class="swiper-wrapper">
					<div class="ub ub-ac ub-pc swiper-slide" v-for="(item,index) in permissions" :key="index">
						<div class="swiper-inner">
							<div class="inner-box" v-for="(navs,nav_index) in item" :key="nav_index" @mouseenter="enter(navs)" @mouseleave="leave(navs)">
								<div style="position:relative;width:100%;" v-if="navs.modularMenuList&&navs.modularMenuList.length>1" :class="{
									'one':navs.isActive&&navs.modularMenuList.length==1,
									'two':navs.isActive&&navs.modularMenuList.length==2,
									'three':navs.isActive&&navs.modularMenuList.length==3,
									'four':navs.isActive&&navs.modularMenuList.length==4,
									'five':navs.isActive&&navs.modularMenuList.length==5,
									'six':navs.isActive&&navs.modularMenuList.length==6,
									'seven':navs.isActive&&navs.modularMenuList.length==7,
									'eight':navs.isActive&&navs.modularMenuList.length==8,
									'none':navs.isActive&&navs.modularMenuList.length==9,
									'ten':navs.isActive&&navs.modularMenuList.length==10,
									'elev':navs.isActive&&navs.modularMenuList.length==11,
									'twl':navs.isActive&&navs.modularMenuList.length==12,
									'_one':!navs.isActive&&navs.show&&navs.modularMenuList.length==1,
									'_two':!navs.isActive&&navs.show&&navs.modularMenuList.length==2,
									'_three':!navs.isActive&&navs.show&&navs.modularMenuList.length==3,
									'_four':!navs.isActive&&navs.show&&navs.modularMenuList.length==4,
									'_five':!navs.isActive&&navs.show&&navs.modularMenuList.length==5,
									'_six':!navs.isActive&&navs.show&&navs.modularMenuList.length==6,
									'_seven':!navs.isActive&&navs.show&&navs.modularMenuList.length==7,
									'_eight':!navs.isActive&&navs.show&&navs.modularMenuList.length==8,
									'_none':!navs.isActive&&navs.show&&navs.modularMenuList.length==9,
									'_ten':!navs.isActive&&navs.show&&navs.modularMenuList.length==10,
									'_elev':!navs.isActive&&navs.show&&navs.modularMenuList.length==11,
									'_twl':!navs.isActive&&navs.show&&navs.modularMenuList.length==12,
									}">
									<div class="animate-box">
										<div class="ub ub-ac animate-box-inner" style="height:100%;">
											<div class="animate-item" :style="{
															animationDelay:_index*0.1+0.1+'s',
														}" v-for="(_item,_index) in navs.modularMenuList"
											 @click="goin(_item)">
												<div style="width:40px;height:40px;font-size:0;margin: 0 auto;"><img style="width:100%;height:100%;" :src="'api/'+_item.iconName"
													 alt=""></div>
												<div style="font-size:12px;color:#fff;margin-top: 10px;text-align: center;">{{_item.resourceName}}</div>
											</div>

										</div>
									</div>
									<div class="nav-item" :class="{'active':navs.isActive}" style="width:100%;height:120px;font-size:0px;text-align: center;line-height:91px;"><i
										 style="font-size:50px" :class="[navs.iconUrl]"></i></div>
									<div class="nav-text" style="font-size:18px;color:#fff;margin-top: 36px;text-align: center;">{{navs.name}}</div>
								</div>
								<div v-else-if="navs.modularMenuList&&navs.modularMenuList.length==1" :class="{
									'one':navs.isActive&&navs.modularMenuList.length==1,
									'two':navs.isActive&&navs.modularMenuList.length==2,
									'three':navs.isActive&&navs.modularMenuList.length==3,
									'four':navs.isActive&&navs.modularMenuList.length==4,
									'five':navs.isActive&&navs.modularMenuList.length==5,
									'six':navs.isActive&&navs.modularMenuList.length==6,
									'seven':navs.isActive&&navs.modularMenuList.length==7,
									'eight':navs.isActive&&navs.modularMenuList.length==8,
									'none':navs.isActive&&navs.modularMenuList.length==9,
									'ten':navs.isActive&&navs.modularMenuList.length==10,
									'elev':navs.isActive&&navs.modularMenuList.length==11,
									'twl':navs.isActive&&navs.modularMenuList.length==12,
									}"
								 @click="goin(navs.modularMenuList[0])">
									<div class="nav-item" :class="{'active':navs.isActive}" style="width:100%;height:120px;font-size:0px;text-align: center;line-height: 91px;"><i
										 style="font-size:50px" :class="[navs.iconUrl]"></i></div>
									<div class="nav-text" style="font-size:18px;color:#fff;margin-top: 36px;text-align: center;">{{navs.name}}</div>
								</div>
								<div v-else-if="navs.modularMenuList&&navs.modularMenuList.length==0" :class="{
									'one':navs.isActive&&navs.modularMenuList.length==1,
									'two':navs.isActive&&navs.modularMenuList.length==2,
									'three':navs.isActive&&navs.modularMenuList.length==3,
									'four':navs.isActive&&navs.modularMenuList.length==4,
									'five':navs.isActive&&navs.modularMenuList.length==5,
									'six':navs.isActive&&navs.modularMenuList.length==6,
									'seven':navs.isActive&&navs.modularMenuList.length==7,
									'eight':navs.isActive&&navs.modularMenuList.length==8,
									'none':navs.isActive&&navs.modularMenuList.length==9,
									'ten':navs.isActive&&navs.modularMenuList.length==10,
									'elev':navs.isActive&&navs.modularMenuList.length==11,
									'twl':navs.isActive&&navs.modularMenuList.length==12,
									}"
								 @click='tips'>
									<div class="nav-item" :class="{'active':navs.isActive}" style="width:100%;height:120px;font-size:0px;text-align: center;line-height: 91px;"><i
										 style="font-size:50px" :class="[navs.iconUrl]"></i></div>
									<div class="nav-text" style="font-size:18px;color:#fff;margin-top: 36px;text-align: center;">{{navs.name}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 如果需要导航按钮 -->
				<div v-if="permissions.length>1" class="swiper-button-prev"></div>
				<div v-if="permissions.length>1" class="swiper-button-next"></div>
			</div>
		</div>
		<!--修改密码-->
		<el-dialog title="修改密码" width="500px" :visible.sync="changePasswordDialog" custom-class="attendance-dialog">
			<el-form :model="changePasswordForm" :rules="changPwdRules" ref="changePasswordForm" label-position="top">
				<el-form-item label="原密码" prop="prevPwd" :label-width="formLabelWidth">
					<el-input size="small" show-password v-model="changePasswordForm.prevPwd" placeholder="原密码..." autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPwd" :label-width="formLabelWidth">
					<el-input size="small" show-password v-model="changePasswordForm.newPwd" placeholder="新密码..." autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="再次输入新密码" prop="revPwd" :label-width="formLabelWidth">
					<el-input size="small" show-password v-model="changePasswordForm.revPwd" placeholder="再次输入新密码..." autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<searchBtn title="确 定" @click="validChangePassword('changePasswordForm',changePasswordForm)" />
				<div class="cancelBtn" style="margin-left: 10px;" @click="changePasswordDialog = false">取 消</div>
			</div>
		</el-dialog>
		<!--修改密码结束-->
	</div>
</template>

<script>
	import {
		exit,
		change_pwd,
		get_time
	} from '../server/api.js'
	import {
		getNewSysMenus,
		getHref
	} from '../server/users.js'
	export default {
		name: 'new_entrance',
		data() {
			return {
				isActive:false,
				week: '',
				hourMinute: '',
				dateTime: '',
				changePasswordForm: {
					prevPwd: '',
					newPwd: '',
					revPwd: '',
				},
				changPwdRules: {
					prevPwd: [{
						required: true,
						message: '请输入原密码',
						trigger: 'blur'
					}, ],
					newPwd: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}, ],
					revPwd: [{
						required: true,
						message: '请再次输入新密码',
						trigger: 'blur'
					}, ],

				},
				formLabelWidth:'120px',
				changePasswordDialog:false,
				userInfo: {},
				permissions: [],
				mySwiper:null,
				timeStr:null
			}
		},
		watch: {
			'changePasswordDialog': {
				handler(newVal, oldVal) {
					if(!newVal) {
						this.$refs.changePasswordForm.resetFields();
					}
				},
			}
		},
		created() {
			let userInfo = this.$getsessionStorage('userInfo');
			console.log('userInfo', userInfo)
			if(userInfo != '') {
				this.userInfo = userInfo;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initTime();
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
			tips(){
				this.$message({
					message: '请先关联相关模块',
					type: 'warning'
				})
			},
			 enter(item){
				 console.log(item)
				item.isActive = true;
				item.show = false;
			},
			leave(item){
				item.isActive = false;
				item.show = true;
			},
			goin(val) {
				console.log(val)
				if(val.id == 13){
					window.open(encodeURI(val.url+'#/home'));
				}else{
					if(val.url!=''&&val.url!=null){
						window.open(encodeURI(val.url));
					}else{
						this.$message({
							message:'请设置模块链接',
							type:'warning'
						})
					}

				}
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
				var arr_week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				this.week = arr_week[day];
				this.hourMinute = hour + ":" + minu;
				this.dateTime = year + "-" + month + "-" + date;
				//设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
				this.timer = setTimeout(() => {
					this.timeStr+=1000;
					this.writeCurrentDate(this.timeStr);
				}, 1000);
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
			splitArray(data,num){
				var result = [];
				for(var i=0;i<data.length;i+=num){
				    result.push(data.slice(i,i+num));
				}
				return result;
				console.log('asadad',result)
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
						item.show = false;
						permissions.push(item);
					})
				}).then(() => {
					this.permissions = this.splitArray(permissions,8);
					console.log('this.permissions11111',this.permissions)
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
			initAnimation() {
				var that = this;
				var sp, st, t, m, sa, l, w, gw, ot;
				var slideMenu = {
					destruct: function() {
						if(m) {
							clearInterval(m.htimer);
							clearInterval(m.timer);
							m.timer = null;
							m.htimer = null;
						}
					},
					build: function(sm, sw, mt, s, sl, h) {
						sp = s;
						st = sw;
						t = mt;
						m = document.getElementById(sm);
						sa = m.getElementsByTagName('li');
						l = sa.length;
						w = m.offsetWidth;
						gw = w / l;
						ot = Math.floor((w - st) / (l - 1));
						var i = 0;
						for(i; i < l; i++) {
							s = sa[i];
							s.style.width = gw + 'px';
							this.timer(s)
						}
						if(sl != null) {
							m.timer = setInterval(function() {
								slideMenu.slide(sa[sl - 1])
							}, t)
						}
					},
					timer: function(s) {
						s.onmouseover = function() {
							clearInterval(m.htimer);
							clearInterval(m.timer);
							m.timer = null;
							m.htimer = null;
							m.timer = setInterval(function() {
								slideMenu.slide(s)
							}, t);
							$(this).find('.mask_b').hide();
						}
						s.onmouseout = function() {
							clearInterval(m.timer);
							clearInterval(m.htimer);
							m.timer = null;
							m.htimer = null;
							m.htimer = setInterval(function() {
								slideMenu.slide(s, true)
							}, t);
							$(this).find('.mask_b').show();
						}
					},
					slide: function(s, c) {
						var cw = parseInt(s.style.width);
						if((cw < st && !c) || (cw > gw && c)) {
							var owt = 0;
							var i = 0;
							for(i; i < l; i++) {
								if(sa[i] != s) {
									var o, ow;
									var oi = 0;
									o = sa[i];
									ow = parseInt(o.style.width);
									if(ow < gw && c) {
										oi = Math.floor((gw - ow) / sp);
										oi = (oi > 0) ? oi : 1;
										o.style.width = (ow + oi) + 'px';
										//console.log(o);
										//console.log(o.style.width);
									} else if(ow > ot && !c) {
										oi = Math.floor((ow - ot) / sp);
										oi = (oi > 0) ? oi : 1;
										o.style.width = (ow - oi) + 'px';
										//console.log(o);
										//console.log(o.style.width);
									}
									if(c) {
										owt = owt + (ow + oi)
									} else {
										owt = owt + (ow - oi)
									}
								}
							}
							s.style.width = (w - owt) + 'px';
						} else {
							if(m.htimer)
								clearInterval(m.htimer)
							m.htimer = null;
							if(m.timer)
								clearInterval(m.timer);
							m.timer = null;
						}
					}
				};
				slideMenu.build('sm', 400, 10, 10, 1);

				function stopsss() {
					return false;
				}
				//document.oncontextmenu = stopsss;
			},

			validChangePassword(formName, obj) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.changePassword(obj)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			changePassword(obj) {
				if(obj.newPwd !== obj.revPwd) {
					this.$message('两次新密码不一致');
					return;
				}
				let data = {
					queryData: {},
					paramsData: {
						oldpassword: obj.prevPwd,
						password: obj.newPwd
					}
				}
				change_pwd(data).then(res => {
					console.log(res)
					if(res.code == 1) {
						this.$removelocalStorage('loginInfo');
						this.$message({
							message: '修改密码成功,请重新登录!',
							type: 'success'
						});
						setTimeout(() => {
							this.$router.replace({
								path: '/login'
							})
						}, 1000)
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						});
					}

				}).catch(error => {
					console.log('error', error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.entrance {
		width: 100%;
		height: 100%;
		position: relative;
		background: url(../assets/img/BG.jpg) no-repeat 0 0;
		background-size: cover;
	}

	.entrance-top {
		width: 100%;
		height: 106px;
		position: absolute;
		left: 0;
		top: 0;
		color: #fff;
		padding: 0 30px;
		box-sizing: border-box;
		font-size: 14px;
		background-image: url(../assets/img/MK_top.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;

		div:nth-child(1) span {
			color: #008fff;
		}
	}

	.entrance-bottom {
		width: 100%;
		height: 60px;
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 14px;

		div:nth-child(1) span {
			color: #0000EE;
		}
	}

	.entrance-middle {
		width: 100%;
		position: absolute;
		left: 0;
		top:0;
		bottom: 0;
	}

	.system-list {
		margin-top: 50px;
	}

	.system-list .menu-list:hover {
		transform: scale(1.1);
	}

	.tips-img {
		width: 300px;
		position: absolute;
		right: 1%;
		bottom: 0;
		transform: translateY(66%);
	}

	.fold_wrap {
		width: 1200px;
		height: 260px;
		margin: 40px auto 0 auto;
		overflow: hidden;
	}

	.fold_wrap li {
		float: left;
		width: 130px;
		height: 260px;
		position: relative;
		overflow: hidden;
		cursor: pointer !important;
	}

	.fold_wrap li .mask_b {
		position: absolute;
		overflow: hidden;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		_background: #B2B2B2;
		cursor: pointer !important;
	}

	.fold_wrap li.active .mask_b {
		background: none;
		cursor: pointer !important;
	}

	.fold_wrap li .mask_b h4 {
		color: #fff;
		width: 30px;
		margin: 0 auto;
		display: block;
		font: 30px/30px Microsoft Yahei;
		position: relative;
		padding: 30px 0 0 0;
	}

	.fold_wrap li.big {
		width: 322px;
	}

	.fold_wrap li .adv_intro {
		width: 92%;
		height: 40px;
		padding: 5px 4%;
		position: absolute;
		left: 0;
		bottom: -50px;
		background: #37D;
		color: #FFF;
		overflow: hidden;
	}

	.adv_intro_show {
		bottom: 0 !important;
		transition: bottom 0.3s linear 0.3s;
		-webkit-transition: bottom 0.3s linear 0.3s;
	}

	.pic_auto {
		width: 100%;
		height: 100%;
	}

	.system-list .pic_auto {
		background-repeat: no-repeat;
		background-position: center 0;
	}

	.logo-title {
		width: 100%;
		height: 66px;
		line-height: 66px;
		font-size: 30px;
		color: rgb(0, 143, 255);

		img {
			display: block;
			margin-right: 15px;
		}
	}

	.swiper-container {
		padding-top: 180px;
		box-sizing: border-box;
	}

	.swiper-inner {
		width: 960px;
	}

	.swiper-inner::after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.swiper-inner>.inner-box {
		width: 120px;
		float: left;
		margin: 0 58px 130px;
		cursor: pointer;
		position: relative;
	}

	.animate-box {
		height: 120px;
		width: 0px;
		padding-bottom: 10px;
		position: absolute;
		top: -130px;
		left: 50%;
		font-size: 0;
		transform: translateX(-50%);
		opacity: 0;
		overflow: hidden;

	}

	.animate-box::before {
		content: "";
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 10px;
		height: 10px;
		margin-left: -5px;
		background: url(../assets/img/downArrow.png) no-repeat 0 0;
		background-size: 10px 10px;
	}

	.animate-box .animate-box-inner {
		height: 120px;
		border-radius: 10px;
		position: relative;
		-webkit-box-shadow: 0px 0px 16px rgba(75, 172, 249, .5) inset;
	}

	.animate-box .animate-box-inner:before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 10px;
		height: 100%;
		background: url(../assets/img/left.png) no-repeat 0 0;
		background-size: 10px 100%;
	}

	.animate-box .animate-box-inner:after {
		content: "";
		position: absolute;
		right: 0;
		top: 0;
		width: 10px;
		height: 100%;
		background-image: url(../assets/img/right.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 10px 100%;
	}

	.nav-item {
		background-image: url(../assets/img/icon_bg.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}

	.nav-item.active {
		background-image: url(../assets/img/icon_Selection_bg.png);
	}

	.nav-item i {
		background: linear-gradient(to bottom, #0af0f3, #089ddb);
		-webkit-background-clip: text;
		color: transparent;
		box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.35);
	}

	.animate-box .animate-item {
		width: 100px;
		opacity: 1;
	}

	.swiper-inner>.inner-box .one .animate-box {
		animation: moveone 0.1s forwards;
	}

	.swiper-inner>.inner-box .two .animate-box {
		animation: movetwo 0.1s forwards;
	}

	.swiper-inner>.inner-box .three .animate-box {
		animation: movethree 0.1s forwards;
	}

	.swiper-inner>.inner-box .four .animate-box {
		animation: movefour 0.1s forwards;
	}

	.swiper-inner>.inner-box .five .animate-box {
		animation: movefive 0.1s forwards;
	}

	.swiper-inner>.inner-box .six .animate-box {
		animation: movesix 0.1s forwards;
	}

	.swiper-inner>.inner-box .seven .animate-box {
		animation: moveseven 0.1s forwards;
	}

	.swiper-inner>.inner-box .eight .animate-box {
		animation: moveeight 0.1s forwards;
	}

	.swiper-inner>.inner-box .none .animate-box {
		animation: movenone 0.1s forwards;
	}

	.swiper-inner>.inner-box .ten .animate-box {
		animation: moveten 0.1s forwards;
	}

	.swiper-inner>.inner-box .elev .animate-box {
		animation: moveelev 0.1s forwards;
	}

	.swiper-inner>.inner-box .twl .animate-box {
		animation: movetwl 0.1s forwards;
	}

	.swiper-inner>.inner-box ._one .animate-box {
		animation: _moveone 0.3s forwards;
	}

	.swiper-inner>.inner-box ._two .animate-box {
		animation: _movetwo 0.3s forwards;
	}

	.swiper-inner>.inner-box ._three .animate-box {
		animation: _movethree 0.3s forwards;
	}

	.swiper-inner>.inner-box ._four .animate-box {
		animation: _movefour 0.3s forwards;
	}

	.swiper-inner>.inner-box ._five .animate-box {
		animation: _movefive 0.3s forwards;
	}

	.swiper-inner>.inner-box ._six .animate-box {
		animation: _movesix 0.3s forwards;
	}

	.swiper-inner>.inner-box ._seven .animate-box {
		animation: _moveseven 0.3s forwards;
	}

	.swiper-inner>.inner-box ._eight .animate-box {
		animation: _moveeight 0.3s forwards;
	}

	.swiper-inner>.inner-box ._none .animate-box {
		animation: _movenone 0.3s forwards;
	}

	.swiper-inner>.inner-box ._ten .animate-box {
		animation: _moveten 0.3s forwards;
	}

	.swiper-inner>.inner-box ._elev .animate-box {
		animation: _moveelev 0.3s forwards;
	}

	.swiper-inner>.inner-box ._twl .animate-box {
		animation: _movetwl 0.3s forwards;
	}






	.swiper-inner>.inner-box .one .animate-box .animate-item,
	.swiper-inner>.inner-box .two .animate-box .animate-item,
	.swiper-inner>.inner-box .three .animate-box .animate-item,
	.swiper-inner>.inner-box .four .animate-box .animate-item,
	.swiper-inner>.inner-box .five .animate-box .animate-item,
	.swiper-inner>.inner-box .six .animate-box .animate-item,
	.swiper-inner>.inner-box .seven .animate-box .animate-item,
	.swiper-inner>.inner-box .eight .animate-box .animate-item,
	.swiper-inner>.inner-box .none .animate-box .animate-item,
	.swiper-inner>.inner-box .ten .animate-box .animate-item,
	.swiper-inner>.inner-box .elev .animate-box .animate-item,
	.swiper-inner>.inner-box .twl .animate-box .animate-item,
		{
		animation-duration: .3s;
		-webkit-backface-visibility: visible !important;
		backface-visibility: visible !important;
		-webkit-animation-name: flipInX;
		animation-name: flipInX;
		visibility: visible !important;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		//animation-direction:alternate;
	}

	@keyframes moveone {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 100px;
			opacity: 1;
		}
	}

	@keyframes _moveone {
		0% {
			width: 100px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movetwo {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 200px;
			opacity: 1;
		}
	}

	@keyframes _movetwo {
		0% {
			width: 200px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movethree {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 300px;
			opacity: 1;
		}
	}

	@keyframes _movethree {
		0% {
			width: 300px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movefour {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 400px;
			opacity: 1;
		}
	}

	@keyframes _movefour {
		0% {
			width: 400px;
			opacity: 1;

		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movefive {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 500px;
			opacity: 1;
		}
	}

	@keyframes _movefive {
		0% {
			width: 500px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movesix {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 600px;
			opacity: 1;
		}
	}

	@keyframes _movesix {
		0% {
			width: 600px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes moveseven {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 700px;
			opacity: 1;
		}
	}

	@keyframes _moveseven {
		0% {
			width: 700px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes moveeight {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 800px;
			opacity: 1;
		}
	}

	@keyframes _moveeight {
		0% {
			width: 800px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movenone {
		0% {
			width: 0px;
			opacity: 0;
		}

		100% {
			width: 900px;
			opacity: 0;
		}
	}

	@keyframes __movenone {
		0% {
			width: 900px;
			opacity: 0;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes moveten {
		0% {
			width: 0;
			opacity: 0;
		}

		100% {
			width: 1000px;
			opacity: 1;
		}
	}

	@keyframes __moveten {
		0% {
			width: 1000px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes moveelev {
		0% {
			width: 0;
			opacity: 0;
		}

		100% {
			width: 1100px;
			opacity: 1;
		}
	}

	@keyframes __moveelev {
		0% {
			width: 1100px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}

	@keyframes movetwl {
		0% {
			width: 0;
			opacity: 0;
		}

		100% {
			width: 1200px;
			opacity: 1;
		}
	}

	@keyframes __movetwl {
		0% {
			width: 1200px;
			opacity: 1;
		}

		100% {
			width: 0px;
			opacity: 0;
		}
	}





	@keyframes fadeIn {
		0% {
			transform: scale(0);
			opacity: 0.0;
		}

		60% {
			transform: scale(1.1);
		}

		80% {
			transform: scale(0.9);
			opacity: 1;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}




	@-webkit-keyframes flipInX {
		from {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}

		40% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}

		60% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			opacity: 1;
		}

		80% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
		}

		to {
			-webkit-transform: perspective(400px);
			transform: perspective(400px);
		}
	}

	@keyframes flipInX {
		from {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}

		40% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}

		60% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			opacity: 1;
		}

		80% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
		}

		to {
			-webkit-transform: perspective(400px);
			transform: perspective(400px);
		}
	}

	.swiper-button-prev,
	.swiper-container-rtl .swiper-button-next {
		left: 10%;
	}

	.swiper-button-next,
	.swiper-container-rtl .swiper-button-prev {
		right: 10%;
	}
</style>
<style type="text/css">
	.fold_wrap li {
		cursor: pointer !important;
	}
</style>
