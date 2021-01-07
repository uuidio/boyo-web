<template>
  <div class="content editHome">
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
      <component :is="'edit'+items.id"  :editIndex="items.index"></component>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable';
import Tag from 'vant/lib/tag';
import {
  Swipers, Navs, editSwipers, editNavs,
} from '../shopConfig/shopConfig';
import 'vant/lib/tag/style';


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
    Tag,
    draggable,
    Swipers,
    Navs,
    editSwipers,
    editNavs,
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
          label: '图片广告',
          value: 'Swipers',
        },
        {
          label: '导航',
          value: 'Navs',
        },
      ],
      SetOptions: [
        {
          id: 'Swipers',
          options: [],
          isEdit: false,
          config: {},
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
    start(e) {
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

    },
    itemClick(index, item) {
      this.editFalse();
      this.shop_list[index].isEdit = true;
      this.items.edit = true;
      this.items.id = item.id;
      this.items.index = index;
    },
    addModule(value) {
      this.editFalse();
      this.shop_list.push({
        id: value,
        options: [],
        isEdit: true,
        config: {
        },
      });
      console.log(value);
      this.shop_list[this.shop_list.length - 1].isEdit = true;
      this.selectIndex = this.shop_list.length - 1;
    },
    datadragEnd(e) {
      const item = this.ifEdit();
      this.itemClick(item[1], item[0]);
    },
  },
  watch: {
    shop_list() {
      this.setCustomItems(this.shop_list);
    },
  },
  mounted() {
    this.setCustomItems(this.SetOptions);
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
    /*height 600px*/
    /*position relative*/
    /*overflow hidden*/

    .shop_box_scroll
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
    padding: 15px;
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
