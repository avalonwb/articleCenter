<template>
  <div class='createArticle'>
    <a-row class="first-row">
      <a-col :span="14" class="first-row-left">
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </a-col>
      <a-col :span="9" :offset="1" class="first-row-right">
        <a-form
          id="components-form-demo-validate-other"
          :form="form"
          @submit="handleSubmit"
        >

          <a-form-item
            v-bind="formItemLayout"
            label="封面图"
          >
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="//jsonplaceholder.typicode.com/posts/"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>

           <a-form-item
              v-bind="formItemLayout"
              label="封面样式"
            >
              <a-radio-group v-decorator="['radio-group']">
                <a-radio value="a">
                  item 1
                </a-radio>
                <a-radio value="b">
                  item 2
                </a-radio>
                <a-radio value="c">
                  item 3
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item
                label="标题"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input
                  v-decorator="[
                    'note',
                    {rules: [{ required: true, message: 'Please input your note!' }]}
                  ]"
                />
              </a-form-item>

              <a-form-item
                  label="副标题"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-input
                    v-decorator="[
                      'note',
                      {rules: [{ required: true, message: 'Please input your note!' }]}
                    ]"
                  />
              </a-form-item>

                <a-form-item
                    label="引题"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-input
                      v-decorator="[
                        'note',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                </a-form-item>

                <a-form-item
                    label="作者"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-input
                      v-decorator="[
                        'note',
                        {rules: [{ required: true, message: 'Please input your note!' }]}
                      ]"
                    />
                </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="允许操作"
            >
              <a-checkbox-group
                v-decorator="['checkbox-group', {initialValue: ['A', 'B']}]"
                style="width: 100%;"
              >
                <a-row>
                  <a-col :span="8">
                    <a-checkbox value="A">
                      点赞
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox
                      value="B"
                    >
                      评论
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="C">
                      收藏
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-form-item>

            <a-form-item
              v-bind="formItemLayout"
              label="稿件来源"
            >
                <a href="Javascript:;">打破孩子放学早、家长下班晚的“时间差”（1238字）</a>
            </a-form-item>

        </a-form>
      </a-col>
    </a-row>
    <a-row class="third-row">
      <a-col :span="8" :push="8">
        <a-button type="primary" class="button">预览</a-button>
        <a-button type="primary" class="button">保存</a-button>
        <a-button type="primary" class="button">取消</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>

// function getBase64 (img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }

export default {
  data() {
    return {
      content: '',
      editorOption: {},
      loading: false,
      imageUrl: '',
      form: this.form = this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }
    }
  },
  methods: {
    // 编辑器
    onEditorBlur() {
    },
    onEditorFocus() {
    },
    onEditorReady() {
    },
     
    // 表单
    normFile  (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    handleSubmit() {

    },

    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}

</script>

<style lang='less' scoped>

#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}

.createArticle {
  height: calc(100vh);
  margin: 15px 0 15px 5px;

  .first-row {
    height: 600px;

    .first-row-left {
      height: 600px;

      .quill-editor {
        height: 500px;
      }

    }

    .first-row-right {
      height: 600px;
      margin-left: 15px;
      
    }
  }

  .third-row {
    text-align: center;
    margin-top: 20px;

    .button {
      margin-right: 15px;
    }
  }

}

</style>