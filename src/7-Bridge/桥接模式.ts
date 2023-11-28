//经典的把继承改为组合
//用于多维度时，降低继承时的排列组合，
//换句话说是，通过前期的排列组合，降低客户端的排列组合
interface Color{
  getColor():string;
}
interface Shape{
  getShape():string;
}

class Red implements Color{
  getColor():string{
    return "red";
  }
}

class Circle implements Shape{
  getShape(): string {
    return "circle";
  }
}

abstract class ShapeWithColor{
  constructor(protected color:Color,protected shape:Shape){}
  abstract draw():void;
}

class RedCircle extends ShapeWithColor{
  draw(): void {
    console.log(`${this.color.getColor()} ${this.shape.getShape()}`)
  }
}

const redCircle=new RedCircle(new Red(),new Circle());
redCircle.draw();