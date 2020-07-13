<template>
	<div class="home">
        <TopNav :permissions="permissions" :userInfo="userInfo" :baseInfo="baseInfo"></TopNav>
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
                baseInfo: '',
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

</style>
