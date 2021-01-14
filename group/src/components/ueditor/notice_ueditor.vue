<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
    <Upload
      ref="upload"
      name="image"
      :action="uploadImageUrl"
      :headers="headers"
      :on-success="handleSuccess"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
    >
      <a-button icon="upload" style="margin-right: 6px;margin-top:20px;">上传图片</a-button>
    </Upload>
    <AlbumPics :isMultiple=true :maximum=20 @selectOk="selectPics">
      <a-button icon="camera">相册选择</a-button>
    </AlbumPics>
  </div>
</template>

<script>
import Server from '@/config/server';
import AlbumPics from '@C/album/pics';
import _Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { getAccessToken } from '@/utils/util';
import { Upload } from 'iview';

const Quill = window.Quill || _Quill;
export default {
  name: 'ueditor',
  components: {
    AlbumPics,
    Upload,
  },
  props: {
    value: String,
  },
  data() {
    return {
      tmpContent: '',
      num: 1,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      uploadImageUrl: Server.baseURL + Server.action.upload_image,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (this.$el) {
        const fullToolbar = [
          [{ font: [] }],
          [{ header: [false, 1, 2, 3, 4, 5] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          ['link', 'formula'],
          [{ direction: 'rtl' }],
          ['clean'],
        ];
          // Instance
        this.quill = new Quill(this.$refs.editor, {
          theme: 'snow',
          modules: {
            toolbar: fullToolbar,
          },
        });

        // this.quill.enable(false)
        // Set editor content
        if (this.value) {
          this.quill.pasteHTML(this.value);
        }
        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true);
        }
        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML;
          const quill = this.quill;
          const text = this.quill.getText();
          if (html === '<p><br></p>') html = '';
          this.tmpContent = html;
          this.$emit('input', this.tmpContent);
          this.$emit('on-change', { html, text, quill });
        });
      }
    },
    handleSuccess(res, file) {
      if (res.code === 0) {
        this.insertPic(res.result.pic_url);
      } else {
        this.warn(res.message);
      }
    },
    handleFormatError() {
      this.warn('上传文件格式不正确');
    },
    handleMaxSize() {
      this.warn('上传文件过大');
    },
    selectPics(pics) {
      const _this = this;
      pics.forEach((pic) => {
        _this.insertPic(pic.pic_url);
      });
    },
    insertPic(pic) {
      this.quill.focus();
      const range = this.quill.getSelection(true);
      this.quill.insertEmbed(range.index, 'image', pic);
      this.quill.setSelection(range.index + 1, 0);
    },
  },
  watch: {
    // Watch content change
    value(newVal) {
      if (this.quill) {
        if (newVal) {
          this.quill.pasteHTML(newVal);
          this.quill.setSelection(newVal.length);
        } else if (!newVal) {
          this.quill.setText('');
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  >>> .ql-toolbar.ql-snow .ql-formats
    margin-right: 10px

  >>> .ql-snow .ql-picker.ql-font
    width: 60px

  >>> .ql-snow .ql-picker.ql-size
    width: 60px

  >>> .ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before
    content: '字体'

  >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before
    content: '设置标题'

  >>> .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before
    content: '字号'

  >>> .ql-snow .ql-picker
    height: 30px

  >>> .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg
    margin-top: -7px

  >>> .ivu-upload
    display: inline-block
</style>
