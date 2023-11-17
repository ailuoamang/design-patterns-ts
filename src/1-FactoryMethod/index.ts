//ts 工厂模式
interface Transport{
  deliver():void;
}

class Truck implements Transport{
  deliver(): void {
    console.log('陆运(卡车)');
  }
}

class Ship implements Transport{
  deliver(): void {
    console.log('海运(船只)')
  }
}

abstract class Logistics {//物流
  transport:Transport | undefined;
  abstract createTransport():Transport;
  // plananddelivery是抽象方法，它要被每一个物流子类所实现。它定义了计划和执行交付的逻辑。
  abstract planDelivery():void;
}

class RoadLogistics extends Logistics{
  createTransport(): Transport {
    return new Truck();
  }
  planDelivery(): void {
    this.transport=this.createTransport();
    this.transport.deliver()
  }
}

class SeaLogistics extends Logistics{
  createTransport(): Transport {
    return new Ship()
  }
  planDelivery(): void {
    this.transport=this.createTransport();
    this.transport.deliver()
  }
}

const roadLogistics=new RoadLogistics();
roadLogistics.planDelivery();

const seaLogistics=new SeaLogistics();
seaLogistics.planDelivery()