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
 箭头函数相当于匿名函数, 由于箭头函数的无法绑定this,所以它的this会绑定到上层函数

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
