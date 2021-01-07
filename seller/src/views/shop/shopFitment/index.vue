<template>
  <div class="content" ref="content">
    <div class="fitment">
      <div class="tempLists">
        <div @click="addItem(item.id)" class="tag-box mb10" v-for="(item,index) in module_lists" :key="index">
          <div>
            <a-tag>{{item.value}}</a-tag>
          </div>
        </div>
      </div>
      <div class="shop_box">
        <div class="shop_box_scroll">
          <draggable :options="sortOptions" v-model="shop_list"
                     @update="datadragEnd"
                     style="position: relative"
          >
            <div class="item_box item" :key="index" v-for="(item,index) in shop_list">
              <div @click="itemClick(index,item)" :class="{'active':item.isEdit?'action':'','shop_item':true}">
                <div class="btns_box">
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
      <a-affix :offset-top="80" v-if="items.edit">
        <div class="edit_Box" style="overflow: auto;height:80vh;margin-left:10%">
          <component :is="'edit'+items.id" :editIndex="items.index"></component>
        </div>
      </a-affix>
    </div>
    <div class="mt20" style="border-top:1px solid #e7e7e7;padding-top:20px">
      <a-affix :offset-bottom="50">
        <a-button type="primary  ml10 mr20" @click="submit">保存设置</a-button>
<!--        <a-button class="btn-success" type="primary" @click="wipeCacheBtn">清除缓存</a-button>-->
      </a-affix>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable';
import fitments from './mixins/fitment';

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
        return this.$store.state.shop.customItems;
      },
      set(val) {
        this.$store.state.shop.customItems = val;
      },
    },
  },
  mixins: [fitments],
  components: {
    draggable,
  },
  data() {
    return {
      items: {
        edit: false,
        index: '',
        id: '',
      },
      sortOptions,
      module_lists: [
        {
          value: '商品组件',
          id: 'goodGroup',
        },
        {
          value: '图片专区',
          id: 'CustomImg',
        },
        {
          value: '轮播',
          id: 'Swipers',
        },
        {
          value: '图文导航',
          id: 'GrapNav',
        },
        {
          value: '商品轮播',
          id: 'GoodSwiper',
        },
      ],
    };
  },
  methods: {
    ...mapActions('shop', [
      'setCustomItems',
      'getCustomItems',
    ]),
    submit() {
      for (let i = 0; i < this.shop_list.length; i++) {
        if (this.shop_list[i].id === 'goodGroup' || this.shop_list[i].id === 'GoodSwiper') {
          const arr = [];
          for (let j = 0; j < this.shop_list[i].options.length; j++) {
            arr.push(this.shop_list[i].options[j].id);
          }
          this.shop_list[i].options = arr;
        }
      }
      const params = {
        page: 'shop_home',
        value: this.shop_list,
      };
      console.log(JSON.stringify(params));
      this.setCustomItems({
        params,
      });
    },
    addItem(value) {
      this.editFalse();
      if (value === 'goodGroup') {
        const obj = {
          id: 'goodGroup',
          options: [
          ],
          isEdit: true,
          config: {
            list_num: 2, // 一行几个
            mT: 0,
            mL: 0,
            r: 0,
          },
        };
        this.shop_list.push(obj);
      } else if (value === 'CustomImg') {
        this.shop_list.push({
          id: value,
          options: [
          ],
          isEdit: true,
          config: {
            list_num: 1,
            r: 0,
            p: 0,
            mT: 0,
            mL: 0,
            boxR: 0,
            is_space: 1,
            background: 'transparent',
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
            isNumber: 4,
            nav: 0, // 默认图文导航
            mT: 0,
            mL: 0,
            r: 0,
            p1: 0,
            p2: 0,
            backgournd: 'transparent', // 背景颜色
          },
        });
      } else if (value === 'GoodSwiper') {
        this.shop_list.push({
          id: value,
          options: [
          ],
          isEdit: true,
          config: {
            title: '',
            is_open: 1,
          },
        });
      } else {
        this.shop_list.push({
          id: value,
          options: [],
          isEdit: true,
          config: {
            mL: 0,
            mT: 0,
            r: 0,
          },
        });
      }
      this.$nextTick(() => {
        this.shop_list[this.shop_list.length - 1].isEdit = true;
      });
    },
    datadragEnd(e) {
      const item = this.ifEdit();
      this.itemClick(item[1], item[0]);
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
      console.log(this.items);
      this.items.edit = false;
      this.editFalse();
      this.items.id = item.id;
      this.items.index = index;
      this.shop_list[index].isEdit = true;
      this.$nextTick(() => {
        this.items.edit = true;
      });
    },
  },
  mounted() {
    this.getCustomItems({
      page: 'shop_home',
      type: 'tmpl',
    });
  },
};
</script>

<style scoped lang="stylus">
  .fitment
    display flex
  .tempLists
    padding 10px
    border 1px solid #e7e7e7
    width 30%
    margin-right 5%
    .tag-box
      cursor pointer
      margin-right 8px
      display inline-block
  .shop_box
    width 320px
    border 1px solid #e8e8e8
    background #f2f2f2

  .shop_box_scroll
    background #f8f8f8

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
  .edit_Box
    position: relative;
    right 0
    padding: 10px;
    min-height: 28px;
    background: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    min-width: 320px;
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
