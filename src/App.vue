<template>
  <div id="app">
  	<router-view class="first-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   data(){
  	return {
  		transitionName:'slide-left'
  	}
  },
  mounted(){

  },
  methods:{

  }
// watch: {
//		'$route' (to, from) {
//				console.log('path',to.path)
//
//			  }
//	},
}
</script>

<style lang="scss">
html,body,#app{
	height:100%;
	background-color: #010205;
	// overflow-x: hidden;
	min-width: 1200px;
	background-image:url(./assets/img/BG.jpg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 150%;
}

.first-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.ip-inline{
	.el-form-item__label{
		float: left;
		margin: 0px 10px 0 0;
		padding: 0;
	}
}
.ips .el-tag{
		margin: 0 3px;
	}

	.event-inline {
		.el-input{
			width: 200px;
		}
		.el-switch{
			margin: 0 20px;
		}
		.el-form-item__label{
			margin: 0;
			padding: 0 10px 0 0;
		}
	}
.file .el-table__body td{
	color: #6d6d6d !important;
	font-size: 12px;
}
.table-expand img{
	max-width: 100%;
}

.data-detail{
		padding:0 30px;
		font-size: 14px;
		.title{
			padding: 40px 30px;
		}
		.group-list{
			background: #fff;
			border-radius: 5px;
			margin-bottom: 20px;
			.group-title{
				margin: 0 40px 35px;
				border-bottom: 1px solid #000;
				color: #323950;
				padding: 20px 0;
				i{
					font-size: 18px;
					color: #afb1b5;
					margin-right: 20px;
				}
			}
			.group-con{
				padding: 0 40px;
				.list-title{
					padding-bottom: 15px;
				}
				.list-con{
					line-height: 1.5;
					padding-bottom: 15px;
				}
				.link{
					display: inline-block;
					background: #e2e5ed;
					color: #333;
					border-radius: 5px;
					padding: 0 5px;
					margin: 5px;
					cursor: pointer;
					i{
						margin-right: 5px;
					}
				}
				.el-input__inner,.el-textarea__inner{
					// background: #f6f7f8;
				}
			}
		}
	}
	.gray{
		color: #7d86a1;
		font-size: 12px;
	}
	.role-card{
		margin-bottom: 15px;
		.el-card__header{
			padding: 0 20px;
			font-size: 14px;
			background: #e2e5ee;
			.el-checkbox__label{
				// color: #fff;
			}
		}
	}
	.ip-inline .el-form-item__error{
		text-align: right;
		top: 0;
		width: 100%;
	}
</style>
