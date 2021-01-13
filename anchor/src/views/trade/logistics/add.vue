<template>
    <div class="content">
      <a-form>
        <a-form-item
          :wrapper-col="{ xs:24,md:6 }"
        >
           <div>模板名称：</div>
           <a-input v-model="formItem.name" placeholder="请输入模板名称" />
        </a-form-item>
        <a-form-item
        :wrapper-col="{ xs:24,md:6 }"
      >
        <div>是否包邮：{{formItem.is_free}}</div>
        <a-radio-group :disabled="id!==0?true:false" v-model="formItem.is_free" name="radioGroup" :defaultValue="formItem.is_free">
          <a-radio :value="0">自定义运费</a-radio>
          <a-radio :value="1">卖家承担运费</a-radio>
        </a-radio-group>
      </a-form-item>
       <template v-if="formItem.is_free!==1">
         <a-form-item
           :wrapper-col="{ xs:24,md:6 }"
         >
           <div>计价方式：</div>
           <a-radio-group :disabled="id!==0?true:false" v-model="formItem.valuation" name="radioGroup">
             <a-radio :value="3">金额</a-radio>
             <a-radio :value="2">件数</a-radio>
             <!--<a-radio :value="1">重量</a-radio>-->
           </a-radio-group>
         </a-form-item>
         <a-form-item
           :wrapper-col="{ xs:24,md:6 }"
         >
           <div>是否启用：</div>
           <a-radio-group name="radioGroup" v-model="formItem.status">
             <a-radio :value="1">启用</a-radio>
             <a-radio :value="0">禁用</a-radio>
           </a-radio-group>
         </a-form-item>
       </template>
      </a-form>
      <div v-if="formItem.is_free!==1">
        <div class="mb10 fs13">
          运费计算：
        </div>
        <div v-if="formItem.valuation===3" class="logBox">
          <div class="mb20">为指定地区城市设置运费</div>
          <div class="mb20">
            <areaSelect :labelNum="2" @on-select="getArea" :checkArr="[]">
              <a-button>添加地区</a-button>
            </areaSelect>
          </div>
          <a-table :scroll="{x:1100,y:700}" :columns="columns" :dataSource="data" :pagination="false">
            <template slot="addr" slot-scope="text, record,index">
              <areaSelect v-if="index>0" :labelNum="2" :checkArr="record.area" :openIndex="index" @on-select="getArea" >
                <a>编辑</a>
              </areaSelect>
             <div class="addrItem">
               <div v-for="(item,index) in record.addr">
                 {{item}}
                 <span v-if="index!==record.addr.length-1">、</span>
               </div>
             </div>
            </template>
            <template slot="num" slot-scope="text, record,index2">
              <div v-for="(item,index) in record.num" :class="{'mt10':index!==0?true:false}">
                <a-input style="width:150px" type="number" disabled v-model="item.num1"  placeholder="请输入开始金额"/> <span>~</span> <a-input style="width:150px" type="number" v-model="item.num2" :disabled="index!==record.num.length-1" placeholder="请输入结束金额" />
              </div>
            </template>
            <template slot="price" slot-scope="text, record,index2">
              <div v-for="(item,index) in record.price" :class="{'mt10':index!==0?true:false}">
                <a-input style="width:150px" type="number" placeholder="请输入整数运费" v-model="item.add_fee" />
                <a class="ml10" v-if="index===0" @click="addPrice(index2)">添加</a>
                <a class="ml10 col-red" v-if="index>0&&index===record.num.length-1" @click="delPrice(index2,index)">删除</a>
              </div>
            </template>
            <template slot="action" slot-scope="text, record,index2">
              <a class="col-red" @click="delAddr(index2)" v-if="index2!==0">删除</a>
            </template>
          </a-table>
        </div>
        <div v-if="formItem.valuation!==3">
          <div class="logBox mb20">
            <div class="mb20">
              <div class="mb10 fw700">默认运费：</div>
              <div>
                <span v-if="formItem.valuation==2">件数（件以内）</span>
                <span v-else-if="formItem.valuation==1">重量（kg以内）</span>
                : <a-input style="width:100px" v-model="pieceFirst.start_standard" /> 运费（元）：<a-input style="width:100px" v-model="pieceFirst.start_fee"/>
              </div>
            </div>
            <div class="mb20">
              <div class="mb10 fw700">增件运费：</div>
              <div>

                <span v-if="formItem.valuation==2">每增加（件内）</span>
                <span v-else-if="formItem.valuation==1">每增加（kg以内）</span>
                : <a-input v-model="pieceFirst.add_standard" style="width:100px" /> 增加（元）：<a-input style="width:100px" v-model="pieceFirst.add_fee"/>
              </div>
            </div>
          </div>
          <div  class="logBox mb20">
            <p class="mb10">为指定地区城市设置运费</p>
            <areaSelect class="mb10" :labelNum="2" @on-select="getPieceArea" :checkArr="[]">
              <a-button>添加地区</a-button>
            </areaSelect>
            <a-table :scroll="{x:1100,y:700}" :columns="pieceColumns" :dataSource="pieceData">
              <template  slot="startTitle">
                <span v-if="formItem.valuation==2">首件(件)</span>
                <span v-else-if="formItem.valuation==1">首重(kg)</span>
              </template>
              <template  slot="addTitle">
                <span v-if="formItem.valuation==2">续件(件)</span>
                <span v-else-if="formItem.valuation==1">续重(kg)</span>
              </template>
              <template slot="addr" slot-scope="text, record,index2">
                <areaSelect  :labelNum="2" :checkArr="record.area" :openIndex="index2" @on-select="getPieceArea" :pagination="false">
                  <a>编辑</a>
                </areaSelect>
                <div class="addrItem">
                  <div v-for="(item,index) in record.addr">
                    {{item}}
                    <span v-if="index!==record.addr.length-1">、</span>
                  </div>
                </div>
              </template>
              <template  slot="start_standard" slot-scope="text, record,index2">
                <a-input style="width:150px" disabled type="number" v-model="record.start_standard"  placeholder="请输入首件金额"/>
              </template>
              <template slot="start_fee" slot-scope="text, record,index2">
                <a-input style="width:150px" type="number" v-model="record.start_fee"  placeholder="请输入首费金额"/>
              </template>
              <template slot="add_standard" slot-scope="text, record,index2">
                <a-input style="width:150px" type="number" v-model="record.add_standard"  placeholder="请输入续件数量"/>
              </template>
              <template  slot="add_fee" slot-scope="text, record,index2">
                <a-input style="width:150px" type="number" v-model="record.add_fee"  placeholder="请输入续费金额"/>
              </template>
              <template slot="action"  slot-scope="text, record,index2">
                <a class="col-red" @click="delPiece(index2)">删除</a>
              </template>
             </a-table>
          </div>
          <!--<div class="mb10">-->
            <!--<a-checkbox>指定条件包邮：</a-checkbox>-->
          <!--</div>-->
          <div class="mb10">
            指定地区包邮(选填)：
            <a-radio-group v-model="formItem.open_freerule" name="radioGroup">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
          </div>
          <div class="logBox" v-if="formItem.open_freerule===1">
            <areaSelect class="mb10" :labelNum="2" @on-select="getNoPostageArea" :checkArr="[]">
              <a-button>添加地区</a-button>
            </areaSelect>
            <div>
              <a-table :scroll="{x:1100,y:700}" :columns="noPostageColumns" :dataSource="noPostageData" :pagination="false">
                <template  slot="noPostageTitle">
                  <span v-if="formItem.valuation==2">包邮条件(件)</span>
                  <span v-else-if="formItem.valuation==1">包邮条件(kg)</span>
                </template>
                <template slot="addr" slot-scope="text, record,index">
                  <areaSelect v-if="index>0" :labelNum="2" :checkArr="record.area" :openIndex="index" @on-select="getNoPostageArea" >
                    <a>编辑</a>
                  </areaSelect>
                  <div class="addrItem">
                    <div v-if="index===0">
                      全国
                    </div>
                    <div v-else v-for="(item,index) in record.addr">
                      {{item}}
                      <span v-if="index!==record.addr.length-1">、</span>
                    </div>
                  </div>
                </template>
                <template slot="freetype" slot-scope="text, record,index2">
                  <a-select style="width:150px"  v-model="record.freetype" >
                    <a-select-option value="1">件数</a-select-option>
                    <a-select-option value="2">金额</a-select-option>
                    <a-select-option value="3">金额加件数</a-select-option>
                  </a-select>
                  <span v-if="record.freetype!=2"> 满</span>
                  <a-input v-if="record.freetype!=2" style="width:100px;margin:0 5px" type="number" v-model="record.upquantity"  />
                  <span v-if="record.freetype!=2">件包邮</span>
                  <span v-if="record.freetype==3">、</span>
                  <a-input v-if="record.freetype!=1" style="width:100px;margin:0 5px" type="number" v-model="record.upmoney"  />
                  <span v-if="record.freetype!=1">元包邮</span>
                </template>
                <template slot="action" slot-scope="text, record,index2">
                  <a v-if="index2>0" class="col-red" @click="delnoPostage(index2)">删除</a>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a-button @click="submit" type="primary">保存</a-button>
      </div>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
    const columns = [
      {
        title: '运送到',
        dataIndex: 'addr',
        key: 'addr',
        width:350,
        scopedSlots: { customRender: 'addr' },
      },
      {
        title:'金额上下限',
        dataIndex:'num',
        key: 'num',
        scopedSlots: { customRender: 'num' },
        width:400
      },
      {
        title:'运费',
        dataIndex:'price',
        key: 'price',
        scopedSlots: { customRender: 'price' },
      },
      {
        title:'操作',
        dataIndex:'action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      }
    ]
    const pieceColumns=[
      {
        title: '运送到',
        dataIndex: 'addr',
        key: 'addr',
        width:350,
        scopedSlots: { customRender: 'addr' },
      },
      {
        slots: { title: 'startTitle' },
        dataIndex:'start_standard',
        key: 'start_standard',
        scopedSlots: { customRender: 'start_standard' },
      },
      {
        title:'首费(元)',
        dataIndex:'start_fee',
        key: 'start_fee',
        scopedSlots: { customRender: 'start_fee' },
      },
      {
        slots: { title: 'addTitle' },
        dataIndex:'add_standard',
        key: 'add_standard',
        scopedSlots: { customRender: 'add_standard' },
      },
      {
        title:'续费(元)',
        dataIndex:'add_fee',
        key: 'add_fee',
        scopedSlots: { customRender: 'add_fee' },
      },
      {
        title:'操作',
        dataIndex:'action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      },
    ]
    const noPostageColumns = [
      {
        title: '地区设置',
        dataIndex: 'addr',
        key: 'addr',
        width:350,
        scopedSlots: { customRender: 'addr' },
      },
      {
        slots: { title: 'noPostageTitle' },
        dataIndex: 'freetype',
        key: 'freetype',
        scopedSlots: { customRender: 'freetype' },
      },
      {
        title:'操作',
        dataIndex:'action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      }
    ]
   import areaSelect from '@C/area/area'
    export default {
      computed: {
        ...mapState({
          detail: state => state.logistics.detail,
        }),
      },
      components:{
        areaSelect
      },
      name: "add",
      data(){
          return{
            id:0,
            formItem:{
              name:'',
              is_free:0,
              valuation:3,
              status:1,
              fee_conf:[],
              open_freerule:0,
            },
            pieceColumns,
            noPostageColumns,
            pieceFirst:{
              start_standard:'',
              start_fee:'',
              add_standard:'',
              add_fee:'',
            },
            pieceData:[

            ],
            data:[
              {
                addr: [
                    '全国',
                ],
                num:[
                  {
                    num1:0.01,
                    num2:'',
                  }
                ],
                price:[{
                  add_fee:''
                }],
              },
            ],
            noPostageData:[{
              freetype:'1',
              upquantity:'',
              upmoney:'',
            }],
            columns
          }
      },
      watch:{
        detail(){
        let free_conf = [];
        let fee_conf  = {};
          if(!this.detail.is_free) {
             fee_conf = JSON.parse(this.detail.fee_conf);
          }
          if(this.detail.free_conf){
            free_conf = JSON.parse(this.detail.free_conf);
          }
          this.formItem.name = this.detail.name;
          this.formItem.is_free = this.detail.is_free;
          this.formItem.valuation = Number(this.detail.valuation);
          this.formItem.status = this.detail.status;
          if(this.detail.open_freerule){
            this.formItem.open_freerule = Number(this.detail.open_freerule);
          }
          if(this.formItem.valuation==2){
             this.pieceFirst = fee_conf[0];
             fee_conf.splice(0,1);
             this.pieceData = fee_conf;
             this.noPostageData = free_conf;
          }else if(this.formItem.valuation==3){
              this.data = [];
               for(let i = 0;i<fee_conf.length;i++){
                 let obj = {
                   addr:[],
                   num:[],
                   price:[]
                 }
                 if(i===0){
                   obj.addr = ['全国']
                 }else{
                   obj.addr =fee_conf[i].addr
                   obj.area =fee_conf[i].area
                 }
                 console.log(fee_conf[i].rules)
                 for(let j=0;j < fee_conf[i].rules.length;j++){
                   obj.num.push({
                     num1:fee_conf[i].rules[j].up,
                     num2:fee_conf[i].rules[j].down,
                   })
                   obj.price.push({
                     add_fee:fee_conf[i].rules[j].basefee
                   })
                 }
                 this.data.push(obj)
               }
          }
        }
      },
      methods:{
        ...mapActions({
          logisticsAdd: 'logistics/logisticsAdd2',
          logisticsDet: 'logistics/logisticsDet',
          logisticsEdit: 'logistics/logisticsEdit',
        }),
        submit(){
          if(this.formItem.is_free===0){
            if(this.formItem.valuation===3){
              this.formItem.fee_conf = [];
              for(let i = 0;i<this.data.length;i++){
                const item = this.data[i]
                let obj = {
                  rules:[]
                };
                if(i!==0){
                  obj.addr = item.addr
                  obj.area = item.area
                }
                for(let j = 0;j<item.num.length;j++){
                  obj.rules.push({
                    up:item.num[j].num1,
                    down:item.num[j].num2,
                    basefee:item.price[j].add_fee
                  })
                }
                this.formItem.fee_conf.push(obj)
              }
            }else if(this.formItem.valuation===2){
              this.formItem.fee_conf = this.pieceData
              this.formItem.fee_conf.unshift(this.pieceFirst)
              this.formItem.free_conf = this.noPostageData
            }
          }else{
            this.formItem.fee_conf = ''
          }
          console.log(JSON.stringify(this.formItem))
          if(this.formItem.id){
            this.logisticsEdit({formItem:this.formItem})
          }else{
            this.logisticsAdd({formItem:this.formItem})
          }

        },
        delAddr(index2){
          this.data.splice(index2,1)
        },
        delnoPostage(index2){
          this.noPostageData.splice(index2,1)
        },
        getNoPostageArea(item){
           if(item.index===-1){
             const obj = {
               addr:item.items,
               area:item.keys,
               freetype:'1',
               upquantity:'',
               upmoney:'',
             }
             this.noPostageData.push(obj)
           }else{
             this.noPostageData[item.index].addr=item.items
             this.noPostageData[item.index].area=item.keys
           }
        },
        delPiece(index){
          this.pieceData.splice(index,1)
        },
        getPieceArea(item){
          if(item.index===-1){
            const obj =  {
              addr:item.items,
              area:item.keys,
              start_standard:'1',
              start_fee:'',
              add_standard:'',
              add_fee:'',
            };
             this.pieceData.push(obj)
          }else{
            this.pieceData[item.index].addr = item.items
            this.pieceData[item.index].area = item.keys
          }
        },
        getArea(item){
          if(item.index===-1){
            const obj =  {
                addr:item.items,
                area:item.keys,
                num:[
                  {
                    num1:1,
                    num2:'',
                  }
                ],
                price:[{
                  price:''
                }],
              };
            this.data.push(obj)
          }else{
            this.data[item.index].addr = item.items
            this.data[item.index].area = item.keys
          }
        },
        addPrice(index){
          if(this.data[index].num[this.data[index].num.length-1].num2===''){
            this.$message.warning('请完成其他金额上下限后添加');
            return
          }
          this.data[index].num.push({
            num1:this.data[index].num[this.data[index].num.length-1].num2,
            num2:'',
          })
          this.data[index].price.push({
            price:''
          })
        },
        delPrice(index,priceIndex){
          this.data[index].price.splice(priceIndex,1)
          this.data[index].num.splice(priceIndex,1)
        }
      },
      mounted() {
        if(this.$route.params.id){
          this.id = this.$route.params.id
          this.formItem.id = this.$route.params.id
          const params = {
            id:this.$route.params.id
          }
          this.logisticsDet(params)
        }
      }
    }
</script>

<style scoped lang="stylus">
  .addrItem
    display flex
    flex-wrap wrap
>>>.ant-table table
    background #fff
>>>.ant-form-item
    margin-bottom 15px
.logBox
  border-radius 5px
  background #f5f5f5
  padding 10px 20px
  margin-bottom 10px
  font-size 13px
</style>
