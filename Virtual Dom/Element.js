/**
 * Element Virtual-dom 对象定义
 * @param {String} tagName - dom元素名称
 * @param {Object} props - dom属性
 * @param {Array<ELEMENT|String>} -子节点
 */
function Element(tagName,props,children){
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    //dom元素的key值,用作唯一标识符
    if(props.key){
        this.key = props.key
    }
    var count = 0 ;
    children.forEach((child,i) => {
        if(child instanceof Element){
            count += child.count;
        }else{
            children[i] = '' + child;
        }
        count ++;
    });
    //子元素的个数
    this.count = count;
}


/**
 * render 将virdual-dom对象渲染为真实DOM元素
 */

 Element.prototype.render = function(){
     var el = document.createElement(this.tagName);
     var props = this.props;
     //设置节点DOM属性
     for(var propName in props){
         var propValue = props[propName];
         el.setAttribute(propName,propValue);
     }

     var children = this.children||[];
     children.forEach(child=>{
         var childEl = (child instanceof Element)
         ?child.render() //如果子节点也是虚拟DOM,递归构建DOM节点
         :document.createTextNode(child);  //如果是字符串,只构建文本节点
         el.appendChild(childEl);
     })
     return el;
 }


function createElement(tagName,props,children){
    return new Element(tagName,props,children);
}

export default createElement;