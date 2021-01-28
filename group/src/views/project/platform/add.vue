<template>
    <div class="content">
        <a-form-item
        label="品牌项目名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.platform_name" placeholder="请输入品牌项目名称"/>
      </a-form-item>
      <a-form-item
        label="品牌账号"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <!--<a-input v-model="formItem.seller_name" placeholder="请输入店铺账号"/>-->
        <a-select :disabled="id!==0" placeholder="请选择品牌账号" v-model="detail.admin_id" style="width:200px">
          <a-select-option :value="item.id" v-for="(item,index) in accountList" :key="index">{{item.username}}</a-select-option>
        </a-select>
        <p><span class="col-red">*</span>品牌账号指商家自己注册或者品牌添加的品牌账号</p>
      </a-form-item>
<!--      <a-form-item
            label="平台项目类型"
           :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
            :required="true"
          >
            <a-radio-group :disabled="id!==0" v-model="detail.type" defaultValue="normal">
              <a-radio value="normal">普通自营</a-radio>
              <a-radio value="self">平台自营</a-radio>
            </a-radio-group>
          </a-form-item> -->
<!--        <a-form-item
        label="项目编号"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.platform_no" placeholder="请输入项目编号"/>
      </a-form-item> -->
<!--      <a-form-item
        label="项目ID"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.platform_id" placeholder="请输入项目ID"/>
      </a-form-item> -->
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
            <div v-if="detail.longitude && detail.latitude">
              <span>经度：{{detail.longitude}}</span>
              <span class="ml10">纬度：{{detail.latitude}}</span>
            </div>
            <div v-else style="color:red">*暂无定位匹配，请重新输入</div>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        label="项目地址"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 14,xs:24}"
        :required="true"
      >
        <a-row>
          <a-col :md="12" :xs="24">
            <a-input v-model="detail.address" placeholder="请输入项目地址"/>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        label="微信app_id"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.app_id" placeholder="请输入微信app_id"/>
      </a-form-item>
      <a-form-item
        label="微信secret"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.secret" placeholder="请输入微信secret"/>
      </a-form-item>
     <a-form-item
        label="项目接口url"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.app_url" placeholder="请输入项目接口url"/>
      </a-form-item>
      <a-form-item
        label="微信小程序appid"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.mini_appid" placeholder="请输入微信小程序appid"/>
      </a-form-item>
      <a-form-item
        label="微信小程序秘钥"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.mini_secret" placeholder="请输入微信小程序秘钥"/>
      </a-form-item>
      <a-form-item
        label="支付商户号"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.mch_id" placeholder="请输入支付商户号"/>
      </a-form-item>
      <a-form-item
        label="微信支付签名秘钥"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="detail.pay_key" placeholder="请输入微信支付签名秘钥"/>
      </a-form-item>

        <a-form-item
          :wrapper-col="{offset:4,md: 12 ,xs:24}"
        >
          <a-button @click="HanderSubmit" type="primary">提交</a-button>
          <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
        </a-form-item>
      <div>

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
    </div>
</template>

<script>
import fetch from '@/api/fetch';
import Server from '@/config/server';
import UploadImage from '@C/upload/UploadImage';
import helper from '@/utils/helper';
import {
  mapState,
  mapActions,
} from 'vuex';
import AMap from 'AMap';

export default {
  components: {
    UploadImage,
  },
  computed: {
    ...mapState({
      accountList: state => state.project.accountlists,
      detail: state => state.project.detail,
    }),

    // this.listMixData = this.listData
  },
  data() {
    return {
      confirmSltAddr: '',
      formItem: {
        platform_name: '',
        admin_id: undefined,
        address: '',
        type: 'normal',
        longitude: '', // 经度
        latitude: '', // 纬度
        app_id: '',
        secret: '',
        app_url: '',
        mini_appid: '',
        mini_secret: '',
        mch_id: '',
        pay_key: '',
      },
      id: 0,
      // accountList:[]
      items: {
        per_page: 10000,
        is_gm: 0,
      },
      cityLocation: '',
      lnglat: [116.397428, 39.90923],
      zoom: 19,
      selectAddress: '',
      selectLngLat: '',
      visible: false,
      sltAddr: '',
      sltLng: '',
      sltLat: '',
    };
  },
  methods: {
    ...mapActions({
      accountLists: 'project/accountLists',
      getDetail: 'project/getDetail',
      setDetail: 'project/setDetail',
    }),
    showModal() {
      this.visible = true;
      this.searchAddressMethod();
    },
    handleOk() {
      // this.detail.address = this.sltAddr;
      this.confirmSltAddr = this.sltAddr;
      this.detail.longitude = this.sltLng;
      this.detail.latitude = this.sltLat;
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
    HanderSubmit() {
      this.init();
      if (this.id > 0) {
        fetch.post(Server.action.platformUpdate, this.formItem)
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              helper.showSuccess(res.data.message);
            } else {
              helper.showError(res.data.message);
            }
          });
      } else {
        fetch.post(Server.action.platformAdd, this.formItem)
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              helper.showSuccess(res.data.message);
            } else {
              helper.showError(res.data.message);
            }
          });
      }
    },
    getAccountList() {
      this.accountLists({
        obj: this.items,
      });
      // fetch.get(Server.action.adminuserLists,{this.items})
      //  .then((res) => {
      //      if (res.data.code === 0) {
      //         this.accountList=res.data.result.lists.data;
      //    }else{
      //      helper.showError(res.data.message);
      //    }
      //  });
    },
    init() {
      this.id = this.detail.gm_id;
      this.formItem = {
        gm_id: this.detail.gm_id,
        platform_name: this.detail.platform_name,
        address: this.detail.address,
        admin_id: this.detail.admin_id,
        type: 'normal',
        longitude: this.detail.longitude,
        latitude: this.detail.latitude,
        app_id: this.detail.app_id,
        secret: this.detail.secret,
        app_url: this.detail.app_url,
        mini_appid: this.detail.mini_appid,
        mini_secret: this.detail.mini_secret,
        mch_id: this.detail.mch_id,
        pay_key: this.detail.pay_key,
      };
    },
  },
  mounted() {
    // this.searchAddressMethod();
    this.getAccountList();
    if (this.$route.params.id > 0) {
      console.log(this.$route.params.id);
      this.id = this.$route.params.id;
      this.getDetail(this.$route.params.id);
    // this.init();
    } else {
      this.setDetail();
    }
  },
  watch: {
    detail(){
      this.confirmSltAddr = this.detail.address;
    }
  },
};
</script>

<style scoped lang="stylus">
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
