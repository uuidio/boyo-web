<template>
  <div class="mr24">
    <a-card :bordered="false">
      <div slot="title">
          <a-button @click="addclass" type="primary" icon="plus">添加{{UserType === 'normal' ? '积分' : '牛币'}}分类</a-button>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="goods_image" slot-scope="text, record">
            <img :src="record.goods_image" style="width:80px;height:80px;" alt="">
          </div>
          <div slot="action" slot-scope="text, record">
            <a-button class="btn-info mr10" size="small" @click="addclass(record.id)">编辑</a-button>
            <a-button class="btn-error" size="small" @click="del(record)">删除</a-button>
          </div>
        </a-table>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :defaultPageSize="pages.per_page"
            :defaultCurrent="1"
            @change="pageChange"
          />
        </div>
      </template>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableSelect from '@C/lists/TableSelect';
import Server from '@/config/server';
export default {
  name: 'point_lists',
  components: {
    TableSelect,
  },
  data() {
    return {
      visible: false,
      formItem: {
        page: 1,
      },
      goods_item: {
        id: '',
        goods_name: '',
        price: '',
      },
      form: this.$form.createForm(this),
    };
  },
  created(){
  },
  computed: {
    ...mapState({
      fields: state => state.integral.field,
      dataLists: state => state.integral.dataLists.data,
      pages: state => state.integral.pages,
    }),
  },
  methods: {
    addclass(id) {
      if (id>0) {
        this.$router.push({ path: '/promotion/integral/addclass?classId=' + id });
      } else {
        this.$router.push({ path: '/promotion/integral/addclass' });
      }
    },

    ...mapActions({
      fetchLists: 'integral/fetchLists',
      addIntegralClass: 'integral/addIntegralClass',
      delIntegralClass: 'integral/delIntegralClass',
    }),
    handleOk() {},
    pageChange(page) {
      this.formItem.page = page
      this.getLists();
    },
    getLists() {
      const params = this.formItem
      this.fetchLists(params);
    },

    del(item) {
      if (confirm('确认删除该数据？')) {
        this.delIntegralClass({ id: item.id, dataList: this.dataLists });
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
