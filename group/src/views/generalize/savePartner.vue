<template>
  <div class="content">
     <div class="mb20">
        <span v-if="partner_role==1">推广员</span><span v-else>小店</span>：{{tel}}
     </div>
    <div class=" mb20" v-if="PartnerDetail.partner.nickname">
      <div class="fxBox1 mb10">
        该会员上级信息：
        <div class="fxBox1">
          <img style="width:40px;height:40px;border-radius: 50%;margin-right: 10px" :src="PartnerDetail.partner.headimgurl" alt="">
          <span>{{PartnerDetail.partner.nickname}}</span>
        </div>
      </div>
      <div>
        该会员上级手机号：{{PartnerDetail.partner.mobile}}
      </div>
    </div>
      <div class="fxBox1 mb20" v-else>
        该会员上级信息：暂无上级关系
    </div>
    <div class="fxBox1" v-if="partner_role!==''">
      修改会员上级：
        <memberLists :type="partner_role==1?1:2" @on-getid="getid">
          <div v-if="selectItem.mobile">修改为：{{selectItem.mobile}}</div>
          <a-button icon="plus" >
            选择上级
          </a-button>
      </memberLists>
    </div>
    <div class="mt20">
      <a-button @click="submit" type="primary">提交</a-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import memberLists  from '@C/member/lists'
  export default {
    inject: ['reload'],
    components:{
      memberLists
    },
    computed: {
      ...mapState({
        PartnerDetail: state => state.generalize.PartnerDetail,
      }),
    },
    data() {
      return {
        id:'',
        tel:'',
        selectItem:{},
        partner_role:''
      };
    },
    methods: {
      ...mapActions({
        getPartner: 'generalize/getPartner',
        changePartnersRelated: 'generalize/changePartnersRelated',
      }),
      getid(item){
        this.selectItem = item.item[0]
       console.log(item.item)
      },
      submit(){
        if(!this.selectItem.id){
          this.$message.warning('请选择要修改的小店！');
          return
        }
        const params = {
          user_id:this.id,
          partner_id:this.selectItem.id
        }
        this.changePartnersRelated({formItem:params,callback:this.reload})
        console.log(params)
      }
    },
    mounted() {
      this.id =this.$route.params.id
      this.tel = this.$route.query.tel
      this.partner_role = this.$route.query.partner_role
      this.getPartner({
        id:this.id,
        type:1
      })
    },
  };
</script>

<style scoped>

</style>
