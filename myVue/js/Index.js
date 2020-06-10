function MyVue(options) {
  var my = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(function(key) {
    my.proxyKeys(key); //绑定代理属性
  });

  obverve(this.data);
  // el.innerHTML = this.data[exp];
  // new Wathcher(this,exp,function(value){
  //     el.innerHTML = value;
  // })
  new Compile(options.el, this);
  options.mounted.call(this); //所有事情处理好后执行mounted函数
}

MyVue.prototype = {
  proxyKeys(key) {
    var my = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function proxyGetter() {
        return my.data[key];
      },
      set: function proxySetter(newVal) {
        my.data[key] = newVal;
      }
    });
  }
};
