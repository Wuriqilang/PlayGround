function MyVue(options) {
  var my = this;
  this.vm = this;
  this.data = options.data;

  Object.keys(this.data).forEach(function(key) {
    my.proxyKeys(key); //绑定代理属性
  });

  obverve(this.data);
  // el.innerHTML = this.data[exp];
  // new Wathcher(this,exp,function(value){
  //     el.innerHTML = value;
  // })
  new Compile(options.el, this.vm);
  return this;
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
