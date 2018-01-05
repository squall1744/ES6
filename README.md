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
 
 Array.from()的第三个参数表示映射函数的this值
 
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
 
 + 异步编程的背景知识
 
  JavaScript引擎是基于单线程(Single-threaded)事件循环的概念构建的, 同一时刻只允许一个代码块在执行, 与之相反的是像Java和C++一样的语言, 它们允许多个不同的代码块同时执行。对于基于线程的软件而言, 当多个代码块同时访问并改变状态时, 程序很难维护并保证状态不会出错。
  JavaScript引擎同一时刻只能执行一个代码块, 所以需要跟踪即将运行的代码, 那些代码被放在一个任务队列(job queue)中, 每当一段代码准备执行时, 都会被添加到任务队列。每当JavaScript引擎中的一段代码结束执行, 事件循环(event loop)会执行队列中的下一个任务, 它是JavaScript引擎中的一段程序, 负责监控代码执行并管理任务队列。队列中的任务会从第一个按顺序执行到最后一个。
  JavaScript作为一门为web而生的语言, 他一开始就需要能够响应异步的用户交互, 如点击等操作。所以异步编程一直作为JavaScript的一个强大功能而存在,再加上Nodejs用回调函数代替了事件, 使异步编程在JavaScript领域变得更加流行, 但是随着更多程序开始使用异步编程后, 事件和回调函数已经无法满足开发者的需求, 因此ES6中就加入了Promise用来处理更复杂的需求。
  
 + 事件模型
 
 用户点击按钮或按下键盘上的按键会触发类似onclick这样的事件, 它会向任务队列添加一个新任务来响应用户的操作, 这是JavaScript种最基础的异步编程形式, 直到事件触发时才执行事件处理程序, 且执行上下文与定义时的相同。
 
 ```js
 let button = document.querySelector('.btn');
 button.addEventListener('click', function(event) {
  console.log('clicked');
 })
 ```
 这段代码中, 点击button后会执行console.log('clicked'), 监听器内的函数被添加到任务队列中, 只有当前面的任务都完成后它才会被执行。
 事件模型适用于处理简单的交互, 然后将多个独立的异步调用连接在一起会是程序更加复杂, 你必须跟踪每个事件的事件目标(如代码中的button)。此外, 必须要保证事件在添加事件处理程序之后才会被触发。尽管事件模型适用于响应用户交互和完成类似的低频功能, 但是对于更复杂的需求来说, 它并不是很灵活。
 
 + 回调模式
 
 Nodejs通过普及回调函数来改进异步编程模型, 回调模式与事件模型类似, 异步代码会在未来的某个时间点执行, 二者的区别是回调模式中被调用的函数时作为参数传入的
 
 ```js
 readFile('example.txt', function(err, contents) {
  if (err) {
    throw err;
  }
  console.log(contents);
 })
 
 console.log('Hi!');
 ```
 
 上面nodejs代码就是典型的回调模式。readFile()函数读取磁盘上的某个文件(example.txt), 读取结束后执行回调函数(function(err, contents){})。如果出现错误, 错误对象会被赋值给回调函数的err参数; 如果一切正常, 文件内容会以字符串的形式被赋值给contents参数。
 由于使用了回调模式, readFile()函数在读取文件时, 暂时不会执行回调函数。也就是说, 调用readFile()函数后, 会先执行后面的console.log('Hi!'), 当readFile()结束执行时, 会向任务队列末尾添加一个新任务, 该任务包含回调函数, 当队列前面所有的任务完成后才执行该任务。
 回调模式比事件模型更灵活, 可以通过回调函数链接多个回调
 
 ```js
 readFile('example.txt', function(err, contents) {
  if (err) {
    throw err;
  }
  
  writeFile('example.txt', function() {
    if (err) {
      throw err;
    }
    
    console.log('File was written!');
  });
 });
 ```
 
 上面的例子就是一个典型的回调链接, 这段代码在成功调用readFile()函数后会执行另一个writeFile()函数的异步调用。当readFile()函数执行完成后, 会向任务队列中添加一个任务, 如果没有错误产生, 则执行writeFile()函数, 然后当writeFile()函数执行结束后, 也像任务队列中添加一个任务。
 虽然这个模式很灵活, 运行效果也不错, 但是大家想想, 层层嵌套回调函数, 很快大家就会进入回调地狱中, 把自己搞晕了。另外并行执行两个异步操作时, 当两个操作都结束时通知你; 又或者同时进行两个异步操作, 只取优先完成的结果。这种情况, 你就需要跟踪多个回调函数并清理操作, 而promise就能非常好地改进这种情况。
 
 
 
 
 

 


 
