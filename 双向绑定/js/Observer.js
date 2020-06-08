function obverve(data){
    if(!data || typeof data !== 'object'){
        return;
    }
    Object.keys(data).forEach(key=>{
        difineReactive(data,key,data[key]);
    })
}

function difineReactive(data,key,val){
    obverve(val); //遍历所有子属性
    var dep = new Dep();
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            if(Dep.target){
                dep.addSub(Dep.target); //添加订阅者
            }
            return val;
        },
        set:function(newVal){
            if(val === newVal){
                return;
            }
            val = newVal;
            console.log('属性'+key+'已加入监听器,现在值为:"'+newVal.toString()+'"');
            dep.notify(); //数据变化,通知所有订阅者
        }
    })
}




//测试
// var demo = {
//     data1:{
//         name:''
//     },
//     data2:''
// }
// obverve(demo);
// demo.data1.name="haha"
// //属性name已加入监听器,现在值为:"haha"
// demo.data2 = 'test'
//属性data2已加入监听器,现在值为:"test"
