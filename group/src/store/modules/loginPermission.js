import { routers } from '@/router/routers';
import { USER_INFO } from '@/store/mutation-types';
import Cookies from "js-cookie";
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id);
  }
  return true;
}

function filterAsyncRouter(routerMap, roles) {

  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(roles.frontend_permission, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

function filterRouter(routerMap,user){
  const items = routerMap[0].children
  const AllRedirectList =[];
  const userAllList = [];
  const userRouter = user.frontend_permission
  const userPermission = []
  for(let i = 0;i< items.length;i++){
    const routerItem = items[i];
    AllRedirectList.push(routerItem.redirect)
  }
  userRouter.forEach((value) => {
     if(AllRedirectList.indexOf(value) !==-1){
       userAllList.push(value)
     }
  })
  items.forEach((value) => {
    if(userAllList.indexOf(value.redirect)!==-1){
      userPermission.push(value)
    }
  })
  for(let i = userPermission.length-1;i>=0;i--){
    const item = userPermission[i]
    for(let j=item.children.length-1;j>0;j--){
      const childrenItem  = item.children[j]
      if(userRouter.indexOf(childrenItem.path)===-1){
        item.children.splice(j,1)
      }
    }
  }

  routerMap[0].children = userPermission
  return routerMap
}

const permission = {
  state: {
    routers: routers,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routers;
    },
  },
  actions: {
    GenerateRoutes({ commit }) {
      if(Cookies.get(USER_INFO)){
        const userInfo = JSON.parse(Cookies.get(USER_INFO))
        if(userInfo && userInfo.is_root!==1){
          filterRouter(routers,userInfo)
        }
      }
      commit('SET_ROUTERS', routers);
    },
  },
};

export default permission;
