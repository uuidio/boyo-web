<template>
  <div class="ivu-upload" style="margin-left: 5px" @click="getPics(1)">
    <div @click="selectAlbumPic">
      <slot></slot>
    </div>
    <a-modal
      width="80%"
      title="相册图片"
      v-model="visible"
      @ok="selectPicsOk"
    >
      <div class="selectImgBox">
        <ul>
          <li v-for="item in pics" @click="selectPic(item)" :key="item.id"
              :class="{'active': isSelected(item)}">
            <div class="imgBox">
              <img :src="item.pic_url" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="imgsPage" style="width: 100%;text-align:right">
        <a-pagination ref="page"
                      :total=page.total
                      :showTotal="total => `共 ${page.total} 条`"
                      :pageSize="page.page_size"
                      @change="getPics"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import Server from '@/config/server';
import fetch from '@/api/fetch';

export default {
  name: 'AlbumPics',
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
    };
  },
  methods: {
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
            message: 'Notice',
            description: '选择的图片数量已经超过限制，请删除后再选择',
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
