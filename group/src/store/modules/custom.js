import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';


// initial state
const state = {
  customItems: [],
};

const actions = {
  setCustomItems({ commit }, { params }) {
    http.post(Server.action.setItems, params).then((resData) =>{
        if(resData.code===0){
          // helper.reload()
        }
    })

  },
  getCustomItems({ commit }, page) {
    http.get(Server.action.getItems, { page }).then((resData) => {
      if(resData.code===0){
        let data = resData.result
        //不存在标题就添加标题
        let ifHeaderTitle = []
        data.forEach(item=>{
          ifHeaderTitle.push(item.id)
        })
        if (ifHeaderTitle.indexOf('headerTitle') == -1) {
          data.push({
            id: 'headerTitle',
            title: '',
          })
        }
        console.log(data);
        
        commit('setSiteItems', data);
      }
    });
  },

};

const mutations = {
  setSiteItems(state, items) {
    state.customItems = items;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
