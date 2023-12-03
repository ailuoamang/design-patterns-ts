// Flyweight设计模式的真实示例

// 需求:表示一个城市的地图，其中有大量的汽车和卡车，每个都有一个3D模型

// 解决方案:拥有一个共享的3D车辆和建筑模型池

// 看的有点晕，让chatgpt辅助解释下吧，先提了

enum VehicleType {
  Car = 'Car',
  Truck = 'Truck',
  Motorbike = 'Motorbike',
}
enum Direction {
  North = 0,
  NorthEast = 45,
  East = 90,
  SouthEast = 135,
  South = 180,
  SouthWest = 225,
  West = 270,
  NorthWest = 315,
}

// VehicleFlyweight类只存储状态的共享部分
class VehicleFlyWeight {
  public shared3DModel: number[];

  constructor(protected vehicleType: VehicleType) {
    switch (vehicleType) {
      case VehicleType.Car:
        this.shared3DModel = this.readFile('mediumCar.3d');
        break;
      case VehicleType.Motorbike:
        this.shared3DModel = this.readFile("largeTruck.3d")
      default:
        this.shared3DModel = this.readFile('smallMotorbike.3d');
    }
  }
  protected readFile(filename: string): number[] {
    if (/^large/.test(filename)) {
      return Array.from({ length: 1024 * 1024 }, () => Math.random());
    }
    if (/^medium/.test(filename)) {
      return Array.from({ length: 1024 * 256 }, () => Math.random());
    }
    return Array.from({ length: 1024 * 16 }, () => Math.random());
  }

  public render(x: number, y: number, direction: Direction) {
    console.log(`Rendered ${this.vehicleType} in position {${x}, ${y}} with direction ${direction}º`);
  }
}

//Vehicle类包含固有状态和对共享状态的引用
export class Vehicle {
  constructor(
    public vehicleType: VehicleType,
    public x: number,
    public y: number,
    public direction: Direction,
    protected vehicleFlyWeight: VehicleFlyWeight,
  ) { }

  public render(x: number, y: number, direction: Direction) {
    this.vehicleFlyWeight.render(x, y, direction);
  }
}

//VehicleFactory在内部管理所有的Flyweight对象

class VehicleFactory {
  private static vehicleFlyWeights: Map<VehicleType, VehicleFlyWeight> = new Map<VehicleType, VehicleFlyWeight>();


  //检查外部状态是否存在于缓存中，否则创建一个新的状态并存储以备将来重用
  protected static getVehicle(
    vehicleType: VehicleType,
    x: number,
    y: number,
    direction: Direction,
  ): Vehicle {
    if (!this.vehicleFlyWeights.has(vehicleType)) {
      this.vehicleFlyWeights.set(vehicleType, new VehicleFlyWeight(vehicleType));
    }
    return new Vehicle(vehicleType, x, y, direction, this.vehicleFlyWeights.get(vehicleType) as VehicleFlyWeight);
  }

  public static getCar(x: number, y: number, direction: Direction): Vehicle {
    return this.getVehicle(VehicleType.Car, x, y, direction);
  }

  public static getTruck(x: number, y: number, direction: Direction): Vehicle {
    return this.getVehicle(VehicleType.Truck, x, y, direction);
  }

  public static getMotorbike(x: number, y: number, direction: Direction): Vehicle {
    return this.getVehicle(VehicleType.Motorbike, x, y, direction);
  }
}

//客户端代码不知道内部表示，因此没有对Flyweight对象的引用。
console.log('Initially the application takes:');
for (const [key, value] of Object.entries(process.memoryUsage())) {
  console.log(`    ${Math.round(value / (1024 * 1024))}MB of ${key}`);
}

const vehicles: Vehicle[] = [];

for (let i = 0; i < 1000; i += 1) {
  const x = Math.random() * 1000;
  const y = Math.random() * 1000;
  const direction = i % 2 ? Direction.North : Direction.South;
  vehicles.push(VehicleFactory.getCar(x, y, direction));
}

for (let i = 0; i < 500; i += 1) {
  const x = Math.random() * 1000;
  const y = Math.random() * 1000;
  const direction = i % 2 ? Direction.East : Direction.West;
  vehicles.push(VehicleFactory.getTruck(x, y, direction));
}

for (let i = 0; i < 5000; i += 1) {
  const x = Math.random() * 1000;
  const y = Math.random() * 1000;
  const direction = i % 2 ? Direction.SouthEast : Direction.NorthWest;
  vehicles.push(VehicleFactory.getMotorbike(x, y, direction));
}

console.log(`After creating ${vehicles.length} vehicles the application takes:`);
for (const [key, value] of Object.entries(process.memoryUsage())) {//这里计算了一下内存使用量，这个有点东西
  console.log(`    ${Math.round(value / (1024 * 1024))}MB of ${key}`);
}

console.log('Lets create some vehicles flyweights directly to see what happens');

const flyweights: VehicleFlyWeight[] = [];

for (let i = 0; i < 100; i += 1) {
  flyweights.push(new VehicleFlyWeight(VehicleType.Truck));
}

console.log(`After creating ${flyweights.length} flyweights finally the application takes:`);
for (const [key, value] of Object.entries(process.memoryUsage())) {
  console.log(`    ${Math.round(value / (1024 * 1024))}MB of ${key}`);
}


