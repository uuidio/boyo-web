<template>
  <div class="content">
    <a-form>
      <a-form-item
        label="角色名称："
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24 }"
      >
        <a-input type="text"/>
      </a-form-item>
      <a-form-item
        label="权限："
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 20,xs:24 }"
      >
        <a-checkbox
          @change="mycheckAll"
          :checked="all"
        >
          全选
        </a-checkbox>
        <div>
          <a-checkbox
            @change="onCheckAllChange"
            :checked="checkAll"
          >
            商品
          </a-checkbox>
          <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange"/>
        </div>
        <div>
          <a-checkbox
            @change="onCheckAllChange2"
            :checked="checkAll2"
          >
            交易
          </a-checkbox>
          <a-checkbox-group :options="plainOptions2" v-model="checkedList2" @change="onChange2"/>
        </div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ md: 20,xs:24,offset:4  }"
      >
        <a-button type="primary">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const plainOptions = ['商品1', '商品2', '商品3'];
const plainOptions2 = ['交易1', '交易2', '交易3'];
export default {
  name: 'rolesadd',
  data() {
    return {
      checkedList: [],
      checkedList2: [],
      checkAll: false,
      checkAll2: false,
      all: false,
      plainOptions,
      plainOptions2,
    };
  },
  methods: {
    onChange(checkedList) {
      this.checkAll = checkedList.length === plainOptions.length;
      this.ifCheck();
    },
    onChange2(checkedList2) {
      this.checkAll2 = checkedList2.length === plainOptions2.length;
      this.ifCheck();
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        checkAll: e.target.checked,
      });
      this.ifCheck();
    },
    onCheckAllChange2(e) {
      Object.assign(this, {
        checkedList2: e.target.checked ? plainOptions2 : [],
        checkAll2: e.target.checked,
      });
      this.ifCheck();
    },
    mycheckAll(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        checkAll: e.target.checked,
        checkedList2: e.target.checked ? plainOptions2 : [],
        checkAll2: e.target.checked,
        all: e.target.checked,
      });
    },
    ifCheck() {
      if (this.checkAll2 == true && this.checkAll == true) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
