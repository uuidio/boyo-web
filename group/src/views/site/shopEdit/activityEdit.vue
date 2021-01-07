<template>
  <div class="content ">
    <div class="titleConfig mb20">
      页面标题设置：
      <a-input style="width: 50%;" v-model="headerTitle" placeholder="请输入页面标题" />
    </div>
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
              <div @click="itemClick(index,item)" v-if="item.id != 'headerTitle'" :class="{'active':item.isEdit?'action':'','shop_item':true}">
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
        <component :is="'edit'+items.id" :editIndex="items.index"></component>
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
  import {
    Swipers, editSwipers,GrapNav,editGrapNav,goodGroup,editgoodGroup,CustomImg,editCustomImg,Title,editTitle,Navs,editNavs
  } from '../shopConfig/shopConfig';


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
      Title,
      editTitle,
      Navs,
      editNavs
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
        headerTitle: '',
        module_lists: [
          {
            label: '轮播',
            value: 'Swipers',
          },
          {
            label: '模块标题',
            value: 'Title',
          },
          {
            label: '图片专区',
            value: 'CustomImg',
          },
          {
            label:'商品分组',
            value:'goodGroup'
          }
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
      submit(){
        if(this.headerTitle === ''){
          this.$message.warning('请输入活动页面标题');
          return
        }
        let newData = JSON.parse(JSON.stringify(this.shop_list))//拷贝数组，解决保存后页面 goodGroup商品组件 数据显示异常
        for(let i = 0;i<newData.length;i++){
          if(newData[i].id=='goodGroup'){
            let arr = []
            for(let j=0;j<newData[i].options.length;j++){
              arr.push(newData[i].options[j].id)
            }
            newData[i].options = arr
          }
          if(newData[i].id=='headerTitle'){
            newData[i].title = this.headerTitle
          }
        }
        console.log(newData);
         const params = {
           page:'custom_activity',
           value:newData,
         }
        console.log(JSON.stringify(params))
        this.setCustomItems({
          params:params
        })
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
        if(index>=1){
          this.shop_list[index - 1].isEdit = true;
          this.selectIndex = index - 1;
          this.items.edit = true;
          this.items.id =  this.shop_list[index-1].id;
          this.items.index = index-1;
          this.shop_list.splice(index,1);
        } else{
          this.shop_list.splice(index,1);
          this.items.edit = false;
        }

        window.event.stopPropagation();
      },
      itemClick(index, item) {
        console.log(this.shop_list);
        this.editFalse();
        this.shop_list[index].isEdit = true;
        this.items.edit = true;
        this.items.id = item.id;
        this.items.index = index;
      },
      addModule(value) {
        this.editFalse();
        if(value=='Shop'){
          this.shop_list.push({
            id: value,
            options: [//默认大图单行一个
              {url:''},
              {url:''},
              {url:''}
            ],
            isEdit: true,
            config: {
              list_num:1,//一行几个
              mag:0,//边距
              pad:0,//间距
              botm:0,//底部样式
              redius:0//是否圆角
            },
          });
        }
        else if(value=='CustomImg'){
          this.shop_list.push({
            id: value,
            options: [
            ],
            isEdit: true,
            config: {
              list_num:1,
              r:0,
              p:0,
              m:0,
              boxR:0,
              background:'transparent'
            },
          });
        }
        else if(value=='GrapNav'){
          this.shop_list.push({
            id: value,
            options: [
              {url:'',title:'导航一'},
              {url:'',title:'导航二'},
              {url:'',title:'导航三'},
              {url:'',title:'导航四'}
            ],
            isEdit: true,
            config: {
              nav:0,//默认图文导航
              m:0,
              r:0,
              backColor:'#ffffff',//背景颜色
              wordColor:'block'//文字颜色
            },
          });

        }
        else if(value=='Context'){
          this.shop_list.push({
            id: value,
            options: [
              {context:''},
            ],
            isEdit: true,
            config: {
              direction:'left',//文字方向，默认居左
              size:14,//文字大小，默认中
              backColor:'#ffffff',//背景颜色
              wordColor:'block'//文字颜色
            },
          });
        }else if(value=='Title'){
          this.shop_list.push({
            id: value,
            options: [{
              main_title:'',//主标题
              vice_title:'',//副标题
              date:'',//日期
              author:'',//作者
              link_addr:''//链接地址
             },
            ],
            isEdit: true,
            config: {
              mT: 0,
              mL: 0,
              subTemp:0,//默认传统样式
              direction:'left',//文字方向，默认居左
              backColor:'transparent',//背景颜色
            },
          });
        }else if(value=='RichText'){
          this.shop_list.push({
            id: value,
            options: [
              {
                context:'',//文本
              },
            ],
            isEdit: true,
            config: {
              backColor:'#ffffff',//背景颜色
              isFull:false
            },
          });
        }else if(value=='Magic_cube'){
          this.shop_list.push({
            id: value,
            options: [{url:''},{url:''}],
            isEdit: true,
            config: {
              selectIndex:2,//默认模板为2
              mag:0,//页面间距
              pad:0//图片间隙
            },
          });

        }else if(value=='goodGroup'){
          this.shop_list.push({
            id: value,
            type:1,
            options: [
            ],
            isEdit: true,
            config: {
              list_num:2,//一行几个
              m:0,
              r:0,
              shop_type:'',
              urlType:'',
              value:'',
            },
          });
        }
        else{
          this.shop_list.push({
            id: value,
            options: [],
            isEdit: true,
            config: {
              m:0,
              r:0,
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
      shop_list(data) {
        data.forEach(item => {
          if (item.id == "headerTitle") {
            // 页面标题设置数据回填
            this.headerTitle = item.title
          }
        });
      }
    },
    mounted() {
      this.getCustomItems('custom_activity')
    },
  };
</script>

<style scoped lang="stylus">
  .titleConfig
    width 100%

  .module_box p
    margin-bottom 15px

  .editHome
    display flex
    position relative

  .module_lists li:not(:nth-child(3n))
    margin-right 5%

  .shop_box
    overflow-y scroll
    height 600px
    padding 12px
    border 1px solid #e8e8e8
    background #fff
    /*position relative*/
    /*overflow hidden*/

    .shop_box_scroll
      width 320px
      background #f8f8f8
      border 1px solid #ccc

      // height: 600px;
      // overflow-y scroll
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
