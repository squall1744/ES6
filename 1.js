let a = 5;

let obj = {
    a, //相当于 a: a
    b() {
      console.log(this.a);
    } //相当于 b: function() {console.log(a)}
  }

console.log(Object.keys(obj));
