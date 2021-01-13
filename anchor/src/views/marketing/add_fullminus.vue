<template>
    <div class="mr24">
      <a-form>
        <a-form-item>
        <a-card title="设置规则名称" :bordered="false">
          <div class="coupon-name">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                名称：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-input v-model="formItem.name" />
              </a-col>
            </a-row>

          </div>
        </a-card>
      </a-form-item>
        <a-form-item>
          <goodsCard @get-goods="getItem"></goodsCard>
        </a-form-item>
        <a-form-item>
          <a-card title="设置规则" :bordered="false">
            <div class="items">
              <a-row>
                <a-col :xs="{span:24}" :md="{span:3}" class="add-label first-label">
                  促销规则：
                </a-col>
                <a-col :xs="{span:24}" :md="{span:20,offset:1}">
                  <div class="rule-btn">
                    <a-button v-if="routerIndex==1" icon="plus" @click="addRule">添加满减规则</a-button>
                    <a-button v-if="routerIndex==1" @click="addOverRule" style="margin-left: 10px">设置叠加满减规则</a-button>
                    <a-button v-else icon="plus" @click="addRule">添加满折规则</a-button>
                  </div>
                  <div v-if="routerIndex==1">
                    <div  class="rule-item" v-for="(item,index) in formItem.rule">
                      消费满 <a-input v-model="item.condition" min="1" type="number" style="width:90px" /> 减 <a-input v-model="item.num"  type="number"  min="1" style="width:90px" />
                      <a @click="delRule(index)" v-if="index!==0"> 删除</a>
                    </div>
                  </div>
                  <div v-else>
                    <div  class="rule-item" v-for="(item,index) in formItem.rule">
                      消费满 <a-input v-model="item.condition" min="1" type="number" style="width:90px" /> 支付原价的 <a-input v-model="item.num"  type="number"  min="1" style="width:90px" /> % 价格购买
                      <a @click="delRule(index)" v-if="index!==0"> 删除</a>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                  规则描述：
                </a-col>
                <a-col :xs="{span:24}" :md="{span:20,offset:1}">
                  <a-input :rows="3" v-model="formItem.desc" type="textarea" />
                </a-col>
              </a-row>
              <!--<a-row type="flex" align="middle">-->
                <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
                  <!--适用平台：-->
                <!--</a-col>-->
                <!--<a-col :xs="{span:24}" :md="{span:8,offset:1}">-->
                  <!--<a-checkbox-->
                    <!--@change="onCheckAllChange2"-->
                    <!--:checked="checkAll2"-->
                  <!--&gt;-->
                    <!--全选-->
                  <!--</a-checkbox>-->
                  <!--<a-checkbox-group :options="channelOptions" v-model="checkedChannel" @change="onChange2" />-->
                <!--</a-col>-->
              <!--</a-row>-->
              <!--<a-row type="flex" align="middle">-->
                <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
                  <!--适用会员：-->
                <!--</a-col>-->
                <!--<a-col :xs="{span:24}" :md="{span:8,offset:1}" >-->
                  <!--<a-checkbox-->
                    <!--@change="onCheckAllChange"-->
                    <!--:checked="checkAll"-->
                  <!--&gt;-->
                    <!--全选-->
                  <!--</a-checkbox>-->
                   <!--<a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />-->
                <!--</a-col>-->
              <!--</a-row>-->
              <a-row type="flex" align="middle">
                <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                  有效期：
                </a-col>
                <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                  <a-range-picker
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    @change="timeChange"
                  />
                </a-col>
              </a-row>
              <a-row type="flex" align="middle">
                <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                  与积分抵扣同享：
                </a-col>
                <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                  <a-radio-group v-model="formItem.is_use_point"  name="radioGroup">
                    <a-radio :value="0">否</a-radio>
                    <a-radio :value="1">是</a-radio>
                  </a-radio-group>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-form-item>
        <a-form-item class="btn-item">
          <a-button type="primary" @click="submitData" size="large" :disabled="is_submit">保存</a-button>
          <a-button  size="large" @click="goback">取消</a-button>
        </a-form-item>
      </a-form>
      <a-modal title="叠加满减规则" v-model="overRuleVisible" @ok="overRuleOk">
        消费满 <a-input-number v-model="overRule.condition" :min='1' style="width:90px" /> 减 <a-input-number v-model="overRule.num"   :min='1' style="width:90px" @change="numChange"/>，满减上限 <a-input-number v-model="overRule.doubling" placeholder='优惠倍数金额'  :min='1' style="width:120px"  :disabled="overRule.num == ''"/>
      </a-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import goodsCard from './components/goodsCard'
