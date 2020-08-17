# search页面规范
1. 表单全部使用v-model,并且绑定到searchModal字段
2. 查询表单区域应该和树进行双向过滤，即查询时条件应该包含表单和树木的选中
3. table相关信息放在tableState
4. tree相关信息放在treeState
5. 表单查询区域 表单项大于3 应该先展示两项，展开后显示所有
6. 树如果只有单纯的过滤功能，则放置在search页面即可
7. 表格查询的url应该定义在path文件
### 代码示范
```
<template>
  <div>
    <iop-data-table
      ref="testTable"
      :table="tableState.config"
      :permission="tableState.permission"
      @onAction="onAction"
      tree
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="名称">
              <a-input @pressEnter="search" placeholder="请输入名称" v-model="searchModal.userName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="编码">
              <a-input @pressEnter="search" placeholder="请输入编码" v-model="searchModal.userCode" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="state.advanced">
            <a-col :span="8">
              <a-form-item label="名称">
                <a-input @pressEnter="search" placeholder="请输入名称" v-model="searchModal.userName" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="编码">
                <a-input @pressEnter="search" placeholder="请输入编码" v-model="searchModal.userCode" allowClear />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!state.advanced && 8 || 16" :sm="24" class="search-buttons">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="reset">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ state.advanced ? '收起' : '高级' }}
              <a-icon :type="state.advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
      <template #tree>
        <iop-data-tree
          ref="testTree"
          :url="treeState.url"
          @onSelect="treeSelect"
          :queryName="treeState.queryName"
        >
        </iop-data-tree>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable, IopDataTree } from '@/iop/components'
import path from '@/iop/api'
import { objectTool } from 'mwutil'
import Define from '@/iop/constants/test'
const searchModal = {
  userName: '',
  userCode: ''
}
export default {
  components: {
    IopDataTable,
    IopDataTree
  },
  data () {
    return {
      // tableState 存储tableConfig/permission/selectId.....等table相关的
      tableState: {
        config: {
          /** 列表查询地址 */
          url: path.test.table,
          /** rowKey，必填 */
          rowKey: 'id',
          /** 列定义 */
          columns: [
            {
              title: '名称',
              dataIndex: 'userName'
            },
            {
              title: '编码',
              dataIndex: 'userCode'
            },
            {
              title: '类型',
              dataIndex: 'type',
              customRender: (text) => {
                return (
                  <a-tag color="red">
                    { this.handleType(text) }
                  </a-tag>
                )
              }
            }
          ]
        },
        permission: ['create', 'edit', 'view']
      },
      // searchModal为页面search条件Json
      searchModal: objectTool.deepClone(searchModal),
      // state存储页面专用私有变量
      state: {
        advanced: false
      },
      // treeState存储treeConfig/treeSelect等tree相关的（只有一个单纯的tree就放在search页面即可）
      treeState: {
        url: path.test.tree,
        queryName: 'id',
        selectId: ''
      }
    }
  },
  methods: {
    onAction ({ name = '', data = {} }) {
      const actionMap = {
        onCreate: this.doCreate.bind(this),
        onView: this.doView.bind(this, data.original),
        onEdit: this.doEdit.bind(this, data.original)
      }
      actionMap.hasOwnProperty(name) && actionMap[name]()
    },
    handleType (text) {
      return Define.TYPE[text]
    },
    search () {
      this.$refs.testTable.reload(Object.assign(this.searchModal, {
        parentId: this.treeState.selectId
      }))
    },
    reset () {
      this.searchModal = objectTool.deepClone(searchModal)
      this.search()
    },
    toggleAdvanced () {
      this.state.advanced = !this.state.advanced
    },
    treeSelect ({ key }) {
      this.treeState.selectId = key
      this.search()
    },
    doCreate () {
      this.$goPage(Define.PAGEURL.VIEW, {
        mode: Define.MODE.CREATE
      })
    },
    doView (data) {
      this.$goPage(Define.PAGEURL.VIEW, {
        mode: Define.MODE.VIEW,
        id: data.ownerId
      })
    },
    doEdit (data) {
      this.$goPage(Define.PAGEURL.VIEW, {
        mode: Define.MODE.EDIT,
        id: data.ownerId
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

```
Define
```
const Define = {
  TYPE: {
    '1': '类型1',
    '2': '类型2'
  },
  PAGEURL: {
    VIEW: 'test/doc/view'
  },
  MODE: {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    VIEW: 'VIEW'
  }
}
export default Define

```