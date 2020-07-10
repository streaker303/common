<template>
	<div class="login home">
<!--		<img class="login-image" style="width:542px; position: absolute;left:50%;top:40px;margin-left: -271px;" src="../assets/img/login_title.png" alt=""/>-->
		<p style="width:542px; position: absolute;left:50%;top:120px;margin-left: -271px;font-size: 46px;font-family:'Hkxzy';color: #fff;letter-spacing: 8px;text-align: center ">积极安全感知平台</p>
		<img style="width:70%;position: absolute;left:15%;top:36%;" src="../assets/img/Landing_page_bg2.png" alt=""/>
		<div class="login-box">
			<div class="ub ub-ac login-logo ub-pc" style="font-size:0;">
				<img style="width:438px;" src="../assets/img/Popup_top.png" alt=""/>
			</div>

			<div class="login-content">
				<div class="login-text" style="color:#05ffff;font-size:24px;padding: 50px 0px 38px;">登 录</div>
				<el-form class="login-from-box" :model="loginForm" :rules="loginRules" ref="loginForm">
					<el-form-item prop="username" :label-width="formLabelWidth">
						<el-input prefix-icon="el-icon-user-solid" clearable placeholder="用户名" v-model="loginForm.username" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item style="margin-top: 40px;" prop="password" :label-width="formLabelWidth">
						<el-input prefix-icon="iconfont icon-mima" show-password placeholder="密码" v-model="loginForm.password" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div class="rember-pwd" style="margin: 40px 0 30px;">
						<el-checkbox v-model="checked">记住密码</el-checkbox>
				</div>
				<div class="ub ub-pc ub-f1 login-btn">
					<el-button style="width:318px;" type="primary" @click="validUser('loginForm',loginForm)">登 录</el-button>
				</div>
			</div>
		</div>
		<div ref="canvasFrame" class="container"></div>
	</div>
</template>

