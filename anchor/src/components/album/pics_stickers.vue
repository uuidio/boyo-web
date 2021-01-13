<template>
  <a-spin :spinning="spinning">
    <div class="ivu-upload spin-content" style="margin-left: 5px" @click="get_table_list(1)">
    <div @click="selectAlbumPic">
      <slot></slot>
    </div>
    <a-modal width="80%" title="相册图片" v-model="visible" @ok="selectPicsOk">

      <div class="selectImgBox">
        <ul>
          <li v-for="item in table_list" @click="selectPic(item)" :key="item.id" :class="{'active': isSelected(item)}">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="imgsPage" style="width: 100%;text-align:right">
        <div class="pageBox" v-if="table_list.length !== 0">
          <a-pagination :total="total_count" :showTotal="total_count => `共 ${total_count} 条数据`" :pageSize="20" v-model="table_param.page" @change="get_table_list"/>
        </div>
      </div>
<!--      页尾-->
      <template slot="footer">
        <div style="display:inline-block;margin-right: 60px;"><UploadImage @get_table_list="get_table_list" :maximum="999" :tag_id="61"><a-button slot="button"> <a-icon type="upload" /> 上传图片 </a-button></UploadImage></div>
<!--        <a-button type="prime" > 重命名</a-button>-->
        <a-button type="primary" @click="open_delete(selection)">删除</a-button>
        <a-button key="back" @click="visible = false"> 取消</a-button>
      </template>
    </a-modal>
  </div>
  </a-spin>
</template>
<script>
import Server from '@/config/server';
import fetch from '@/api/fetch';
import UploadImage from '@C/upload/Upload_stickers';

export default {
  name: 'AlbumPics',
  components: {
    UploadImage,
  },
  props: {
    isMultiple: Boolean,
    maximum: Number,
    shopId: Number,
  },
  data() {
    return {
      pics: [],
      visible: false,
      selection: [],
      page: {
        total: 20,
        current: 1,
        page_size: 20,
      },
      // 列表相关的代码------------------------------------------------------------------------------
      table_param: {
        page: 1, // 当前页面
        per_page: 20,
        tag_id: 61,
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [], // 表格数据
      spinning: false // 加载
    };
  },
  methods: {
    // 删除
    open_delete (row) {
      if(!row.length){_this.ok('请选择图片'); return}
      const _this = this
      this.$confirm({
        title: '是否确定删除该图片？',
        okText: '确定',
        cancelText: '取消',
        onCancel() {},
        onOk() {
          return new Promise((resolve, reject) => {
            _this.$fetch.post('v1/tag/image/delete', { id: row[0].id }).then((resData) => {
              _this.selection = []
              if (resData.data.code === 0) {
                if(_this.table_list.length==1){
                  _this.get_table_list(_this.table_param.page-1)
                } else {
                  _this.get_table_list()
                }
                _this.ok('操作成功');
                resolve()
              } else {
                reject(resData)
              }
            })
          }).catch(() => {
            _this.xx('操作失败');
          });
        },
      });
    },
    // 获取表格列表
    get_table_list(page) {
      let _this = this;
      this.spinning = true
      if(page){_this.table_param.page = page}
      this.$http.get('v1/tag/image/list', _this.table_param).then((resData) => {
        if (resData.code === 0) {
          _this.table_list = resData.result.lists.data
          _this.total_count = resData.result.lists.total
          _this.page_count = resData.result.lists.last_page
        }
        this.spinning = false
      });
    },
    getPics(current) {
      this.selection = [];
      fetch
        .get(Server.baseURL + Server.action.album_pics, {
          params: { page: current, shop_id: this.shopId },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.pics = res.data.result.data;
            this.page.total = res.data.result.total;
          }
        })
        .catch((error) => {
          this.$notification.error({
            message: 'Notice',
            description: error,
          });
        });
    },
    selectAlbumPic() {
      this.visible = true;
    },
    selectPic(item) {
      const index = this.selection.indexOf(item);
      if (index > -1) {
        this.selection.splice(index, 1);
      } else {
        if (this.isMultiple === false) {
          this.selection = [];
        }
        if (this.isMultiple && this.selection.length >= this.maximum) {
          this.$notification.warning({
            message: `选中图片最多为${this.maximum}张`,
            description: `再次点击取消选中`,
          });
          return;
        }
        this.selection.push(item);
      }
    },
    isSelected(item) {
      return this.selection && this.selection.indexOf(item) > -1;
    },
    selectPicsOk() {
      this.visible = false;
      this.$emit('selectOk', this.selection);
    },
  },
};
</script>
<style lang="stylus" scoped>

  .selectImgBox
    background: #fff
    padding: 0 10px 10px

    ul
      display: flex
      flex-wrap: wrap

    ul li
      width: 138px
      margin: 10px 5px 0px
      padding: 1px
      border: 1px solid #f2f2f2
      cursor: pointer
      position: relative

    ul li img
      display: block
      width: 100%

    ul li.active
      border: 1px solid #1890ff

    ul li.active::before
      content: ""
      width: 0
      height: 0
      position: absolute
      right: -2px
      bottom: -9.5px
      border-top: solid 14px transparent
      transform: rotate(45deg)
      border-left: solid 14px #1890ff
      border-bottom: solid 14px transparent

    ul li.active::after
      content: ''
      width: 12px
      height: 12px
      background: url("~@/assets/images/dui.png") no-repeat
      background-size: 100% 100%
      position: absolute
      right: 0
      bottom: 0

    /*@media screen and (min-width: 1000px)*/
    /*>>> .ivu-modal*/
    /*width: 800px !important*/
    @media (max-width: 575px)
      .selectImgBox ul li
        width: 33%;
        margin: 0;
        margin-bottom: 10px;

      .selectImgBox ul li:nth-child(2n)
        /*margin-left: 2%;*/
      .selectImgBox
        padding: 0;

      .imgsPage
        text-align left !important

      >>> .ant-pagination-item, >>> .ant-pagination-prev, >>> .ant-pagination-next
        margin-bottom 5px

      >>> .ant-modal-body
        padding 10px
</style>
