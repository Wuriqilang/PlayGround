import patch from './patch.js';  //存放差异类型
import listDiff from './uilts/list-diff.js'; //实现列表对比算法

/**
 * diff函数,对比两颗树
 * @param {Element} oldTree - 之前的树
 * @param {Element} newTree - 新的Virtual DOM树
 */
function diff(oldTree, newTree) {
    var index = 0; //当前节点的标志
    var patches = {}; // 用来记录每个节点差异的对象
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

//对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = [];
    if (typeof (oldNode) === "string" && typeof (newNode) === "string") {
        //文本内容改变
        if (newNode !== oldNode) {
            currentPatch.push({ type: patch.TEXT, content: newNode })
        }
    } else if (newNode != null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        //节点相同,比较属性
        var propsPathes = diffProps(oldNode, newNode);
        if (propsPathes) {
            currentPatch.push({ type: patch.PROPS, props: propsPathes });
        }
        //比较子节点,如果子节点有'ignore'属性,则不需要比较
        if (!isIgnoreChildren(newNode)) {
            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
        }
    } else if (newNode !== null) {
        //新旧节点不相同,用replace替换
        currentPatch.push({ type: patch.REPLACE, node: newNode });
    }

    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

// 遍历子节点
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) {
        var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
        currentPatch.push(reorderPatch)
    }

    var leftNode = null
    var currentNodeIndex = index
    oldChildren.forEach((child, i) => {
        var newChild = newChildren[i]
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches)
        leftNode = child
    })
}

// 比较节点属性
function diffProps(oldNode, newNode) {
    var count = 0
    var oldProps = oldNode.props
    var newProps = newNode.props
    var propsPatches = {}
    // 查找属性值不同的属性
    for (var key in oldProps) {
        if (newProps[key] !== oldProps[key]) {
            count++
            propsPatches[key] = newProps[key]
        }
    }
    // 查找新属性
    for (var key in newProps) {
        if (!oldProps.hasOwnProperty(key)) {
            count++
            propsPatches[key] = newProps[key]
        }
    }
    // 没有属性改变
    if (count === 0) {
        return null
    }
    return propsPatches
}

function isIgnoreChildren(node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}

export default diff;