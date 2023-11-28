//适配器设计模式的实际示例

// 需求:与出租车价格计算器交互，计算器计算里程和英镑，客户提供公里，并期望以欧元计价的价格。

// 解决方案:创建一个适配器，将输入和输出值转换为预期的格式。

// 在本例中，target是应用程序兼容的接口
export interface TaxiCalculator{
  calculatePriceInEuros(km:number,isAirport:boolean):number;
}

export enum Fares {//票价
  Standard,//标准
  Airport,//机场
}

// Adaptee是一个现有的库，它包含了我们想要重用的逻辑。
export class UKTaxiCalculatorLibrary {
  public getPriceInPounds(miles: number, fare: Fares): number {
      if (fare === Fares.Airport) {
          return 5 + miles * 2.15;
      }
      return miles * 1.95;
  }
}

//出租车计算器适配器使Adaptee的接口与客户机期望的接口兼容。
class UKTaxiCalculatorLibraryAdapter implements TaxiCalculator {
  constructor(private adaptee: UKTaxiCalculatorLibrary) {
  }

  calculatePriceInEuros(km: number, isAirport: boolean): number {
      const miles = km * 1.609;
      const fare = isAirport ? Fares.Airport : Fares.Standard;
      const pounds = this.adaptee.getPriceInPounds(miles, fare);
      const euros = pounds * 1.15;
      return euros;
  }
}

//客户端代码使用实现TaxiCalculator接口的对象，因此我们可以使用适配器来重用不兼容的库
function client(taxiCalculator: TaxiCalculator): void {
  console.log('Calculating the price for a 15 Km run to the airport');
  const priceInEuros = taxiCalculator.calculatePriceInEuros(15, true);
  console.log(`Total price: ${priceInEuros}€`);
}

const incompatibleLibrary = new UKTaxiCalculatorLibrary();
const adaptedLibrary = new UKTaxiCalculatorLibraryAdapter(incompatibleLibrary);
client(adaptedLibrary);




