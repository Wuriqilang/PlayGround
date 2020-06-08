function MyVue (data,el,exp){
    var my = this;
    this.data = data;

    Object.keys(data).forEach(key=>{
        my.proxyKeys(key); //绑定代理属性
    })

    obverve(data);
    el.innerHTML = this.data[exp];
    new Wathcher(this,exp,function(value){
        el.innerHTML = value;
    })
    return this;
}

MyVue.prototype = {
    proxyKeys(key){
        var my = this;
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function proxyGetter(){
                return my.data[key];
            },
            set:function proxySetter(newVal){
                my.data[key] = newVal;
            }
        })
    }
}