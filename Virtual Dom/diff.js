var patch = require('./patch');
var listDiff = require('./uilts/list-diff');


/**
 * diff函数,对比两颗树
 * @param {Element} oldTree - 之前的树
 * @param {Element} newTree - 新的Virtual DOM树
 */
function diff(oldTree,newTree){
    var index = 0 ; //当前节点的标志
    var patches = {} ; // 用来记录每个节点差异的对象
    dfsWalk(oldTree,newTree,index,patches);
    return patches;
}

//对两棵树进行深度优先遍历
function dfsWalk(oldNode,newNode,index,patches){
    var currentPatch = [];
    if(typeof(oldNode) === "string" && typeof(newNode) ==="string"){
        //文本内容改变
        if(newNode!==oldNode){
            currentPatch.push({type:patche.TEXT,context:newNode})
        }
    }else if(newNode != null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
        //节点相同,比较属性
        var propsPathes = diffProps(oldNode,newNode);
        if(propsPathes){
            currentPatch.push({type:patch.PROPS,props:propsPathes});
        }
        //比较子节点,如果子节点有'ignore'属性,则不需要比较
        if(isIgnoreChildren(newNode)){
            diffChildren(oldNode.children,newNode.children,index,patches,currentPatch);
        }
    }else if(newNode !== null){
        //新旧节点不相同,用replace替换
        currentPatch.push({type:patch.REPLACE,node:newNode});
    }

    if(currentPatch.length){
        patches[index] = currentPatch;
    }
}