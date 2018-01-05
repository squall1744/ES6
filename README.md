#### 模板字符串
模板字符串可以很方便的代替ES5字符串拼接，格式如下：

```js
`字符串${变量}字符串`
```
代码示例
```js
let a = {
  name: 'Adam',
  age: 10,
  sex: 'male'
}

let b = `
<p>Hello</p>
<h1>${a.name}</h1>
<p>${a.age}</p>
`;

console.log(b);

/*
<p>Hello</p>
<h1>Adam</h1>
<p>10</p>
*/

```
--------------------------------------------------------------------------------------------------------------------------------
#### 函数扩展
 + 函数默认值
 ```js
//ES5
function show(a, b) {
  var a = a || 8;
  return a + b;
}

//ES6
function show(a=6, b) {
  return a + b;
}
 ```

 + 箭头函数
 ```js
//箭头函数写法
let func = (a=6, b) => {
  console.log(a + b);
  return a + b;
}

console.log(func(undefined, 2)); //8
 ```
 + 箭头函数相当于匿名函数, 由于箭头函数的无法绑定this,所以它的this会绑定到上层函数
-------------------------------------------------------------------------------------------------------------------------------
#### 对象的扩展
 + 对象的简写
 ```js
 let a = 5;

 let obj = {
     a, //相当于 a: a
     b() {
       console.log(this.a);
     } //相当于 b: function() {console.log(a)}
   }
 ```

 + Object.keys(obj) -获得对象所有的key名

 + Object.assign(obj1, obj2,[...obj]) -后面所有的对象合并至obj1中

 + Object.defineProperty(obj, key, {})
 ```js
 Object.defineProperty(obj, key, {
   value: 5, //属性的值
   writable: false, //如果为false, 属性值就不能被重写, 只能为只读
   configurable: false, //一旦为false, 就不能设置其他属性(value, writable, enumerable)
   enumerable: false, //是否能在for...in循环中遍历或Object.keys中列举出来
   get: function() {}, //get访问器
   set: function() {}  //set访问器
 })
 ```
 + class
 ```js

 //创建类
 class Person {

   //构造函数
   constructor(name, sex) {
     this.name = name;
     this.sex = sex;
   }

   //静态方法      在一个方法前加上static关键字, 该方法就不会被实例继承, 直接通过类调用
   static getMethod() {
     return 'hello';
   }  

   //对象的方法
   showName() {
     console.log(this.name);
   }

 }

//类的继承
 class Man extends Person {
   constructor(name, sex, age) {
     super(name, sex); //name, sex属性继承
     this.age = age;
   }
 }
 ```
--------------------------------------------------------------------------------------------------------------------------------
#### 数组的扩展
 + Array.of()
 
 Array.of()方法是为了解决Array构造函数传入一个数值，数组length属性被设定为该值的的问题
 
 ```js
 //Array构造函数
 let items = new Array(2);
 console.log(items.length); //2
 console.log(items[0]); //undefined
 console.log(items[1]); //undefined
 
 //Array.of
 let items = Array.of(2);
 console.log(items.length); //1
 console.log(items[0]); //2
 ```
 + Array.from()
 
 Array.from()方法可以接受可迭代对象或者类数组对象作为第一个参数, 最终返回一个数组，第二个参数为一个映射函数，用来将类数组对象中的每一个值转换成其他形式, 最后将结果存储在结果数组的相应索引中
 
 ```js
 function translate() {
  return Array.from(arguments, value => value + 1);
 }
 
 let numbers = translate(1, 2, 3);
 
 console.log(numbers); //[2,3,4]
 ```
 
 + Array.from()的第三个参数表示映射函数的this值
 
 ```js
 let helper = {
  diff: 1,
  add(value) {
    return value + this.diff
  }
 };
 
 function translate() {
  return Array.from(arguments, helper.add, helper)
 }
 
 let numbers = translate(1, 2, 3);
 
 console.log(numbers);
 ```
 + find()和findIndex()方法
 
 find()和findIndex()方法都接受两个参数: 一个是回调函数; 另一个是可选参数, 用于指定回调函数中this的值。执行回调函数时, 传入的参数分别为: 数组中的
某个元素和该元素在数组中的索引以及数组本身, 与传入map()和forEach()方法的参数相同
 
 ```js
 let numbers = [25, 30, 35, 40, 45];
 
 console.log(numbers.find(n => n > 33)); //35
 console.log(numbers.findIndex(n => n > 33)); //2
 ```
 + fill()
 
 fill()方法可以用指定的值填充一至多个数组元素, 当传入一个值时, fill()方法会用这个值重写数组中的所有值, 第二个参数表示从哪个索引开始, 第三个参数表 
示从哪儿索引结束(不包括该索引), 若不传第三个值, 则从索引开始填充至数组末尾
 
 ```js
 // 一个参数
 let numbers = [1, 2, 3, 4];
 numbers.fill(1);
 console.log(numbers); //[1, 1, 1, 1]
 
 //两个参数
 let numbers = [1, 2, 3, 4];
 numbers.fill(1, 2);
 console.log(numbers); //[1, 2, 1, 1]
 
 //三个参数
 let numbers = [1, 2, 3, 4];
 numbers.fill(0, 1, 3);
 console.log(numbers); //[1, 0, 0, 4]
 ```
 + copyWithin()
 copyWithin()方法与fill()方法相似, 其也可以改变数组中的多个元素。fill()方法是将数组元素赋值为一个指定的值, 而copyWithin()方法则是从数组中复制元素的值, 调用copyWithin()方法时,需要传入两个参数: 一个是该方法的开始填充值的索引位置, 另一个是开始复制值得索引位置, 第三个参是可选参数, 用于指定停止复制的索引位置(不包括该索引)
 
 ```js
 let numbers = [1, 2, 3, 4];
 numbers.copyWithin(2, 0);
 
 console.log(numbers); //[1, 2, 1, 2]
 ```
 
 + 定型数组
 
 待填充
 
--------------------------------------------------------------------------------------------------------------------------------
#### promise与异步编程


 
