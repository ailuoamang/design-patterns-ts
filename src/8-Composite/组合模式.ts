//这个模式和树结构以及递归脱不开关系
//我已经有一个灵感，three.js编辑器，方块和方块组的选中，拖拽旋转

export interface Component {
  getPrice(): number;
}

class Product implements Component {
  constructor(private name: string, private price: number) { }

  getPrice(): number {
    return this.price;
  }
}

class Box implements Component {
  private items:Component[]=[];

  constructor(private name:string,private packagingCost:number){}

  addItem(item:Component){
    this.items.push(item);
  }
  removeItem(item:Component){
    this.items=this.items.filter((i)=>i!==item);
  }
  getPrice(): number {
    return (
      this.packagingCost+
      this.items.reduce((acc,item)=>acc+item.getPrice(),0) //巧妙
    )
  }
}

const smallProduct=new Product('Small Product',10);
const smallBox=new Box('small Box',1);

smallBox.addItem(smallProduct);

const bigProduct=new Product("Big Product",100);
const bigBox=new Box('Big Box',5);

bigBox.addItem(bigProduct);
bigBox.addItem(smallBox);

console.log(bigBox.getPrice())
