<template>
  <div class="content">
    <a-result :title="title_name">
      <template #extra>
        <i></i>
        <div style="overflow: hidden;width:531px;margin: 0 auto;">
          <UploadImage @get_table_list="get_table_list" :maximum="999" :option="option" style="display:inline-block;float: left">
            <a-button  slot="button" type="primary" size="large"><a-icon type="upload" /> 上传更新包 </a-button>
          </UploadImage>
          <a-button size="large" type="danger" @click="download" style="float: right;margin-top:10px"><a-icon type="download" />下载当前包</a-button>
        </div>
        <div style="margin-top:15px;"><a-icon type="bulb" /> 命名规则建议为V + 版本号_ + D + 日期_（如：V1_01_03D2021_01_14.apk）</div>
      </template>
    </a-result>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/Upload_common';
export default {
  components: {
    UploadImage,
  },
  computed: {
  },
  data() {
    return {
      title_name: '',
      option: {url:'v1/upload/apk',data:{}},
      download_url: ''
    };
  },
  methods: {
    // 获取表格列表
    get_table_list() {
      let _this = this;
      _this.spinning = true
      _this.$http.get('v1/apk/get', _this.table_param).then((resData) => {
        _this.spinning = false
        if (resData.code === 0) {
          _this.title_name = '您当前版本为: ' + resData.result.file_name + '.apk'
          _this.download_url = resData.result.url
        }
      });
    },
    download(){
      window.location.href = this.download_url
    }
  },
  created() {
    this.get_table_list()
  },
  mounted() {
  },
  watch: {
    exportData() {
      this.orderCallback();
    },
  },
};
</script>

<style scoped>
.list-nav {
  display: flex;
  justify-content: space-between;
}
.list-nav button {
  margin-right: 20px;
}
.ant-result-extra {
    margin-top: 6px!important;
}
</style>