<script>
	import { login } from '../server/api.js'
	import md5 from '../assets/js/md5.js'
	import Base64 from '../assets/js/base64.js'
	var SEPARATION = 100,
		AMOUNTX = 50,
		AMOUNTY = 50;
	var container, stats; //容器，监视器
	var camera, scene, renderer; //相机，场景，渲染器
	var particles, particle, count = 0;
	var mouseX = 0,
		mouseY = -438; //设置初始位置
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var temx = 0,
		tempy = 0;
	var onOff = false;
	export default {
		name: 'login',
		data() {
			return {
				loginForm: {
					username: '',
					password: '',
				},
				loginRules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],

				},
				checked: false,
				formLabelWidth: '0px',
				canvasFrame: null,
			}
		},
		created() {
			let loginInfo = this.$getlocalStorage('loginInfo');
			if(loginInfo != '') {
				loginInfo.password = Base64.decode(loginInfo.password);
				this.loginForm = loginInfo;
				this.checked = true;
			}
		},
		mounted() {
			this.$nextTick(() => {
				onOff = false;
				this.canvasFrame = this.$refs.canvasFrame;
				this.init();
				this.animate();
			})
		},
		beforeDestroy(){
			onOff = true;
			window.cancelAnimationFrame(this.animate)
		},
		methods: {
			onDocumentMouseMove(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = -438;
			},
			onDocumentTouchStart(event) {
				if(event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			},
			onDocumentTouchMove(event) {
				if(event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			},
			animate() {
				if(onOff){
					return;
				}
				window.requestAnimationFrame(this.animate);
				this.render();
			},
			render() { //移动相机形成动画
				camera.position.x += (mouseX - camera.position.x) * .05;
				camera.position.y += (-mouseY - camera.position.y) * .05;
				camera.lookAt(scene.position);
				var i = 0;
				for(var ix = 0; ix < AMOUNTX; ix++) {
					for(var iy = 0; iy < AMOUNTY; iy++) {
						particle = particles[i++];
						particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
							(Math.sin((iy + count) * 0.5) * 50);
						particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
							(Math.sin((iy + count) * 0.5) + 1) * 4;
					}
				}

				//console.log(camera.position.x,camera.position.y,camera.position.z)
				renderer.render(scene, camera);
				count += 0.1;
			},
			onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			},
			init() {
				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
				camera.position.z = 1000;
				console.log(camera.position.x, camera.position.y, camera.position.z)
				scene = new THREE.Scene();
				particles = new Array();
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial({
					color: 0x097bdb,
					//color:0xffe600,//小点点的颜色
					program: function(context) {
						context.beginPath();
						context.arc(0, 0, 0.5, 0, PI2, true);
						context.fill();
					}
				});
				var i = 0;
				for(var ix = 0; ix < AMOUNTX; ix++) {
					for(var iy = 0; iy < AMOUNTY; iy++) {
						particle = particles[i++] = new THREE.Sprite(material);
						particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
						particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
						scene.add(particle);
					}
				}

				var width = this.canvasFrame.clientWidth;
				var height = this.canvasFrame.clientHeight;
				renderer = new THREE.CanvasRenderer({
					antialias: true,
					alpha: true //设置背景透明
				});
				renderer.setSize(width, height);
				this.canvasFrame.appendChild(renderer.domElement);
				//renderer.setClearColor(0x13194b);//设置背景色
				document.addEventListener('mousemove', this.onDocumentMouseMove, false);
				document.addEventListener('touchstart', this.onDocumentTouchStart, false);
				document.addEventListener('touchmove', this.onDocumentTouchMove, false);
				//
				window.addEventListener('resize', this.onWindowResize, false);
				camera.position.x = 133.99999999999972;
				camera.position.y = 437.99999999999943;
				camera.lookAt(scene.position);
				renderer.render(scene, camera);
				this.onWindowResize();
			},
			validUser(formName, obj) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.login_user(obj);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			login_user(obj) {
				let data = {
					queryData: {},
					paramsData: {
						username: obj.username,
						password: md5.md5_32(obj.password).toLowerCase()
					}
				}
				login(data).then(res => {
					console.log('success', res)
					this.$setCookie(res.tokenName+'baseInfo','http://'+location.host+'/');
					let userInfo = {
							cnName:res.info.chineseName,
							id:res.info.id,
							type:res.info.roleId,
						};
//					let userInfo = {
//							cnName:this.$getCookie('chineseName'),
//							id:this.$getCookie('id'),
//							type:this.$getCookie('roleId'),
//							baseInfo:'http://'+location.host+'/',
//						};
					this.$setsessionStorage('userInfo', userInfo);
					if(this.checked) {
						let data = {
							username: this.loginForm.username,
							password: Base64.encode(this.loginForm.password)
						}
						this.$setlocalStorage('loginInfo', data);
					} else {
						this.$removelocalStorage('loginInfo');
					}
					this.$router.replace({
						path: '/home',
					})
				}).catch(error => {
					console.log('error', error)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		margin: 0px;
		overflow: hidden;
		background: url(../assets/img/login_bg.jpg) no-repeat 0 0;
		/*background: url(../assets/img/login_bg.png) no-repeat left bottom;*/
		background-size: cover;
	}

	.login-bg {
		width: 50%;
		position: fixed;
		left: 0;
		top: 0;
		right: 50%;
		bottom: 0;
		img {
			height: 90%;
			position: absolute;
			bottom: 0
		}
	}

	.container {
		position: fixed;
		height: 700px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
	}

	.login-box {
		width: 480px;
		height:468px;
		background-color: rgba(13,66,128,0.96);
		position: fixed;
		top: 54%;
		left: 50%;
		border: 1px solid #4bacf9;
		transform: translate(-50%,-50%);
		padding: 0px;
		z-index: 3;
		box-sizing: border-box;

	}
.login .el-input__inner {
    background: transparent;
    border: 1px solid #1cd7fa;
    box-shadow: 0px 0px 7px #389bf7 inset;
    color: #fff;
}
	.login-logo{
		width:100%;
		position: absolute;
		left:0;
		top:-17px;
		text-align:center;
	}
	.login-content {
		width: 318px;
		margin:0 auto;
		position: relative;
		box-sizing: border-box;
	}

	.welcome {
		font-size: 14px;
		color: #99a0ac;
		span {
			font-size: 17px;
		}
	}

	.project-name {
		font-size: 24px;
		color: #5e676f;
		margin-top: 27px;
	}

</style>
