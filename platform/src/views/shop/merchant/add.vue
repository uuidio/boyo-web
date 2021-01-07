<template>
  <div class="content">
    <a-form :model="formItem">
      <a-form-item
        label="店铺名称"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-input
          v-model="formItem.shop_name"
          placeholder="请输入店铺名称"
        />
      </a-form-item>
<!--      <a-form-item
        label="店铺编码"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-input
          v-model.trim="formItem.store_code"
          placeholder="请输入店铺编码"
        />
        <p class="ps">注：店铺编码确认好保存否则影响交易</p>
      </a-form-item>
      <a-form-item
        label="erp店铺ID"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-input
          v-model.trim= "formItem.erp_storeCode"
          placeholder= "请输入ERP店铺ID"
        />
        <p class="ps">注：ERP店铺ID确认好保存否则影响交易</p>
      </a-form-item>
      <a-form-item
        label="erpPOS编码"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-input
          v-model.trim="formItem.erp_posCode  "
          placeholder="请输入erpPOS编码"
        />
        <p class="ps">注：erpPOS编码确认好保存否则影响交易</p>
      </a-form-item> -->
      <!-- <a-form-item
        label="开启erp推送"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-radio-group
          name="radioErp"
          v-model="formItem.is_push_erp"
        >
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item
        label="门店账号"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 8, xs: 24 }"
        :required="true"
      >
        <!--<a-input v-model="formItem.seller_name" placeholder="请输入店铺账号"/>-->
        <a-select
          :disabled="id !== 0"
          placeholder="请输入店铺账号"
          v-model="formItem.seller_name"
        >
          <a-select-option
            :value="item.username"
            v-for="(item, index) in accountList"
            :key="index"
            >{{ item.username }}</a-select-option
          >
        </a-select>
        <p>
          <span class="col-red">*</span
          >门店账号指门店自己注册或者品牌添加的门店账号
        </p>
      </a-form-item>
<!--      <a-form-item
        label="店铺场地类型"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-radio-group
          :disabled="id !== 0"
          name="radioGroup"
          v-model="formItem.internal"
        >
          <a-radio :value="0">外场</a-radio>
          <a-radio :value="1">内场</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item
        label="选择店铺类型"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
      >
        <a-radio-group
          :disabled="id !== 0"
          name="radioGroup"
          v-model="formItem.shop_type"
        >
          <a-radio value="flag">旗舰店</a-radio>
          <a-radio value="self">自营店</a-radio>
          <a-radio value="brand">品牌店</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="选择店铺楼层"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 7, xs: 24 }"
        :required="true"
        v-if="formItem.internal === 1"
      >
        <a-select placeholder="选择店铺楼层" v-model="formItem.floors_id">
          <a-select-option
            :value="item.id"
            v-for="(item, index) in listData"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        label="选择商场分类"
        :label-col="{ md: 4, xs: 24 }"
        :wrapper-col="{ md: 20, xs: 24 }"
        :required="true"
        v-if="formItem.internal === 1"
      >
        <a-cascader
          style="width:345px"
          v-model="selectClass"
          :allowClear="true"
          @change="classChange"
          :options="option"
          placeholder="选择分类"
        />
        <div class="col-666">*品牌分类可多选</div>
        <div v-if="formItem.rel_cat_id_data.length > 0" class="fxBox1">
          已选分类：
          <div
            v-for="(item, index) in formItem.rel_cat_id_data"
            :key="index"
            class="mr10 btns"
            size="small"
          >
            {{ item.one.label }}/{{ item.two.label }}
            <a-icon class="closeItem" @click="del(index)" type="close" />
          </div>
          <a @click="delAll">删除全部</a>
        </div>
      </a-form-item>
      <a-form-item
        label="选择地址"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 14,xs:24}"
        :required="true"
      >
        <a-row>
          <a-col :md="12" :xs="24">
            <a-input @click="showModal" readOnly v-model="confirmSltAddr" placeholder="请选择地址"/>
          </a-col>
          <a-col style="padding-left:20px" :md="12" :xs="24">
            <div v-if="formItem.longitude && formItem.latitude">
              <span>经度：{{formItem.longitude}}</span>
              <span class="ml10">纬度：{{formItem.latitude}}</span>
            </div>
            <div v-else style="color:red">*暂无定位匹配，请重新输入</div>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        label="品牌地址"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 14,xs:24}"
        :required="true"
      >
        <a-row>
          <a-col :md="12" :xs="24">
            <a-input v-model="formItem.address" placeholder="请输入品牌地址"/>
          </a-col>

        </a-row>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 4, md: 12, xs: 24 }">
        <a-button @click="submitShop" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger"
          >返回</a-button
        >
      </a-form-item>
    </a-form>

    <a-modal width="85vw" title="地址查询" v-model="visible" @ok="handleOk" @cancel="cancel">
          <div class="fxBox1 mb20">
            <span>关键词搜索：</span>
            <a-input style="width: 300px" type="text" id="keyword" placeholder="请输入关键字：(选定后搜索)"/>
            <p class="ml10" style="color:red">(请在搜索结果中选择地址，默认取第一个)</p>
          </div>
          <div class="map-container">
            <div id="mapContainer"></div>
            <div id="panel"></div>
          </div>
          <!--          <div>-->
