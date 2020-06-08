function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub : function(sub){
        this.subs.push(sub);
    },
    notify:function(){
        this.subs.forEach(sub=>{
            sub.update();
        })
    }
}

Dep.target = null;


function Wathcher(vm,exp,cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); //将自己添加到订阅器
}

Wathcher.prototype = {
    update : function(){
        this.run();
    },
    run : function(){
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm,value,oldVal);
        }
    },
    get: function(){
        Dep.target = this;
        var value = this.vm.data[this.exp]; //执行监听器中get函数
        Dep.target = null; //释放自己
        return value;
    }
}