<template>
    <div class="detailContent">
       <vue-markdown :html="false" :source="comp.source"></vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import COMPS from "../data.js";
export default {
    name: 'comp',
    components:{
        VueMarkdown
    },
    data(){
        return {
            comp:{},
            markdownOption:{

            }
        }
    },
    watch: {
    　　'$route'(to, from) {
            this.init();
    　　}
    },
    computed:{
       
    },
    methods:{
        init(){
            let { group,item } = this.$route.params;
            this.comp = COMPS[group].childs.find(x => x.name == item);
        }
    },
    mounted(){
        this.init();
    }
}

</script>

<style scoped>
>>>.table{
    width: 100%;
    border-collapse: collapse;
}
>>>.table thead{
    background-color: #ebebeb;
}
>>>.table th,>>>.table td{
    height: 30px;
    color: #606266;
    font-size: 15px;
    line-height: 30px;
    border: 1px solid #cac6c6;
    text-align: center;
    word-break: keep-all;
    white-space: nowrap;
    padding: 5px 10px;
}
>>>pre{
    border-radius: 3px;
    border: 1px solid #cac6c6;
    background-color: #333;
    padding: 10px
}
>>>mark{
    font-size: 12px;
    color: red;
    line-height: 20px;
    margin: 5px 0;
    background-color: #ffffff;
}
>>>pre code{
    background: transparent;
}
>>>code{
    background-color: #000;
    color: #ffffff;
    line-height: 20px;
    height: 20px;
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    margin-top: 10px;
}
/* @import "../../static/css/markdown.css"; */
</style>
