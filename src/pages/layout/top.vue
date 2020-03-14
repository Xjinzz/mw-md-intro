<template>
    <div class="hearder">
        <div class="fl logo"><img src="../../static/images/logo.png"/></div>
        <div class="fr version fa fa-angle-down">1.0</div>
    </div>
</template>

<script>
export default {
    name: 'Top',
    data(){
        return {
            
        }
    },
    methods:{
        
    }
}

</script>

<style scoped>
.fl{
    float: left;
}

.fr{
    float: right;
}

.clearfix:after{
    content:".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden
}

.xwVueIntro{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
}

.xwVueIntro .hearder{
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #aaacaa;
    margin-bottom: 10px;
}

.xwVueIntro .hearder .logo{
    height: 100%;
}

.xwVueIntro .hearder .logo img{
    object-fit: contain;
    height: 100%;
}

.xwVueIntro .version{
    font-size: 20px;
    color: #888;
    user-select: none;
    height: 100%;
    line-height: 73px;
    position: relative;
    padding-right: 22px;
}

.xwVueIntro .version::before{
    position: absolute;
    right: 0;
}

</style>
