<template>
  <div>
    <div @click="openModel">
      <slot></slot>
    </div>
    <a-modal
      width="80%"
      title="地区选择"
      v-model="visible"
      @ok="selectArea"

    >
      <div class="example" v-if="treeData.length===0">
        <a-spin />
      </div>
      <div v-else>
        <a-tree
          v-if="visible"
          checkable
          :treeData="treeData"
          @select="onSelect"
          @check="onCheck"
          v-model="selectKeys"
        >
        </a-tree>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { filterArea } from './areaUtil'

  export default {
    data() {
      return {
        treeData:[],
        visible:false,
        selectItem:[],
        selectKeys:[]
      };
    },
    props:{
      openIndex:{
        type:Number,
        default:-1
      },
      checkArr: {
        type:Array,
        default:function(){
          return []
        }
      },
      labelNum:{
        type:Number,
        default:3
      }
    },
    watch:{
    },
    methods: {
      openModel(){
        this.visible = true
        this.selectKeys = this.checkArr
      },
      onSelect(selectedKeys, info) {
      },
      onCheck(checkedKeys, info) {
        this.selectItem = []
        this.selectKeys = checkedKeys
        const item = info.checkedNodes
        item.forEach((areaItem)=>{
          if(areaItem.data.props.title!=='市辖区'){
            this.selectItem.push(areaItem.data.props.title)
          }
        })
      },
      selectArea(){
        this.$emit('on-select',{
          keys:this.selectKeys,
          items:this.selectItem,
          index:this.openIndex
        })
        this.selectKeys = []
        this.selectItem = []
        this.visible = false
      }
    },
    mounted() {
     this.treeData = filterArea(this.labelNum)
    },
  };
</script>

<style scoped lang="stylus">
  >>>.ant-tree
    display flex
    flex-wrap wrap
    .ant-tree-treenode-switcher-close
      width 16%
  .example
    text-align: center;
    padding: 30px 50px;
    margin: 20px 0;
</style>