<!--            <span>定位：</span>-->
<!--            <input type="text" v-model="selectAddress">-->
<!--          </div>-->
<!--          <div>-->
<!--            <span>经纬度：</span>-->
<!--            <input type="text" v-model="selectLngLat">-->
<!--          </div>-->
        </a-modal>
  </div>
</template>

<script>
// import UploadImage from '@C/upload/UploadImage';
import { mapState, mapActions } from "vuex";
import AMap from 'AMap';

export default {
  components: {
    // UploadImage,
  },
  computed: {
    ...mapState({
      listData: state => state.floor.lists,
      option: state => state.marketClass.optionTree,
      accountList: state => state.shop.accountlists,
      detail: state => state.shop.detail
    })
  },
  data() {
    return {
      // imageList: [],
      // imageList2: [],
      brand_id: '',
      shopType: 1,
      selectClass: [],
      id: 0,
      formItem: {
        shop_name: '',
        seller_name: '',
        shop_type: 'flag',
        floors_id: '',
        rel_cat_id: [],
        rel_cat_id_data: [],
        internal: 0,
        store_code: '',
        erp_posCode: '',
        erp_storeCode: '',
        is_push_erp: 0,

        address: '',
        longitude: '', // 经度
        latitude: '', // 纬度
      },
      selectItem: [],

      confirmSltAddr: '',
      visible: false,
      lnglat: [116.397428, 39.90923],
      zoom: 19,
      sltLng: '',
      sltLat: '',
      sltAddr: '',
    };
  },
  methods: {
    handleOk() {
      // this.detail.address = this.sltAddr;
      this.confirmSltAddr = this.sltAddr;
      this.formItem.longitude = this.sltLng;
      this.formItem.latitude = this.sltLat;
      this.$forceUpdate();
      this.visible = false;
    },
    cancel() {
      this.sltLng = '';
      this.sltLat = '';
      this.sltAddr = '';
    },
    searchAddressMethod() {
      const self = this
      AMap.plugin(['AMap.CitySearch', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.ToolBar'], () => {
        const citySearch = new AMap.CitySearch();
        var map
        // 搜索插件
        var placeSearch
        // 城市定位 begin
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            // console.log(result)
            const rectangle = result.rectangle.split(';')[1].split(',')
            self.lnglat = rectangle.map(Number)
            // 初始化地图 begin
            map = new AMap.Map('mapContainer', {
              resizeEnable: true,
              // center: self.lnglat,//地图中心点
              zoom: self.zoom, // 地图显示的缩放级别
              keyboardEnable: false,
            });
            map.addControl(new AMap.ToolBar());
            // 初始化地图 end
            // 绑定点击事件 begin
            // let marker,
            //   geocoder
            // AMap.event.addListener(map, 'click', (e) => {
            //   console.log(e)
            //   // 创建标记 begin
            //   if (marker != null) {
            //     marker.setMap(null);
            //   }
            //   marker = new AMap.Marker({
            //     icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            //     position: e.lnglat,
            //     offset: new AMap.Pixel(-13, -30),
            //   });
            //   marker.setMap(map);
            //   // 创建标记 end
            //   // 解析位置 begin
            //   // 获取经纬度
            //   self.selectLngLat = e.lnglat.lat + '，' + e.lnglat.lng
            //   if (!geocoder) {
            //     geocoder = new AMap.Geocoder({
            //       // city: "010", //城市设为北京，默认：“全国”
            //       radius: 1000, // 范围，默认：500
            //     });
            //   }
            //   geocoder.getAddress(e.lnglat, function(status, result) {
            //     if (status === 'complete' && result.regeocode) {
            //       console.log(result)
            //       const address = result.regeocode.formattedAddress;
            //       console.log(address)
            //       self.selectAddress = address;
            //     } else {
            //       console.error('根据经纬度查询地址失败');
            //     }
            //   });
            //   // 解析位置 end
            // });
            // 绑定点击事件 end
          }
        })
        // 城市定位 end
        // 搜索联想提示 begin
        const autoOptions = {
          input: 'keyword', // 使用联想输入的input的id
        };
        setTimeout(() => {
          const autocomplete = new AMap.Autocomplete(autoOptions);
          AMap.event.addListener(autocomplete, 'select', function(e){
            map.clearMap(); // 清除所有覆盖物(marker..)
            placeSearch = new AMap.PlaceSearch({
              map: map,
              pageSize: 5, // 单页显示结果条数
              pageIndex: 1, // 页码
              panel: 'panel', // 结果列表将在此容器中进行展示
              // city: "010", // 兴趣点城市
              // citylimit: true,  //是否强制限制在设置的城市内搜索
              // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            })
            placeSearch.search(e.poi.name, (status, result) => {
              if (status == 'complete' && result.info == 'OK' && result.poiList.pois.length > 0) {
                const item = result.poiList.pois[0]
                self.sltLng = item.location.lng; // 经度
                self.sltLat = item.location.lat; // 纬度
                self.sltAddr = item.name;
                // console.log(result.poiList.pois)
              }
              AMap.event.addListener(placeSearch, 'markerClick', (e) => { // marker点击事件
                self.sltLng = e.data.location.lng;
                self.sltLat = e.data.location.lat;
                self.sltAddr = e.data.name;
              });
              AMap.event.addListener(placeSearch, 'listElementClick', (e) => { // 搜索点击
                self.sltLng = e.data.location.lng;
                self.sltLat = e.data.location.lat;
                self.sltAddr = e.data.name;
              });
            });
          });
        }, 1000);
        // 搜索联想提示 end
      });
    },
    showModal() {
      this.visible = true;
      this.searchAddressMethod();
    },
    ...mapActions({
      addShop: "shop/addShop",
      fetchLists: "floor/fetchLists",
      treeLists: "marketClass/getTree",
      accountLists: "shop/accountLists",
      getDetail: "shop/getDetail",
      editShop: "shop/editShop"
    }),
    delAll() {
      this.formItem.rel_cat_id = [];
      this.$set(this.formItem, "rel_cat_id_data", []);
    },
    init() {
      this.confirmSltAddr = this.detail.address;
      this.id = this.detail.id;
      this.formItem = {
        id: this.detail.id,
        shop_name: this.detail.shop_name,
        seller_name: this.detail.seller_name,
        shop_type: this.detail.shop_type,
        floors_id: this.detail.floors_id,
        rel_cat_id: this.detail.rel_cat_id,
        internal: this.detail.internal,
        store_code: this.detail.store_code,
        erp_posCode: this.detail.erp_posCode,
        erp_storeCode: this.detail.erp_storeCode,
        is_push_erp: this.detail.is_push_erp,

        address: this.detail.address,
        longitude: this.detail.longitude,
        latitude: this.detail.latitude,
      };
      if (this.detail.rel_cat_id_data) {
        this.$set(
          this.formItem,
          "rel_cat_id_data",
          JSON.parse(this.detail.rel_cat_id_data)
        );
      } else {
        this.$set(this.formItem, "rel_cat_id_data", []);
      }
    },
    del(index) {
      this.formItem.rel_cat_id_data.splice(index, 1);
      this.formItem.rel_cat_id.splice(index, 1);
    },
    classChange(e, item) {
      if (e.length == 2 && this.formItem.rel_cat_id.indexOf(e[1]) === -1) {
        this.formItem.rel_cat_id.push(e[1]);
        this.formItem.rel_cat_id_data.push({
          one: item[0],
          two: item[1]
        });
        this.selectClass = [];
      }
    },
    submitShop() {
      if (this.formItem.shop_type !== 'brand') {
        this.formItem.brand_id = '';
      }
      if (this.formItem.store_code) {
        if (this.formItem.store_code.length <= 3) {
          this.$message.info('店铺编码最少4位');
          return;
        }
      }
      if (this.id === 0) {
        this.addShop({
          formItem: this.formItem,
        });
      } else {
        this.editShop({
          formItem: this.formItem,
        });
      }
    }
  },
  mounted() {
    this.fetchLists({ xx: 1 });
    this.treeLists({ xx: 1123 });
    this.accountLists({
      obj: {
        per_page: 100000,
      }
    });
    if (this.$route.params.id) {
      this.getDetail({ id: this.$route.params.id });
    }
  },
  watch: {
    detail() {
      this.init();
      console.log(this.detail);
    }
  }
};
</script>

<style scoped lang="stylus">
.btns {
  padding 0px 6px
  border-radius 4px
  border 1px solid #e7e7e7
  line-height 24px
  .closeItem {
    cursor pointer
  }
}
.ps {
  color red
  font-size 12px
}
.map-container
    position relative
  #mapContainer
    width 100%
    height 50vh
  #mapContainer img
    width 20px
  #panel
    position absolute
    background-color white
    max-height 100%
    overflow-y auto
    top 0
    right 0
    z-index 999
    max-width 30%
  >>> .el-vue-search-box-container
    width 800px
</style>
