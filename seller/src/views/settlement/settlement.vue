<template>
    <div class="mr24">
      <a-card>
        <a-button icon="download" type="primary" slot="title">结算导出</a-button>
        <a-button slot="extra" icon="search" @click="open">搜索</a-button>
        <a-table :scroll="{x:1100,y:700}" :pagination="false" :columns="columns" :dataSource="data">
          <div slot="zdsj" slot-scope="text,item">
             <p>{{item.zdsj.ks}}~{{item.zdsj.js}}</p>
          </div>
          <div slot="action" slot-scope="text,item">
            <div><a href="javacript:;">账单下载</a></div>
            <div><a href="javacript:;">查询明细</a></div>
          </div>
        </a-table>
      </a-card>
      <a-drawer
        title="账单搜索"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <div class="drawerBox">
          <h4 class="mb10">账期时间</h4>
          <a-range-picker @change="onChange" />
        </div>
        <div class="drawerBox">
          <h4 class="mb10">结算类型</h4>
          <a-select defaultValue="全部"  style="width:100%">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">已结算</a-select-option>
            <a-select-option value="2">未结算</a-select-option>
          </a-select>
        </div>
        <div class="drawerBox">
           <a-button type="primary">查询</a-button>
        </div>
      </a-drawer>
    </div>
</template>

<script>
  const columns=[
    {
      title:'账单时间',
      dataIndex:'zdsj',
      scopedSlots: { customRender: 'zdsj' },
    },
    {
      title:'账单编号',
      dataIndex:'bh'
    },
    {
      title:'订单数量',
      dataIndex:'sl'
    },{
      title:'商品款',
      dataIndex:'qian'
    },
    {
      title:'操作',
      dataIndex:'action',
      scopedSlots: { customRender: 'action' }
    }
  ];
  const data=[
    {
      zdsj:{
        ks:'2010-01-01',
        js:'2011-03-01'
      },
      bh:'123456',
      sl:'12342',
      qian:'2334.212'
    }
  ];
    export default {
        name: "settlement",
        data(){
          return{
            columns,
            data,
            visible:false
          }
        },
        methods:{
          onClose(){
            this.visible = false
          },
          open(){
            this.visible = true
          },
          onChange(date, dateString) {
            console.log(date, dateString);
          }
        }
    }
</script>

<style scoped lang="stylus">
.drawerBox
  margin-bottom 20px
</style>
