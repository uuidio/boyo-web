<template>
  <div class="content ">
    <p class="mb10">*挂件原型按照750设计图配置，既配置的值（例如10px）在小程序上等到的值的是设置的值除于2</p>
    <div class="editHome">
      <div class="module_lists">
        <div class="module_box">
          <p>基础组件</p>
          <ul>
            <li :key="index" v-for="(item,index) in module_lists">
              <div @click="addModule(item.value)" class="tag">{{item.label}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shop_box">
        <div class="shop_box_scroll">
          <draggable :options="sortOptions" v-model="shop_list"
                     @update="datadragEnd"
                     style="position: relative"
                     @start="start"
          >
            <div class="item_box item" :key="index" v-for="(item,index) in shop_list">
              <div @click="itemClick(index,item)" :class="{'active':item.isEdit?'action':'','shop_item':true}">
                <div class="btns_box">
                  <div class="item_add_icon up_add">
                    <em-icon type="icon-plus-circle"></em-icon>
                  </div>
                  <div class="item_add_icon down_add">
                    <em-icon type="icon-plus-circle"></em-icon>
                  </div>
                  <div class="item_del" @click="itemDel(index)">
                    <em-icon type="icon-close-circle"></em-icon>
                  </div>
                </div>
                <component :config="item.config" :is="item.id" :dataLists="item.options"></component>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="edit_Box" v-if="items.edit">
        <component  :is="'edit'+items.id" :editIndex="items.index"></component>
      </div>
    </div>
    <div class="mt20" style="border-top:1px solid #e7e7e7;padding-top:20px">
      <a-button  type="primary" @click="submit">保存设置</a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable';
import { Swipers, editSwipers, GrapNav, editGrapNav, goodGroup, editgoodGroup, CustomImg, editCustomImg, Title, editTitle, editGoodSwiper, GoodSwiper, editSlideNav, SlideNav,ActivityGroup,editActivityGroup,editTetris,Tetris,editSpecial,Special,GroupTemp,editGroupTemp } from '../shopConfig/shopConfig';

const sortOptions = {
  animation: 500,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  draggable: '.item',
};
export default {
  computed: {
    shop_list: {
      get() {
        return this.$store.state.custom.customItems;
      },
      set(val) {
        this.$store.state.custom.customItems = val;
      },
    },
    // ...mapState({
    //   shop_list: state => state.custom.customItems,
    // }),
  },
  components: {
    draggable,
    Swipers,
    editSwipers,
    GrapNav,
    editGrapNav,
    goodGroup,
    editgoodGroup,
    CustomImg,
    editCustomImg,
    editTitle,
    Title,
    editGoodSwiper,
    GoodSwiper,
    editSlideNav,
    SlideNav,
    editActivityGroup,
    ActivityGroup,
    editTetris,
    Tetris,
    editSpecial,
    Special,
    editGroupTemp,
    GroupTemp,
  },
  data() {
    return {
      sortOptions,
      selectIndex: 0,
      items: {
        edit: false,
        index: '',
        id: '',
      },
      module_lists: [
        {
          label: '轮播',
          value: 'Swipers',
        },
        {
          label: '图文导航',
          value: 'GrapNav',
        },
        {
          label: '图片专区',
          value: 'CustomImg',
        },
        {
          label: '商品分组',
          value: 'goodGroup',
        },
        {
          label: '标题',
          value: 'Title',
        },
        {
          label: '商品轮播',
          value: 'GoodSwiper',
        },
        {
          label: '图文导航1',
          value: 'SlideNav',
        },
        {
          label: '活动分组',
          value: 'ActivityGroup',
        },
        {
          label: '俄罗斯方块',
          value: 'Tetris',
        },
        {
          label: '专题模块',
          value: 'Special',
        },
        {
          label: '分组专区',
          value: 'GroupTemp',
        },
        // {
        //   label:'视频专区',
        //   value:'TV'
        // },
        // {
        //   label:'贴吧专区',
        //   value:'TieBa'
        // }
      ],
      SetOptions: [
      ],
    };
  },
  methods: {
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
      getCustomItems: 'custom/getCustomItems',
    }),
    start(e) {
    },
    submit() {
      for (let i = 0; i < this.shop_list.length; i++) {
        if (this.shop_list[i].id === 'goodGroup' || this.shop_list[i].id === 'GoodSwiper') {
          let arr = []
          for (let j = 0; j < this.shop_list[i].options.length; j++) {
            arr.push(this.shop_list[i].options[j].id);
          }
          this.shop_list[i].options = arr;
        }
      }
      const params = {
        page: 'index_self',
        value: this.shop_list,
      }
      console.log(JSON.stringify(params))
      this.setCustomItems({
        params: params,
      });
    },
    ifEdit() {
      for (let i = 0; i < this.shop_list.length; i++) {
        if (this.shop_list[i].isEdit === true) {
          return [this.shop_list[i], i];
        }
      }
    },
    editFalse() {
      for (let i = 0; i < this.shop_list.length; i++) {
        this.shop_list[i].isEdit = false;
      }
    },
    itemDel(index) {
      if (index >= 1) {
        this.shop_list[index - 1].isEdit = true;
        this.selectIndex = index - 1;
        this.items.id = this.shop_list[index - 1].id;
        this.items.index = index - 1;
        this.shop_list.splice(index, 1);
      } else {
        this.shop_list.splice(index, 1);
        this.items.edit = false;
      }
      window.event.stopPropagation();
    },
    itemClick(index, item) {
      this.items.edit = false;
      this.editFalse();
      this.items.id = ''
      this.items.id = item.id;
      this.items.index = index;
      this.shop_list[index].isEdit = true;
      this.items.edit = true;
    },
    addModule(value) {
      this.editFalse();
      if (value === 'Shop') {
        this.shop_list.push({
          id: value,
          options: [ // 默认大图单行一个
            { url: '' },
            { url: '' },
            { url: '' }
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            list_num: 1, // 一行几个
            mag: 0, // 边距
            pad: 0, // 间距
            botm: 0, // 底部样式
            redius: 0, // 是否圆角
          },
        });
      } else if (value === 'CustomImg') {
        this.shop_list.push({
          id: value,
          options: [
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            list_num: 1,
            r: 0,
            pL: 0,
            pR: 0,
            pT: 0,
            pB: 0,
            mL: 0,
            mR: 0,
            mT: 0,
            mB: 0,
            boxR: 0,
            background: 'transparent',
            imgType: 'none',
          },
        });
      } else if (value === 'GoodSwiper') {
        this.shop_list.push({
          id: value,
          options: [
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            title: '',
            is_open: 1,
          },
        });
      } else if (value === 'GrapNav') {
        this.shop_list.push({
          id: value,
          options: [
            { url: '', title: '导航一' },
            { url: '', title: '导航二' },
            { url: '', title: '导航三' },
            { url: '', title: '导航四' },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            nav: 0, // 默认图文导航
            mT: 0,
            mL: 0,
            r: 0,
            pT: 0,
            pL: 0,
            wordColor: '',
            backgournd: 'transparent', // 背景颜色
            is_mini: false,
          },
        });
      } else if (value === 'SlideNav') {
        this.shop_list.push({
          id: value,
          options: [
            { url: '', title: '导航一', active: true },
            { url: '', title: '导航二', active: false },
            { url: '', title: '导航三', active: false },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            nav: 0, // 默认图片导航
            pL: 0,
            pR: 0,
            pT: 0,
            pB: 0,
            mL: 0,
            mR: 0,
            mT: 0,
            mB: 0,
            wordColor: '#333333',
            wordActiveColor: '#ff0000',
            backgournd: '#f8f8f8', // 背景颜色
            is_mini: false,
          },
        });
      } else if (value === 'Context') {
        this.shop_list.push({
          id: value,
          options: [
            { context: '' },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            direction: 'left', // 文字方向，默认居左
            size: 14, // 文字大小，默认中
            backColor: '#ffffff', // 背景颜色
            wordColor: 'block', // 文字颜色
          },
        });
      } else if (value === 'Title') {
        this.shop_list.push({
          id: value,
          options: [{
            title: '',
          },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            subTemp: 0, // 默认传统样式
            pL: 0,
            pR: 0,
            pT: 0,
            pB: 0,
            mL: 0,
            mR: 0,
            mT: 0,
            mB: 0,
            boxR: 0,
            fontSize: '16',
            direction: 'left', // 文字方向，默认居左
            background: 'transparent', // 背景颜色
          },
        });
      } else if ( value === 'RichText') {
        this.shop_list.push({
          id: value,
          options: [
            {
              context: '', // 文本
            },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            backColor: '#ffffff', // 背景颜色
            isFull: false,
          },
        });
      } else if (value === 'Magic_cube') {
        this.shop_list.push({
          id: value,
          options: [{ url: '' }, { url: '' }],
          isEdit: true,
          config: {
            isFitUp: 1,
            selectIndex: 2, // 默认模板为2
            mag: 0, // 页面间距
            pad: 0, // 图片间隙
          },
        });
      } else if (value === 'goodGroup') {
        this.shop_list.push({
          id: value,
          options: [
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            list_num: 2, // 一行几个
            mT: 0,
            mL: 0,
            mR: 0,
            mB: 0,
            pT: 0,
            pR: 0,
            pB: 0,
            pL: 0,
            tR: 0,
            bR: 0,
            itemR: 0,
            background: '#f8f8f8',
            shop_type: '',
            urlType: '',
            value: '',
          },
        });
      } else if (value === 'ActivityGroup') {
        this.shop_list.push({
          id: value,
          options: [
            { url: '', main_title: '主标题1', title: '副标题1', countDown: false, urlType: '', value: '', mTitCol: '#333333', titCol: '#C06FFA', shop_type: '', goodsList: [] },
            { url: '', main_title: '主标题2', title: '副标题2', countDown: false, urlType: '', value: '', mTitCol: '#333333', titCol: '#FF173E', shop_type: '', goodsList: [] },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            mT: 0,
            mL: 0,
            mR: 0,
            mB: 0,
            pT: 0,
            pR: 0,
            pB: 0,
            pL: 0,
            r: 0,
            background: '#ffffff',
            shop_type: '',
            urlType: '',
            value: '',
          },
        });
      } else if(value ==='Tetris'){
        this.shop_list.push({
          id: value,
          options: [],
          isEdit: true,
          config: {
            isFitUp: 1,
            template:0,//模板类型
            radius:10,
            mg:0,//上下边距
            pd:0,
            md:0,
          },
        });
      } else if(value ==='Special'){
        this.shop_list.push({
          id: value,
          options: [],
          isEdit: true,
          config: {
            isFitUp: 1,
            template:0,//下方图片导航类型
            radius:10,
            md:0,//导航上外边距
            mg:0,//导航下外边距
            pd:0,//导航内边距
            xd:0,//图片间距
            vd:0,//组件外边距
            nav_img:{
              image_url:'',
              link_type:'',
              link_value:''
            }
          },
        });
      } else if(value==='GroupTemp'){
        this.shop_list.push({
          id: value,
          options: [
            { url: '', main_title: '主标题1', title: '副标题1', countDown: false, urlType: '', value: '', mTitCol: '#333333', titCol: '#C06FFA', shop_type: '', goodsList: [] ,ant_title:'更多拼团'},
            { url: '', main_title: '主标题2', title: '副标题2', countDown: false, urlType: '', value: '', mTitCol: '#333333', titCol: '#FF173E', shop_type: '', goodsList: [],ant_title:'更多秒杀' },
          ],
          isEdit: true,
          config: {
            isFitUp: 1,
            mT: 0,
            mL: 0,
            mR: 0,
            mB: 0,
            pT: 0,
            pR: 0,
            pB: 0,
            pL: 0,
            r: 0,
            background: '#ffffff',
            shop_type: '',
            urlType: '',
            value: '',
          },
        },)
      } else {
        this.shop_list.push({
          id: value,
          options: [],
          isEdit: true,
          config: {
            isFitUp: 1,
            mL: 0,
            mT: 0,
            pL: 0,
            pT: 0,
            r: 0,
            background: 'transparent',
          },
        });
      }
      this.shop_list[this.shop_list.length - 1].isEdit = true;
      this.selectIndex = this.shop_list.length - 1;
    },
    datadragEnd(e) {
      const item = this.ifEdit();
      this.itemClick(item[1], item[0]);
    },
  },
  watch: {
    items() {
      console.log(this.items);
    },
  },
  mounted() {
    this.getCustomItems('index_self');
  },
};
</script>

