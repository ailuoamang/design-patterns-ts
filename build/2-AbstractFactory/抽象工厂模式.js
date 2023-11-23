"use strict";
class ModernChair {
    sitOn() {
        console.log('坐在现代风格椅子上');
    }
}
class ModernSofa {
    lieOn() {
        console.log('躺在现代风格椅子上');
    }
}
class ModernCoffeeTable {
    putCoffee() {
        console.log('放置咖啡在现代风格咖啡桌杀上');
    }
}
class ModernFurnitureFactory {
    createChair() {
        return new ModernChair();
    }
    createSofa() {
        return new ModernSofa();
    }
    createCoffeeTable() {
        return new ModernCoffeeTable();
    }
}
function createFurniture(factory) {
    const chair = factory.createChair();
    const sofa = factory.createSofa();
    const coffeeTable = factory.createCoffeeTable();
    chair.sitOn();
    sofa.lieOn();
    coffeeTable.putCoffee();
}
createFurniture(new ModernFurnitureFactory());
