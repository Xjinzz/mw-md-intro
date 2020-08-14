# view页面规范

view表单几天之后也会升级到v-model,暂时按照下面的范例，
### 暂定升级计划
1. 升级v-model之后开始使用vuex进行数据管理，一个view页面store state应该包含两部分：entity(用于后台表单交互数据)、dataSource(用于存储数据源，如下拉、checkbox等)，特别注意：dataSource 不是从vuex直接定义，而是由view => store => service(返回enum) => store commit => 页面使用
2. 保存时候的操作： view event triiger => store action(数据从store.state.entity获取传输) => service => store(clean state.entity) => view

### why
1. 可以使得分层作用更加明确，view专心处理页面显示，不再涉及service；store功能进行数据存储和传输以及链接service和view的中间件作用；service专门用于处理后台的接口以及接口的返回数据二次解析，保证传输到store为正确数据；api专门就管理api地址
2. 保证数据流向，使得数据更好复用和维护，调试更加方便

### demo 
```
<template>
  <a-card :title="pageTitle">
    <a-form :ref="formState.formId" :form="formState.intance">
      <a-col :span="12">
        <a-form-item v-bind="formState.itemLayout" label="用户名">
          <a-input v-decorator="['userName', { rules: formState.rules.userName}]"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item v-bind="formState.itemLayout" label="用户名">
          <a-input v-decorator="['userName1', { rules: formState.rules.userName}]"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item v-bind="formState.itemLayout" label="用户名">
          <a-input v-decorator="['userName2', { rules: formState.rules.userName}]"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item v-bind="formState.itemLayout" label="用户名">
          <a-input v-decorator="['userName3', { rules: formState.rules.userName}]"/>
        </a-form-item>
      </a-col>
      <a-row style="text-align:center">
        <a-button type="primary" @click="save">保存</a-button>
        <a-button @click="goBack">取消</a-button>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import Define from '@/iop/constants/test'
import Service from '@/iop/service/test/service'
import { objectTool } from 'mwutil'
const Entity = {
  userName: '',
  userName1: '',
  userName2: '',
  userName3: ''
}
export default {
  data () {
    return {
      formState: {
        formId: 'testForm',
        intance: this.$form.createForm(this),
        itemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        },
        rules: {
          userName: [
            { required: true, message: '用户名必选' }
          ]
        }
      }
    }
  },
  mounted () {
    (this.isView || this.isEdit) && this.getInfo(this.id)
  },
  computed: {
    id () {
      return this.$route.query.id || ''
    },
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    isView () {
      return this.mode === Define.MODE.VIEW
    },
    isEdit () {
      return this.mode === Define.MODE.EDIT
    },
    isCreate () {
      return this.mode === Define.MODE.CREATE
    },
    pageTitle () {
      const titleMap = new Map()
      titleMap.set(Define.MODE.CREATE, '新建')
        .set(Define.MODE.EDIT, '修改')
        .set(Define.MODE.VIEW, '查看')
      return titleMap.get(this.mode)
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getInfo (id) {
      // 代码略
    },
    save () {
      this.formState.intance.validateFields((err, values) => {
        if (err) return
        const value = this.formState.intance.getFieldValue(objectTool.getKeyList(Entity))
        if (this.isEdit) {
          this.doSaveEdit(Object.assign(value, {
            id: this.id
          }))
        } else {
          this.doSaveCreate(value)
        }
      })
    },
    doSaveEdit (data) {
      Service.doEdit(data)
        .then(x => {
          // 代码略
        })
    },
    doSaveCreate (data) {
      Service.doCreate(data)
        .then(x => {
          // 代码略
        })
    }
  }
}
</script>

```

service demo
```
// import API from '@/iop/api/index'
import BaseService from '@/service/base'
import Enum from './enum'
class TestService extends BaseService {
  getTestData () {
    return Enum.test
  }
  async doCreate (data) {
    // 同以前即可
    return Promise.resolve(data)
  }
  async doEdit (data) {
    // 同以前即可
    return Promise.resolve(data)
  }
}
export default new TestService()

```
Enum demo
```
export default {
  test: [
    {
      name: '名字',
      value: 'code'
    },
    {
      name: '名字1',
      value: 'code1'
    }
  ]
}

```