// 通过在多个对象之间共享状态的公共部分，而不是将所有数据保存在每个对象中，让您将更多对象放入可用的内存中。

//这个例子里，车牌、所有者是外部数据，、品牌、车型、颜色是内部数据

// Flyweight存储属于多个真实业务实体的状态的公共部分(也称为内在状态)。
// Flyweight通过它的方法参数接受其余的状态(外部状态，每个实体都是唯一的)。

class FlyWeight{
  private sharedState:any;

  constructor(sharedState:any){
    this.sharedState=sharedState;
  }

  public operation(uniqueState: any):void{
    const s=JSON.stringify(this.sharedState);
    const u=JSON.stringify(uniqueState);
    console.log(`FlyWeight :Displaying shared (${s}) and unique (${u}) state.`)
  }
}

// Flyweight工厂创建并管理Flyweight对象。它确保flyweights被正确共享。
// 当客户端请求flyweight时，工厂要么返回一个现有的实例，要么创建一个新的(如果还不存在的话)。

class FlyWightFactory{
  private flyWeights:{[key:string]:FlyWeight}={};

  constructor(initialFlyWeights:string[][]){
    for (const state of initialFlyWeights) {
      this.flyWeights[this.getKey(state)]=new FlyWeight(state);
    }
  }
  // 返回给定状态的Flyweight字符串散列。
  private getKey(state:string[]):string{
    return state.join("_");
  }

  //返回具有给定状态的现有Flyweight或创建一个新的Flyweight。
  public getFlyWeight(sharedState:string[]):FlyWeight{
    const key =this.getKey(sharedState);

    if(!(key in this.flyWeights)){
      console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
      this.flyWeights[key]=new FlyWeight(sharedState);
    }else{
      console.log('FlyweightFactory: Reusing existing flyweight.')
    }
    return this.flyWeights[key]
  }

  public listFlyWeight():void{
    const count=Object.keys(this.flyWeights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyWeights) {
      console.log(key)
    }
  }
}

//客户端代码通常在应用程序的初始化阶段创建一堆预先填充的flyweights。
const factory=new FlyWightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
])
factory.listFlyWeight();

function addCarToPoliceDatabase(
  ff: FlyWightFactory, plates: string, owner: string,
  brand: string, model: string, color: string,
) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyWeight([brand, model, color]);

  // 客户端代码存储或计算外部状态，并将其传递给flyweight的方法。
  // 注意这里，客户端存储实际没做，所以例子看着有点别扭，不如书里的游戏怪兽例子，一个怪兽确实实打实的会创建图片、音乐、等物理资源
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyWeight();