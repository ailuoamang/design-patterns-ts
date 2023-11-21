//#region 强类型实现多态
interface Animal{
  sound():void
}

class Cat2 implements Animal{
  sound(): void {
    console.log('喵喵喵')
  }
}

class Dog2 implements Animal{
  sound(): void {
    console.log('汪汪汪')
  }
}

function makeSound2(animal:Animal){
  animal.sound()
}

makeSound2(new Cat2())
