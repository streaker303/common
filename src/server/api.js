import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import {
	Message
} from 'element-ui';
//import Vuex from '../store/index.js'
import {
	setsessionStorage
} from '../assets/js/public_fun.js';
// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = 'api/';
	axios.defaults.headers.post['Content-Type'] = 'application/json'; //'application/x-www-form-urlencoded';
	axios.defaults.timeout = 60000;
}

axios_config();
var getAjax = result => {
	return new Promise((resolve, reject) => {
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
			console.log(result.data.message);
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				setsessionStorage('errorInfo', result.data.message)
				router.push('/error')
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					router.push('/login');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
var getAjaxSome = result => {
	return new Promise((resolve, reject) => {
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				setsessionStorage('errorInfo', result.data.message)
				router.push('/error')
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					router.push('/login');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
//form表单五返回code
var getAjaxVal = result => {
	return new Promise((resolve, reject) => {
		if (result.status == 200) {
			resolve("success");
		} else {
			Message({
				message: result.data.message,
				type: 'warning'
			});
			reject(result.data);
		}
	})
}


//登录接口
export const login = (data) => {
	console.log(data)
	return axios.request({
		url: 'loginUser',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//修改密码
export const change_pwd = (data) => {
	return axios.request({
		url: 'manage/permission/updatePassword',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}


//系统列表
export const get_menu = (data) => {
	return axios.request({
		url: 'manage/permission/getMenu',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

//退出
export const exit = (data) => {
	return axios.request({
		url: 'exit',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

//添加，编辑小组
export const addGroup = (data) => {
	// console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/savaGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjaxSome(result);
	})
}
export const get_options_list = (data) => {
	return axios.request({
		url: 'manager/infohandle/getDeployInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//添加配置项
export const add_event_type = (data) => {
	return axios.request({
		url: 'manager/infohandle/addDeployItem',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//修改配置项
export const change_event_type = (data) => {
	return axios.request({
		url: 'manager/infohandle/updateDeployItem',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_option = (data) => {
	return axios.delete('manager/infohandle/deleteDeployItem', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//高位信息列表
export const getEventList = (data) => {
	return axios.request({
		url: 'manager/decision/findHighRiskInfoList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//新增高位信息
export const addEvent = (data) => {
	return axios.request({
		url: 'manager/decision/addHighRiskInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//编辑高位信息
export const updateEvent = (data) => {
	return axios.request({
		url: 'manager/decision/modifyHighRiskInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//删除高位信息
export const delEvent = (data) => {
	return axios.delete('manager/decision/deleteInfo', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		return getAjax(result);
	})
}



//获取任务列表
export const getTaskList = (data) => {
	return axios.request({
		url: 'manager/check/findTaskList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//新增任务
export const addTask = (data) => {
	return axios.request({
		url: 'manager/check/addTask',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//编辑任务
export const updateTask = (data) => {
	return axios.request({
		url: 'manager/check/updateTask',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}


//编辑checklist
export const updateCheckItem = (data) => {
	return axios.request({
		url: 'manager/check/updateCheckItemStatus',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//删除任务
export const delTask = (data) => {
	return axios.delete('manager/check/deleteCheckTask', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//修改配置项
export const get_info_handel_list = (data) => {
	return axios.request({
		url: 'manager/infohandle/findInfoHandleList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//添加时间信息
export const add_event_info = (data) => {
	return axios.request({
		url: 'manager/infohandle/addInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}






//获取中和信息处理列表
export const get_info_list = (data) => {
	return axios.request({
		url: 'manager/infohandle/findInfoHandleList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//获取聊天信息
export const get_message_list = (data,_url) => {
	return axios.request({
		url:''+ _url,
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//获取用户
export const get_users_list = (data) => {
	return axios.request({
		url: 'manage/greeting/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}




//获取小组列表
export const listGroup = (data) => {
	// console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/getAllGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjaxSome(result);
	})
}

//获取列表
export const getList = (data) => {
	// console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjaxSome(result);
	})
}

//添加信息
export const addInfo = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/saveInformation',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

//修改信息
export const editIp = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/editIp',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

//获取所有来源
export const getGroup = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/getAllGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}
//获取所有厂商
export const getDeps = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/InformationRetrieval/getDeps',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}


//创建文件夹
export const addFolder = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/electronicDocument/mkdir',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}
//文件上传
export const upload = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/electronicDocument/upload',
		method: 'post',
		responseType: 'arraybuffer',
		params: data.queryData,
		data: data.paramsData,
		// transformRequest: [function (data) {console.log(data) }],
	}).then(result => {
		console.log(result);
		return getAjaxVal(result);
	})
}
//获取目录
export const getFile = (data) => {
	console.log(data)
	return axios.request({
		url: 'manage/electronicDocument/list',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjaxSome(result);
	})
}


//新建模板
export const addTemplate = (data) => {
	return axios.request({
		url: 'manager/template/addTemplateAllInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjaxSome(result);
	})
}
//获取模板list
export const getTemplateList = (data) => {
	return axios.request({
		url: 'manage/eventinfo/getAllTemplate',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjaxSome(result);
	})
}
//搜索客户
export const getUsers = (data) => {
	return axios.request({
		url: 'manager/check/getResponsibleList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//获取组列表
export const getGroups = (data) => {
	return axios.request({
		url: 'manager/templateColumn/findGroupList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//删除模板
export const delete_temp = (data) => {
	return axios.delete('manager/template/deleteTemplate', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//更新模板
export const changeTemplate = (data) => {
	return axios.request({
		url: 'manager/template/updateTemplateAllInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取事件类型
export const get_event_types = (data) => {
	return axios.get('manage/eventinfo/getEventType', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//获取事件类型new
export const getNewEventType = (data) => {
	return axios.get('manage/eventinfo/getNewEventType', { //params参数必写 , 如果没有参数传{}也可以
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//添加事件
export const add_event = (data) => {
	return axios.request({
		url: 'manage/eventinfo/saveEvent',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//获取事件列表
export const get_event_list = (data) => {
	return axios.request({
		url: 'manage/eventinfo/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//删除事件
export const delete_event = (data) => {
	return axios.request({
		url: 'manage/eventinfo/delEvent',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//事件详情
export const get_event_detail = (data) => {
	return axios.request({
		url: 'manage/eventinfo/editTemplateColumns',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//根据模板id获取组信息
export const get_temp_group = (data) => {
	return axios.request({
		url: 'manage/eventinfo/getTemplateColumnById',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//模板--获取所有文件
export const get_files = (data) => {
	return axios.request({
		url: 'manage/eventinfo/getFiles',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取模板分页
export const get_template_list = (data) => {
	return axios.request({
		url: 'manager/template/queryTemplateList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//判断当前用户是否有组
export const is_group = (data) => {
	return axios.request({
		url: 'manage/greeting/getUserGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取省份
export const get_provinces = (data) => {
	return axios.request({
		url: 'manage/bank/getCity',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//根据省份获取城市
export const get_citys = (data) => {
	return axios.request({
		url: 'manage/bank/getCity',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取上级单位列表
export const get_prev_units = (data) => {
	return axios.request({
		url: 'manage/bank/getSuperiors',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//添加分行
export const add_bank = (data) => {
	return axios.request({
		url: 'manage/bank/saveBank',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//添加分行
export const get_bank_list = (data) => {
	return axios.request({
		url: 'manage/bank/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//删除分行
export const del_bank = (data) => {
	return axios.request({
		url: 'manage/bank/del',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//修改分行
export const change_bank = (data) => {
	return axios.request({
		url: 'manage/bank/saveBank',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//获取所有城市
export const getCity = (data) => {
	return axios.request({
		url: 'manage/InformationRetrieval/getSecondLevelCity',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取所有银行
export const getBank = (data) => {
	return axios.request({
		url: 'manage/InformationRetrieval/getAllBank',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//获取小组
export const getUserGroups = (data) => {
	return axios.request({
		url: 'manage/InformationRetrieval/getUserGroups',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}


//查询平台基础信息
export const getMonitorList = (data) => {
	return axios.request({
		url: 'manage/systemMon/selectSystemMonitoringDO',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//添加平台验收信息
export const addMonitor = (data) => {
	return axios.request({
		url: 'manage/systemMon/saveSystemMonitoringDO',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//修改平台验收信息
export const updateMonitor = (data) => {
	return axios.request({
		url: 'manage/systemMon/updateSystemMonitoringDO',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

//删除平台验收信息
export const delMonitor = (data) => {
	return axios.request({
		url: 'manage/systemMon/deleteSystemMonitoringDO',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

export const get_time = (data) => {
	return axios.request({
		url: 'terminal/getSystemTime',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
