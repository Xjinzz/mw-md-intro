<template>
  <div class="xwVueIntro">
    <Top></Top>
    <div class="content">
      <!-- 左侧 -->
      <Left></Left>
      <!-- 右侧 -->
      <div class="rightContent">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "./top.vue";
import Left from "./left.vue";
export default {
  name: "Layout",
  components: { Top, Left },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.fl {
  float: left;
}

.fr {
  float: right;
}

* {
  font-family: Helvetica;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.xwVueIntro {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-direction: column;
  -webkit-box-orient: column;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.xwVueIntro .hearder {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #aaacaa;
  margin-bottom: 10px;
}

.xwVueIntro .hearder .logo {
  height: 100%;
}

.xwVueIntro .hearder .logo img {
  object-fit: contain;
  height: 100%;
}

.xwVueIntro .version {
  font-size: 20px;
  color: #888;
  user-select: none;
  height: 100%;
  line-height: 73px;
  position: relative;
  padding-right: 22px;
}

.xwVueIntro .version::before {
  position: absolute;
  right: 0;
}
.xwVueIntro .content {
  flex: 1;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-direction: row;
  -webkit-box-orient: row;
  -moz-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  overflow-y: scroll;
}

.xwVueIntro .content .rightContent {
  overflow-y: scroll;
  padding-bottom: 50px;
  flex: 1;
}
.xwVueIntro .tableContent::-webkit-scrollbar,
.xwVueIntro .leftContent::-webkit-scrollbar,
.xwVueIntro .rightContent::-webkit-scrollbar {
  width: 3px;
  height: 10px;
}
</style>
