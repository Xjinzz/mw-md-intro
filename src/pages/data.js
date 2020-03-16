import optimization from "../markdown/guides/optimization.md";
import arrayTool from "../markdown/util/arrayTool.md";
import cookieTool from "../markdown/util/cookieTool.md";
import dateTool from "../markdown/util/dateTool.md";
import log from "../markdown/util/log.md";
import mathTool from "../markdown/util/mathTool.md";
import objectTool from "../markdown/util/objectTool.md";
import stringTool from "../markdown/util/stringTool.md";
import validate from "../markdown/util/validate.md";
import generalTool from "../markdown/util/generalTool.md";






let comps = {
    optimization: {
        title: '优化教程',
        childs: [
            {name:'optimization',source:optimization,title:"前端优化教程"},
        ]
    },
    util:{
        title:"util文档",
        childs:[
            {name:'array',source:arrayTool,title:"arrayTool"},
            {name:'cookie',source:cookieTool,title:"cookieTool"},
            {name:'date',source:dateTool,title:"dateTool"},
            {name:'log',source:log,title:"log"},
            {name:'mathTool',source:mathTool,title:"mathTool"},
            {name:'objectTool',source:objectTool,title:"objectTool"},
            {name:'stringTool',source:stringTool,title:"stringTool"},
            {name:'validate',source:validate,title:"validate"},
            {name:'generalTool',source:generalTool,title:"generalTool"},
            

        ]

    }
}

export default comps;