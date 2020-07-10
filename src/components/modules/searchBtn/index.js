import searchBtn from './searchBtn.vue';

/* istanbul ignore next */
searchBtn.install = function(Vue) {
  Vue.component(searchBtn.name, searchBtn);
};

export default searchBtn;
