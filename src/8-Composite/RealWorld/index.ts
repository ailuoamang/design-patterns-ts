// 需要:计算包含其他包裹的包裹的总价格

// 解决方案:为只包含产品(叶子)的包和包含其他包的包创建一个公共接口

//基包(组件)类声明了公共操作。在本例中，不需要删除对父节点的引用。

export abstract class PackageComponent {
  constructor(public title: string) { };
  public add(packageComponent: PackageComponent): void { };
  public remove(packageComponent: PackageComponent): void { };

  public isComposite(): boolean {
    return false;
  }

  public abstract getPrice(): number;
}

//Product (Leaf)类只有getPrice实现

export class ProductLeaf extends PackageComponent {
  constructor(title: string, protected price: number) {
    super(title);
  }
  public getPrice(): number {
    return this.price;
  }
}

//MultiPackage (Composite)类表示包含其他包的复杂包

class MultiPackageComposite extends PackageComponent {
  protected childrenPackages: PackageComponent[] = [];

  public add(packageComponent: PackageComponent): void {
    this.childrenPackages.push(packageComponent);
  }

  public remove(packageComponent: PackageComponent): void {
    const index = this.childrenPackages.indexOf(packageComponent);
    this.childrenPackages.splice(index, 1);
  }

  public isComposite(): boolean {
    return true;
  }

  public getPrice(): number {
    return this.childrenPackages.reduce((prev, curr) => prev + curr.getPrice(), 0);
  }
}

// Helper (builder)函数隐藏有2个具体的包组件
function getGalaxyS68Pack(): PackageComponent {
  const complexMobilePackage = new MultiPackageComposite('Galaxy S68 Pack');
  complexMobilePackage.add(new ProductLeaf('Galaxy S68', 900));
  complexMobilePackage.add(new ProductLeaf('S68 Charger', 25));
  complexMobilePackage.add(new ProductLeaf('S68 Case', 15));
  return complexMobilePackage;
}

function getCanonM50Pack(): PackageComponent {
  const complexCameraPackage = new MultiPackageComposite('Canon M50 Pack');
  complexCameraPackage.add(new ProductLeaf('Canon M50', 600));
  complexCameraPackage.add(new ProductLeaf('A50 1.8 Lens', 250));
  complexCameraPackage.add(new ProductLeaf('128 Gb Micro SD', 40));
  complexCameraPackage.add(new ProductLeaf('Canon Generic Case', 150));
  return complexCameraPackage;
}

function getHeadphones(): PackageComponent {
  return new ProductLeaf('HyperX Cloud Flight', 150);
}

//客户端代码总是与基本包组件一起工作
const galaxyPackage: PackageComponent = getGalaxyS68Pack();
const canonPackage: PackageComponent = getCanonM50Pack();
const simpleHeadphonesPackage: PackageComponent = getHeadphones();

const mainShipment: PackageComponent = new MultiPackageComposite('Main Shipment');
mainShipment.add(galaxyPackage);
mainShipment.add(canonPackage);
mainShipment.add(simpleHeadphonesPackage);

console.log(`Total shipment cost: ${mainShipment.getPrice()}€`);
