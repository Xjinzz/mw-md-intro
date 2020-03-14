<template>
  <div class="leftContent">
    <ul v-for="(value,key) in comps" :key="key">
      <li>
        <a class="componentTitle" @click="handleShow(value)">{{value.title}}</a>
        <transition-group name="list" tag="ul">
          <li v-for="(item,idx) in value.childs" :key="idx+'.1'" v-show="value.show">
            <router-link :to="{path:`/${key}/${item.name}`}">{{item.title?item.title:item.name}}</router-link>
          </li>
        </transition-group>
      </li>
    </ul>
  </div>
</template>

<script>
import data from "../data.js";
export default {
  name: "Left",
  data() {
    return {
      comps: data
    };
  },
  computed: {},
  methods: {
    handleShow(val) {
      val.show ? this.$set(val, "show", false) : this.$set(val, "show", true);
    }
  },
  mounted() {}
};
</script>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.active {
  color: red !important;
  font-size: 14px;
}
a{
    cursor: pointer;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.leftContent {
  width: 240px;
  text-align: left;
  overflow-y: scroll;
  padding-bottom: 50px;
}

.leftContent li {
  color: #444;
  line-height: 40px;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  cursor: pointer;
}

.leftContent li .componentTitle {
  font-size: 16px;
  color: #333;
  line-height: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-weight: 700;
}

.leftContent li a {
  display: block;
  height: 40px;
  color: #333;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  text-decoration: none;
}
.leftContent li .router-link-exact-active.router-link-active {
  color: red;
}
</style>
