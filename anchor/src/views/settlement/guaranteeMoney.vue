<template>
    <div class="mr24">
      <div class="moneyBox">
        <a-row>
          <a-col class="mb10" :xs="{ span: 24 }" :md="{ span: 8}">
            <a-card title="查询" :bordered="false">
              <div class="money_item">
                <h4 class="mb10">操作时间:</h4>
                <a-range-picker @change="onChange" />
              </div>
              <div class="money_item">
                <h4 class="mb10">交易类型：</h4>
                <a-select defaultValue="全部"  style="width:100%">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">充值</a-select-option>
                  <a-select-option value="2">扣款</a-select-option>
                </a-select>
              </div>
              <div class="money_item">
                <a-button type="primary">查询</a-button>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 24 }" :md="{ span: 15, offset:1  } ">
            <a-card :bordered="false" title="门店">
              <a-row>
                <a-col :xs="24" :md="8">
                  <img class="storeImg" src="http://hyplmm.oss-cn-shenzhen.aliyuncs.com/7e49aea3d25426ac0c73785e90b136b9.jpg" alt="">
                </a-col>
                <a-col :xs="24" :md="16">
                  <p>保证金额度：0</p>
                  <p>保证金余额：0</p>
                  <p>保证金状态：正常</p>
                  <p>最后操作时间：</p>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
       <div class="moneyTab">
         <a-tabs defaultActiveKey="1" >
           <a-tab-pane tab="全部" key="1">
             <a-table :scroll="{x:1100,y:700}" :columns="columns" :dataSource="data">

             </a-table>
           </a-tab-pane>
           <a-tab-pane tab="扣款" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
           <a-tab-pane tab="充值" key="3">Content of Tab Pane 3</a-tab-pane>
         </a-tabs>
       </div>
      </div>
    </div>
</template>

<script>
  const columns = [ {
    title: '记录类型',
    dataIndex: 'age',
    key: 'age',
   }, {
    title: '记录时间',
    dataIndex: 'address',
    key: 'address',
  },
    {
      title: '金额',
      dataIndex: 'address3',
      key: 'address3',
    },
    {
      title: '备注',
      dataIndex: 'address2',
      key: 'address2',
    }
  ];
  const  data= [{

  }];
    export default {
        name: "guaranteeMoney",
       methods:{
         onChange(date, dateString) {
           console.log(date, dateString);
         }
       },
      data(){
          return{
            columns,
            data
          }
      }
    }
</script>

<style scoped lang="stylus">
  .money_item:not(:last-child)
    margin-bottom 20px
  .storeImg
    width 100%
    padding 5px
  .moneyTab
    margin-top 20px
    background #fff
</style>