const plainOptions = ['普通会员', 'SVIP会员', 'VIP会员'];
const channelOptions = ['app端', 'wap端', 'pc端'];
export default {
  name: 'add',
  components: {
    goodsCard,
  },
  data() {
    return {
      is_submit:false,
      checkAll: false,
      checkAll2: false,
      overRuleVisible:false,
      plainOptions,
      channelOptions,
      checkedChannel: [],
      routerIndex: 1,
      checkedList: [],
      formItem: {
        name: '',
        desc: '',
        type: 1,
        limit_goods: [],
        user_type: [],
        is_bind_goods:0,
        star_time: '',
        end_time: '',
        is_use_point: 1,
        rule: [
          {
            condition: '',
            num: '',
          },
        ],
        channel: [],
      },
      overRule:{
        condition:'',
        num:'',
        doubling:'',
      }
    };
  },
  methods: {
    ...mapActions({
      addActivity: 'marketing/addActivity',
    }),
    getItem(item){
      if(item.length===0){
        this.formItem.is_bind_goods = 0
      }else{
        this.formItem.is_bind_goods = 1
      }
      this.formItem.limit_goods = item
      console.log(this.formItem)
    },
    addRule() {
      this.formItem.rule.push({
        condition: '',
        num: '',
      });
    },
    addOverRule(item){
      this.overRuleVisible = true;
    },
    overRuleOk(){
      let over = this.overRule;
      if ( over.num > over.condition) {
        this.$notification.error({message: '优惠金额要大于满减金额'});
        return false;
      }
      if ( over.doubling < over.num) {
        this.$notification.error({message: '满减上限金额要大于优惠金额'});
        this.overRule.doubling = over.num;
        return false;
      }
      let yushu = over.doubling % over.num;
      if (yushu !== 0) {
        this.overRule.doubling = over.doubling - yushu;
        this.$notification.error({message: '满减上限金额与优惠金额是倍数关系'});
        return false;
      }
      let rule = [];
      for (var i = 0; i < over.doubling/over.num ; i++) {
        rule.push({
          condition: over.condition*(i+1),
          num: over.num*(i+1),
        })
        // Things[i]
      }
      console.log(rule)
      this.formItem.rule = [];
      this.formItem.rule = rule;
      this.overRuleVisible = false;
    },
    numChange(value){
      this.overRule.doubling = value;
    },
    delRule(index) {
      this.formItem.rule.splice(index, 1);
    },
    timeChange(dates, dateStrings) {
      this.formItem.star_time = dateStrings[0];
      this.formItem.end_time = dateStrings[1];
    },
    onChange(checkedList) {
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        checkAll: e.target.checked,
      });
    },
    onChange2(checkedChannel) {
      this.checkAll2 = checkedChannel.length === channelOptions.length;
    },
    onCheckAllChange2(e) {
      Object.assign(this, {
        checkedChannel: e.target.checked ? channelOptions : [],
        checkAll2: e.target.checked,
      });
    },
    submitData() {
      this.is_submit=true
      this.formItem.user_type = this.checkedList;
      this.formItem.channel = this.checkedChannel;
      if (this.formItem.limit_goods.length == 0) {
        this.formItem.is_bind_goods = 0;
      }
       console.log(this.formItem.limit_goods);
      this.addActivity({ formItem: this.formItem });
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.is_submit=false
        })
      },2000)
    },
    goback(){
      if(this.routerIndex==2){
         this.$router.push({path:'/marketing/discount'});
      }else{
          this.$router.push({path:'/marketing/fullminus'});
      }


    }
  },
  mounted() {
    if (this.$router.history.current.name == 'add_discount') {
      this.routerIndex = 2;
      this.formItem.type = 2;
    }
  },
};
</script>

<style scoped lang="stylus">

.rule-btn
  padding-bottom 10px
  border-bottom 1px solid #e8e8e8
.rule-item
  margin 10px 0
.first-label
 margin-top 5px
>>>.items .ant-row
  margin-bottom 15px
>>>.coupon-name .ant-row-flex:not(:last-child),.items .ant-row-flex:not(:last-child)
  margin-bottom 15px
>>>.mj-input
  width 140px
  margin 0 10px
>>>.ant-calendar-picker
  width 100%!important
>>>.btn-item
      text-align center
      .ant-form-item-children button:last-child
         margin-left 20px

</style>
