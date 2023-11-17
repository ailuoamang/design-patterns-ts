// 因为js对象天然的支持多态，所以实际上在js里多态可以更简单
// 这里使用js实现，作为和传统静态编译语言的对照
// 下面是写的比较好的理解，里面有提到几本思想来源的书
// https://github.com/LinDaiDai/niubility-coding-js/blob/master/JavaScript/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E4%B8%89%E8%A6%81%E7%B4%A0/JS%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E6%9C%80%E5%90%8E%E4%B8%80%E5%BC%B9-%E5%A4%9A%E6%80%81%E7%AF%87(%E7%BE%BD%E5%8C%96%E5%8D%87%E4%BB%99).md

//主人想让猫狗猪叫
//形似多态
class Cat{};
class Dog{};
class Pig{};

function makeSound(animal){
  if(animal instanceof Cat){
    console.log('喵喵喵')
  }else if(animal instanceof Dog){
    console.log('汪汪汪')
  }else if(animal instanceof Pig){
    console.log('哼哼哼')
  }
}

let cat=new Cat();
let dog=new Dog();
let pig=new Pig();

makeSound(cat);