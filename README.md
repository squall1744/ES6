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


 + Promise的基础知识

 Promise的意思就是承诺, 承诺在未来的某个时刻完成函数执行, 它相当于异步操作结果的占位符, 它不会去绑定一个事件, 也不会传递一个回调函数给目标函数, 而是让函数返回一个Promise对象


 + Promise生命周期

 每个promise都会经历一个短暂的生命周期: 先是进行中(pending)的状态, 此时操作尚未完成, 所以它也是未处理(unsettled)的; 一旦异步操作执行结束, Promise则变为已处理(settled)状态，已处理状态包括fulfilled（已成功）和rejected（已失败）两种情况。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就变为我们上面说的已处理(settled)状态。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。


 + 基本用法

Promise对象是一个构造函数，用来生成Promise实例。

下面代码创造了一个Promise实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是```resolve```和```reject```。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。下面是一个promise实例

```js
 let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以会先执行Hi, resolved最后输出。

----------------------------------------------------------------------------------------

#### this

 this就是call的第一个参数, 所谓参数, 只有在调用的时候才能传进去, 因此this作为参数, 只有在调用的时候才知道绑定对象

 + 被当做对象的方法调用

 如果该函数是被当做某一个对象的方法，那么该函数的this指向该对象

 ```js
 let obj = {
   foo: function(){
     console.log(this)
   }
 }

 let bar = obj.foo;
 obj.foo(); //this是obj
 bar(); //this是window
 ```

```js
 var john = {
  firstName: "John"
 }
 function func() {
  alert(this.firstName + ": hi!")
 }
 john.sayHi = func
 john.sayHi()  // this = john