<style scoped lang="stylus">
  .module_box p
    margin-bottom 15px

  .editHome
    display flex
    position relative

  .module_lists li:not(:nth-child(3n))
    margin-right 5%

  .shop_box
    width 320px
    border 1px solid #e8e8e8
    background #f2f2f2
    /*height 600px*/
    /*position relative*/
    /*overflow hidden*/

    .shop_box_scroll
      background #f8f8f8
      /*background url('../../../assets/phone_bg.png')*/
      /*background-size 100% 100%*/
      /*padding 50px 22px 0*/
      /*width 100%*/
      /*height 100%*/
      /*overflow-y scroll*/

      &::-webkit-scrollbar
        display: none;

  .item_box
    position relative

  &::before
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    pointer-events: none;

  &.active::before, .shop_item:hover::before
    z-index: 2;
    display: block;
    border: 1px dashed #38f;

  .sortable-ghost
    opacity 0

  .btns_box
    width 100%
    height 100%
    position absolute
    z-index 5

  .btns_box:hover .item_add_icon, .btns_box:hover .item_del
    display block

  .item_add_icon
    font-size 20px
    position absolute
    color #38f
    z-index 99
    display none

  .up_add
    top 0
    left 50%
    transform translate(-50%, -17px)

  .down_add
    bottom 0
    left 50%
    transform translate(-50%, 17px)

  .item_del
    position absolute
    right -10px
    top -18px
    color #666
    z-index 4
    font-size 20px
    display none

  .module_lists
    margin-right 50px
    padding 10px
    width 300px
    border 1px solid #e8e8e8

    ul
      display flex
      flex-wrap wrap

      li
        width 30%
        margin-bottom 5%

    .tag
      color #666
      cursor pointer
      width 100%
      text-align center
      border 1px dashed #e5e5e5
      line-height 30px
      padding 0
      background #f8f8f8
      border-radius 3px
      box-sizing border-box
      font-size 14px

      &:hover
        background: #e8f7fd;
        border-color: #bdf;
        color: #38f;

  .edit_Box
    position: relative;
    right 0
    padding: 10px;
    min-height: 28px;
    background: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    width: 420px;
    margin-left: 20px;
    font-size: 12px;
    box-sizing: border-box;
    z-index: 5;

    .title
      margin-bottom 10px
      padding-bottom 10px
      border-bottom 1px solid #e8e8e8
      font-size 14px
</style>
