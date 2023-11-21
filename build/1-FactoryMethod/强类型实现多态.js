"use strict";
class Cat2 {
    sound() {
        console.log('喵喵喵');
    }
}
class Dog2 {
    sound() {
        console.log('汪汪汪');
    }
}
function makeSound2(animal) {
    animal.sound();
}
makeSound2(new Cat2());
