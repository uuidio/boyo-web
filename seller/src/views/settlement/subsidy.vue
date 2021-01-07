<template>
    <div class="mr24">
      <a-card>
        <a-button icon="download" type="primary" slot="title">补贴明细导出</a-button>
        <a-button slot="extra" icon="search" @click="open">搜索</a-button>
        <a-table :scroll="{x:1100,y:700}" :pagination="false" :columns="columns" :dataSource="data">
        </a-table>
      </a-card>
      <a-drawer
        title="购物券补贴明细搜索"
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
          <h4 class="mb10">补贴类型</h4>
          <a-select defaultValue="全部"  style="width:100%">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">普通补贴</a-select-option>
            <a-select-option value="2">退还补贴</a-select-option>
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

  ];
  const data=[

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
