function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log("Dom元素不存在");
    }
  },
  nodeToFragment(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      //将Dom元素移入frament中
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },

  compileElement(el) {
    var childNodes = el.childNodes;
    var my = this;
    [].slice.call(childNodes).forEach(node => {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (my.isTextNode(node) && reg.test(text)) {
        //判断是符合{{}}的指令
        my.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        my.compileElement(node); //继续递归遍历子节点
      }
    });
  },

  compileText(node, exp) {
    var my = this;
    var initText = this.vm[exp];
    my.updateText(node, initText); //将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function(value) {
      my.updateText(node, value);
    });
  },

  updateText(node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },
  isTextNode: function(node) {
    return node.nodeType == 3;
  }
};
