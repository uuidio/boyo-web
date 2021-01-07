<template>
  <div class="mr24">
    <a-form>
      <a-form-item>
        <a-card title="设置秒杀活动信息" :bordered="false">
          <div class="coupon-name">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                秒杀活动名称：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                {{formItem.activity_name}}
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                秒杀活动描述：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                {{formItem.activity_desc}}
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="设置规则" :bordered="false">
          <div class="items">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                活动报名日期：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
               {{formItem.apply_begin_time}} ~ {{formItem.apply_end_time}}
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                活动生效日期：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
              {{formItem.start_time}} ~ {{formItem.end_time}}
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                秒杀活动标签：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                {{formItem.activity_tag}}
              </a-col>
            </a-row>
            <!--<a-row type="flex" align="middle">-->
              <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
                <!--店铺报名商品限制数量：-->
              <!--</a-col>-->
              <!--<a-col :xs="{span:24}" :md="{span:7,offset:1}">-->
                <!--{{formItem.enroll_limit}}-->
              <!--</a-col>-->
            <!--</a-row>-->
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                是否启用活动：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
               {{formItem.enabled===1?'是':'否'}}
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-form-item>

    </a-form>
    <a-card title="已参加活动商品" :bordered="false">
		<template v-if="fields&&fields.length>0">
      <a-table :scroll="{ x: 1400,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
        <div slot="goods_image" slot-scope="text, record">
          <img :src="text" height="70px" alt="">
        </div>
        <div slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确认停止该商品秒杀活动?"
            @confirm="stop(record)"
            okText="确认"
            cancelText="取消"
            v-if="record.verify_status!==3"
          >
            <a>停止商品秒杀活动</a>
          </a-popconfirm>
          <div v-else>已停止该商品秒杀</div>
        </div>
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="1"
          @change="pageChange"
        />
      </div>
		</template>
    </a-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'add',
    components: {
    },
    computed: {
      ...mapState({
        detail: state => state.seckill.seckillDetail,
        fields: state => state.seckill.seckillGoodsField,
        dataLists: state => state.seckill.seckillGoodsDataLists,
        pages: state => state.seckill.seckillGoodsPages,
      }),
    },
    data() {
      return {
        formItem: {
          activity_name: '',
          activity_desc: '',
          apply_begin_time: '',
          apply_end_time: '',
          start_time: '',
          end_time: '',
          enroll_limit: '',
          enabled: 1,
          activity_tag:''
        },
      };
    },
    methods: {
      ...mapActions({
        getDetail: 'seckill/getSeckillDetail',
        getSeckillGoods: 'seckill/getSeckillGoods',
        shelvesGood: 'seckill/shelvesGood',
      }),
      stop(item){
        const params = {
          verify_status:3,
          id:item.id,
        }
        this.shelvesGood({params:params})
      },
      init(){
        const detail = this.detail.secKillApplie
        this.formItem = {
          activity_name:detail.activity_name,
          activity_desc: detail.activity_desc,
          apply_begin_time:detail.apply_begin_time,
          apply_end_time: detail.apply_end_time,
          start_time: detail.start_time,
          end_time:detail.end_time,
          enroll_limit:detail.enroll_limit,
          enabled: detail.enabled,
          activity_tag:detail.activity_tag
        }
      },
      pageChange(page){
        this.getSeckillGoods({
          id:this.$route.params.id,
          page:page,
          show_act_status:1
        })
      }
    },
    mounted() {
      this.getDetail({
        id:this.$route.params.id
      })
      this.getSeckillGoods({
        id:this.$route.params.id,
        page:1,
        show_act_status:1
      })
    },
    watch:{
      detail(){
        this.init()
      }
    }
  };
</script>

<style scoped lang="stylus">
  >>> .coupon-name .ant-row-flex:not(:last-child), .items .ant-row-flex:not(:last-child)
    margin-bottom 15px

  >>> .mj-input
    width 140px
    margin 0 10px

  >>> .ant-calendar-picker
    width 100% !important

  >>> .btn-item
    text-align center

    .ant-form-item-children button:last-child
      margin-left 20px

  .item-lists
    margin-top 10px

  li
    border 1px solid #efefef

    >>> .ant-row-flex > div
      padding 8px
      vertical-align middle

      .goods-item
        display flex

      .imgBox
        width 60px
        margin-right 15px

        img
          width 60px

  @media screen and (min-width: 768px)
    >>> .ant-col-md-3
      text-align right

    .reduction
      display inline-block
</style>
