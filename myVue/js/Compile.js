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
      var text = node.textContent;  //获取node中内容

      if (my.isElementNode(node)) {  //如果是node属性中的指令
        my.compile(node); //node属性指令调用compile来解析
      }
      else if (my.isTextNode(node) && reg.test(text)) {  //如果是模板指令
        //判断是符合{{}}的指令
        my.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        my.compileElement(node); //继续递归遍历子节点
      }
    });
  },
  compile(node) {
    var nodeAttrs = node.attributes;
    var my = this;
    Array.prototype.forEach.call(nodeAttrs, attr => {
      var attrName = attr.name;
      if (my.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (my.isEventDirective(dir)) {  //事件指令
          my.compileEvent(node, my.vm, exp, dir);
        } else {  //v-mode 指令
          my.compileModel(node, my.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    })
  },
  compileText(node, exp) {
    var my = this;
    var initText = this.vm[exp];
    my.updateText(node, initText); //将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) {
      my.updateText(node, value);
    });
  },
  compileEvent: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  },
  compileModel: function (node, vm, exp, dir) {
    var my = this;
    var val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value) {
      my.modelUpdater(node, value);
    })

    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      my.vm[exp] = newValue;
      val = newValue;
    })
  },
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  },
  //是否为v-model指令
  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },
  //是否为事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on:') === 0;
  },


  updateText(node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },
  //判断是否为testNode类型
  isTextNode: function (node) {
    return node.nodeType == 3;
  },
  //判断是否是node属性中的指令
  isElementNode: function (node) {
    return node.nodeType == 1;
  }
};
