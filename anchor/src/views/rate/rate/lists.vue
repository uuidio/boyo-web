<template>
    <div class="mr24">
      <a-card title="评价列表">
        <!--<a href="#" slot="extra">more</a>-->
         <template v-if="field&&field.length>0">
           <a-table  :scroll="{x:1400,y:700}" :columns="field" :dataSource="dataLists" :pagination="false">
             <div slot="rate_pic" slot-scope="text, record">
               <ul class="picImgs">
                 <li v-for="(src,index) in record.rate_pic" :key="index">
                   <a :href="src" target="_blank">
                     <img :src="src" alt="">
                   </a>
                 </li>
               </ul>
             </div>
             <div slot="result_text" slot-scope="text, record">
               <span>
                 <a-icon  style="color:#dd4b39" type="smile"  v-if="record.result_text=='好评'" />
                 <a-icon type="meh"  v-else-if="record.result_text=='中评'"/>
                 <a-icon type="frown" v-else-if="record.result_text=='差评'"/>
                 &nbsp;{{text}}
               </span>
             </div>
             <div slot="content" slot-scope="text, record">
               <p>{{text}}</p>
               <p class="col-666 fs12">{{record.created_at}}</p>
               <p v-if="record.reply_content!==null">门店回复：{{record.reply_content}}</p>
             </div>
             <div slot="action" slot-scope="text, record">
               <div @click="replyClick(record)" v-if="record.is_reply==0">
                 <a>
                   回复评价
                 </a>
               </div>
               <div v-if="record.is_appeal==1">
                 <a class="col-red" @click="appealOpen(record)">
                   申诉
                 </a>
               </div>
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
           <a-modal
             title="对用户评价进行回复"
             v-model="visible"
             @ok="handleOk"
           >
             <a-textarea maxlength="300" v-model="reply.reply_content" placeholder="输入回复" :rows="6" />
             <p class="mt10">
               至少5个字符，还可以输入300字
             </p>
           </a-modal>
           <a-modal
             title="对用户评价进行申诉"
             v-model="visible2"
             @ok="appealOk"
           >
             <a-radio-group class="mb10"  v-model="appeal.appeal_type">
               <!--<a-radio value="APPLY_UPDATE">让用户更新评价</a-radio>-->
               <a-radio value="APPLY_DELETE">删除评价</a-radio>
             </a-radio-group>
             <a-textarea maxlength="300" v-model="appeal.appeal_content" placeholder="输入申诉内容" :rows="4" />
             <p class="mt10 mb10">
               至少5个字符，还可以输入300字
             </p>
             <!--<UploadImage :defaultImageList="imageLists" :shopId="1" :maximum="5" ref="uploadImageLists"></UploadImage>-->
           </a-modal>
      </a-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  name: 'lists',
  components: {
    UploadImage,
  },
  computed: {
    ...mapState({
      field: state => state.rate.rateField,
      dataLists: state => state.rate.rateData,
      pages: state => state.rate.pages,
    }),
  },
  data() {
    return {
      page:1,
      imageLists: [],
      visible: false,
      visible2: false,
      reply: {
        rate_id: '',
        reply_content: '',
      },
      appeal: {
        rate_id: '',
        appeal_type: 'APPLY_UPDATE',
        appeal_content: '',
        evidence_pic: [],
      },
    };
  },
  methods: {
    ...mapActions({
      rateLists: 'rate/rateLists',
      submitReply: 'rate/submitReply',
      submitAppeal: 'rate/submitAppeal',
    }),
    pageChange(page){
      this.page=page
      this.rateLists(this.page);
    },
    replyClick(item) {
      this.visible = true;
      this.reply.rate_id = item.id;
    },
    appealOpen(item) {
      this.visible2 = true;
      this.appeal.rate_id = item.id;
    },
    appealOk() {
      // this.appeal.evidence_pic = this.$refs.uploadImageLists.uploadImageList;
      this.submitAppeal(
        {
          appeal: this.appeal,
          callback:(()=>{
            this.visible2 = false
            this.rateLists(this.page);
          })
        }
      );
    },
    handleOk() {
      this.visible = false;
      this.submitReply({
        reply: this.reply,
      });
    },
  },
  mounted() {
    this.rateLists(this.page);
  },
};
</script>

<style scoped lang="stylus">
.picImgs
  display flex
  flex-wrap wrap
  li
    width:100px
    margin-bottom 10px
    text-align center
    img
      width 80px
      height 80px
</style>
