<template>
  <div>

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="8" :sm="24">
            <a-form-item label="投稿时间">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
            <a-form-item label="稿件类型">
              <a-select v-model="queryParam.type" placeholder="请选择" default-value="0">
                <a-select-option value="0">APP</a-select-option>
                <a-select-option value="1">微信</a-select-option>
                <a-select-option value="2">微博</a-select-option>
                <a-select-option value="2">报纸</a-select-option>
                <a-select-option value="2">电视</a-select-option>
                <a-select-option value="2">广播</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.type" placeholder="请选择" default-value="0">
                <a-select-option value="0">初审通过</a-select-option>
                <a-select-option value="1">二审通过</a-select-option>
                <a-select-option value="2">终审通过</a-select-option>
                <a-select-option value="2">审核不通过</a-select-option>
                <a-select-option value="2">撤稿</a-select-option>
                <a-select-option value="2">删除</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="!advanced && 6 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新建</a-button>
    </div>

    <a-table 
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
      :columns="columns" 
      :dataSource="data"
    > 
      <!-- 标签 -->
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
      </span>

      <!-- 操作 -->
      <span slot="action" slot-scope="text">
        <a href="javascript:;">分发</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;">标签</a>
        <a-divider type="vertical" />
        <a href="javascript:;">审核</a>
      </span>
    </a-table>

  </div>
</template>

<script>
import moment from 'moment'
import STable from '@/components/table/'
import { getRoleList, getServiceList } from '@/api/manage'

const data =  [
      {
        id: '1',
        postType: 'App',
        postTitle: '打破孩子放学早、家长下班晚的“时间差”（1238字）',
        author: '张丽丽',
        status: '初审通过',
        tags: [
         '家长', '孩子', '校园'
        ],
        postTime: '2019-02-01'
      }, 
      {
        id: '2',
        postType: '微信',
        postTitle: '老小区变身“公园”（2000字）',
        author: '李玲玲',
        status: '二审通过',
        tags: [
          '家长', '孩子', '校园'
        ],
        postTime: '2019-02-01'
      }
  ]

const columns = [
  {
    title: '稿件类型',
    dataIndex: 'postType',
  },
  {
    title: '稿件标题',
    dataIndex: 'postTitle',
  }, 
  {
    title: '作者',
    dataIndex: 'author',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '投稿时间',
    dataIndex: 'postTime',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  }
]

// const data = []

// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`
//   })
// }

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      // advanced: false,
      // 查询参数
      queryParam: {},
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      // 表头
      // columns: [
      //   {
      //     title: '#',
      //     scopedSlots: { customRender: 'serial' }
      //   },
      //   {
      //     title: '规则编号',
      //     dataIndex: 'no'
      //   },
      //   {
      //     title: '描述',
      //     dataIndex: 'description'
      //   },
      //   {
      //     title: '服务调用次数',
      //     dataIndex: 'callNo',
      //     sorter: true,
      //     needTotal: true,
      //     customRender: (text) => text + ' 次'
      //   },
      //   {
      //     title: '状态',
      //     dataIndex: 'status',
      //     needTotal: true
      //   },
      //   {
      //     title: '更新时间',
      //     dataIndex: 'updatedAt',
      //     sorter: true
      //   },
      //   {
      //     title: '操作',
      //     dataIndex: 'action',
      //     width: '150px',
      //     scopedSlots: { customRender: 'action' }
      //   }
      // ],
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   console.log('loadData.parameter', parameter)
      //   return getServiceList(Object.assign(parameter, this.queryParam))
      //     .then(res => {
      //       return data
      //     })
      // },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: true
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },

    handleEdit (record) {
      this.$emit('onEdit', record)
      this.$router.push('/myArticle/create')
    },
    handleOk () {},

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    
    //  日期选择器
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    
    // 表格
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    }

  }
}
</script>
