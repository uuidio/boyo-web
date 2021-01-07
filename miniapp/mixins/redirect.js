
export default {
  data(){
    return{
    }
  },
  methods: {
    toPage(page) {
      uni.navigateTo({
        url: page,
      });
    },
    toHome() {
      uni.switchTab({
        url: '/pages/index/indexCustomer',
      });
    },
    toSearch() {
      uni.navigateTo({
        url: '/pagesA/goods/search',
      });
    },
    toGoods(id) {
      uni.navigateTo({
        url: '/pagesA/goods/detail?id=' + id,
      });
    },
    toShop(id) {
      uni.navigateTo({
        url: '/pagesB/shop/index?shopid=' + id,
      });
    },
    toShopDetail(id) {
      uni.navigateTo({
        url: '/pagesA/brand/lists?shopid=' + id,
      });
    },
    back() {
      uni.navigateBack();
    },
  },

};
