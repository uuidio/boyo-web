import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import router from '@/router';

// initial state
const state = {
  lists: [],
  fields: [],
  detail: {},
	pages: {},
	exportData: {},
};

const actions = {

  frozenPromoter({ commit }, params) {
    fetch
      .post(Server.action.member_frozen, params)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
    },


	userAccountDown({ commit }, {data,collback}){
		fetch
		.post(Server.action.userAccountDown, data)
		.then((response) => {
		  if (response.data.code === 0) {
			collback && collback();
		  } else {
			helper.showError(response.message);
		  }
		})
		.catch((error) => {
		  helper.showError(error);
		});
	  },	

  fetchLists({ commit }, listItem) {
    fetch
      .get(Server.action.member_list, { params: listItem } )
      .then((response) => {
        if (response.data.code === 0) {
          // console.log(response);
          commit('setLists', response.data.result.lists.data);
          commit('setFields', response.data.result.field);
          commit('setpage', response.data.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
	//筛选
	fetchSearch({ commit }, listItem) {
	  fetch
	    .get(Server.action.member_search, { params: listItem } )
	    .then((response) => {
	      if (response.data.code === 0) {
	        // console.log(response);
          const fieldList = response.data.result.field
          // fieldList.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   width:200,
          //   scopedSlots: { customRender: 'action' },
          // });
	        commit('setLists', response.data.result.lists.data);
	        commit('setFields', fieldList);
	        commit('setpage', response.data.result.lists);
	      } else {
	        helper.showError(response.data.message);
	      }
	    })
	    .catch((error) => {
	      helper.showError(error);
	    });
	},
	//导出为Excel
	exportFilter({ commit }, exportForm) {
	  fetch
	    .post(Server.action.member_export, exportForm)
	    .then((response) => {
				// console.log(response);
	      if (response.data.code === 0) {
	        commit('setExportData', response.data.result);
	      } else {
	        helper.showError(response.data.message);
	      }
	    })
	    // .catch((error) => {
	    //   helper.showError(error);
	    // });
	},
};

const mutations = {
  setDetail(state, detail) {
    state.detail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
	setpage(state, page) {
	  state.pages = page;
	},
	setExportData(state, lists) {
	  state.exportData = lists;
	},
  // set fields
  setFields(state, fields) {
    state.fields = fields;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
