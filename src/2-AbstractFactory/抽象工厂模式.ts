interface Chair {
  sitOn():void;
}
interface Sofa {
  lieOn():void;
}
interface CoffeeTable {
  putCoffee(): void;
}

interface FurnitureFactory {
  createChair():Chair;
  createSofa():Sofa;
  createCoffeeTable():CoffeeTable;
}

class ModernChair implements Chair{
  sitOn(): void {
    console.log('坐在现代风格椅子上')
  }
}

class ModernSofa implements Sofa{
  lieOn(): void {
    console.log('躺在现代风格椅子上')
  }
}

class ModernCoffeeTable implements CoffeeTable{
  putCoffee(): void {
    console.log('放置咖啡在现代风格咖啡桌杀上')
  }
}

class ModernFurnitureFactory implements FurnitureFactory{
  createChair(): Chair {
    return new ModernChair()
  }
  createSofa(): Sofa {
    return new ModernSofa()
  }
  createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable()
  }
}

function createFurniture(factory:FurnitureFactory){
  const chair = factory.createChair();
  const sofa = factory.createSofa();
  const coffeeTable = factory.createCoffeeTable();

  chair.sitOn();
  sofa.lieOn();
  coffeeTable.putCoffee();
}

createFurniture(new ModernFurnitureFactory())