```
 这里有一点值得注意，当一个对象的方法被取出来赋值给一个变量时，该方法变为函数触发，this指向window或underfind（严格模式）。

  + 函数之内调用

  当函数中有 this，其实就意味着它被当做方法调用，之间调用相当于把他当做window对象的方法，this指向window，值得注意的是ES5其实是规定这种情况this=undefined的，只浏览器大多还是按照老的方法执行(本人在最新版的Chrome，Safari，Firefox中测试都指向window（201607）),在火狐下使用严格模式指向undefined；

  ```js
  func()
  function func() {
    alert(this) // [object Window] or [object global] or kind of..
  }
  ```
  为了传递this，()之前应该为引用类型，类似于obj.a 或者 obj['a'],不能是别的了。

  这里还存在一个小坑，当对象的方法中还存在函数时，该函数其实是当做函数模式触发，所以其this默认为window（严格模式下为undefined）解决办法是给该函数绑定this。

  ```js
  var numbers = {  
    numberA: 5,
    numberB: 10,
    sum: function() {
      console.log(this === numbers); // => true
      function calculate() {
        // this is window or undefined in strict mode
        console.log(this === numbers); // => false
        return this.numberA + this.numberB;
      }
      return calculate();
    }
  };
  numbers.sum(); // => NaN or throws TypeError in strict mode
  ```

  ```js
  var numbers = {  
    numberA: 5,
    numberB: 10,
    sum: function() {
      console.log(this === numbers); // => true
      function calculate() {
        console.log(this === numbers); // => true
        return this.numberA + this.numberB;
      }
      // use .call() method to modify the context
      return calculate.call(this);
    }
  };
  numbers.sum(); // => 15  
  ```

  + 在new中调用

  一个引用对象的变量实际上保存了对该对象的引用，也就是说变量实际保存的是对真实数据的一个指针。使用new关键字时this的改变其实有以下几步：

  1. 创建 this = {}.
  2. new执行的过程中可能改变this，然后添加属性和方法；
  3. 返回被改变的this.

  ```js
  function Animal(name) {
    this.name = name
    this.canWalk = true
  }
  var animal = new Animal("beastie")
  alert(animal.name)
  ```
  需要注意的是如果构造函数返回一个对象，那么this指向返回的那个对象；

  ```js
  function Animal() {
    this.name = 'Mousie';
    this.age = '18';
    return {
        name: 'Godzilla'
    } // <-- will be returned
  }

  var animal = new Animal()
  console.log(animal.name) // Godzilla
  console.log(animal.age)//undefined
  ```
 这里需要注意的是不要忘记使用new，否则不会创建一个新的函数。而是只是执行了函数，相当于函数调用，this其实指向window

 ```js
 function Vehicle(type, wheelsCount) {  
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
  }
  // Function invocation
  var car = Vehicle('Car', 4);  
  car.type;       // => 'Car'  
  car.wheelsCount // => 4  
  car === window  // => true
 ```

 + 明确调用this，使用call和apply

 第一个参数将作为this的指代对象，之后的参数将被作为函数的参数，解决方法是使用bind。

 ```js
 function Animal(type, legs) {  
  this.type = type;
  this.legs = legs;  
  this.logInfo = function() {
    console.log(this === myCat); // => true
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
  };
  }
  var myCat = new Animal('Cat', 4);  
  // logs "The Cat has 4 legs"
  setTimeout(myCat.logInfo.bind(myCat), 1000);
  // setTimeout??
 ```

 ```js
 var john = {
  firstName: "John",
  surname: "Smith"
 };
 function func(a, b) {
   alert( this[a] + ' ' + this[b] );
 }
 func.call(john, 'firstName', 'surname');  // "John Smith"
 ```
 至于apply，其只是以数组的方传入参数，其它部分是一样的，如下:

 ```js
 func.call(john, 'firstName', 'surname');
 func.apply(john, ['firstName', 'surname']);
 ```

 它们也可用于在 ES5 中的类继承中，调用父级构造器。

 ```js
 function Runner(name) {  
   console.log(this instanceof Rabbit); // => true
   this.name = name;  
 }
 function Rabbit(name, countLegs) {  
    console.log(this instanceof Rabbit); // => true
    // 间接调用，调用了父级构造器
    Runner.call(this, name);
    this.countLegs = countLegs;
 }
 var myRabbit = new Rabbit('White Rabbit', 4);  
    myRabbit; // { name: 'White Rabbit', countLegs: 4 }
 ```

 + bind()
 对比方法 .apply() 和 .call()，它俩都立即执行了函数，而 .bind() 函数返回了一个新方法，绑定了预先指定好的 this ，并可以延后调用。.bind() 方法的作用是创建一个新的函数，执行时的上下文环境为 .bind() 传递的第一个参数，它允许创建预先设置好 this 的函数。

 ```js
 var numbers = {  
   array: [3, 5, 10],
   getNumbers: function() {
     return this.array;    
   }
 };
 // Create a bound function
 var boundGetNumbers = numbers.getNumbers.bind(numbers);  
 boundGetNumbers(); // => [3, 5, 10]  
 // Extract method from object
 var simpleGetNumbers = numbers.getNumbers;  
 simpleGetNumbers(); // => undefined or throws an error in strict mode  
 ```
 使用.bind()时应该注意，.bind() 创建了一个永恒的上下文链并不可修改。一个绑定函数即使使用 .call() 或者 .apply()传入其他不同的上下文环境，也不会更改它之前连接的上下文环境，重新绑定也不会起任何作用。只有在构造器调用时，绑定函数可以改变上下文，然而这并不是特别推荐的做法。

 + 箭头函数

 箭头函数并不创建它自身执行的上下文，使得 this 取决于它在定义时的外部函数。箭头函数一次绑定上下文后便不可更改，即使使用了上下文更改的方法：

 ```js
 var numbers = [1, 2];  
 (function() {  
   var get = () => {
     console.log(this === numbers); // => true
     return this;
   };
   console.log(this === numbers); // => true
   get(); // => [1, 2]
   // 箭头函数使用 .apply() 和 .call()
   get.call([0]);  // => [1, 2]
   get.apply([0]); // => [1, 2]
   // Bind
   get.bind([0])(); // => [1, 2]
 }).call(numbers);
 ```
 这是因为箭头函数拥有静态的上下文环境，不会因为不同的调用而改变。因此不要使用箭头函数定义方法

 ```js
 function Period (hours, minutes) {  
    this.hours = hours;
    this.minutes = minutes;
  }
 Period.prototype.format = () => {  
   console.log(this === window); // => true
   return this.hours + ' hours and ' + this.minutes + ' minutes';
 };
 var walkPeriod = new Period(2, 30);  
 walkPeriod.format(); // => 'undefined hours and undefined minutes'
 ```
