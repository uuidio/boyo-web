<template>
    <div class="mr24">
      <a-card :bordered="false" title="营销方式说明">
        <div>
          门店级的促销方式，同一订单内，【特定】商品售价满【特定】金额【特定】会员可享受【特定】的折扣优惠，比如：满500享9折 ；该促销方式最多可同时设置5条满折区间规则； 该促销方式与优惠券不互斥，与其他互斥。
        </div>
      </a-card>
      <a-card :bordered="false">
        <div slot="title">
          <router-link to="/marketing/add_discount">
            <a-button type="primary" icon="plus">添加满折促销</a-button>
          </router-link>
        </div>
        <div>
          <a-table :scroll="{x:1100,y:700}" :columns="fields" :dataSource="dataLists">
            <div slot="action"  slot-scope="text, record">
              <a @click="goDetail(record)">查看</a>
              <a class="col-red ml10" @click="del(record)">删除</a>
			  <a class="col-red ml10" @click="stop(record)" v-if="record.status_text!='中止'">终止活动</a>
            </div>
          </a-table>
        </div>
      </a-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'fullminus',
  computed: {
    ...mapState({
      fields: state => state.marketing.activityField,
      dataLists: state => state.marketing.activityData,
    }),
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      activityLists: 'marketing/activityLists',
	  delActivity: 'marketing/delActivity',
	  stopActivity:"marketing/stopActivity",
    }),
    goDetail(item) {
      const jumpUrl = `/marketing/activity_show/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
    del(item) {
      if (confirm('确认删除该数据？')) {
        this.delActivity({ id: item.id, dataList: this.dataLists });
      }
	},
	stop(item){
			if(confirm('确认终止该活动？')){
            this.stopActivity({id:item.id})
          }
		}
  },
  mounted() {
    this.activityLists({
      shop_id: 1,
      type: 2,
    });
  },
};
</script>

<style scoped lang="stylus">
>>>.ant-card:not(:last-child)
  margin-bottom 24px
</style>
