//target定义客户端代码使用的特定于域的接口。
class Target{
  public request():string{
    return 'Target:The default target\'s behavior.';
  }
}

//Adaptee包含一些有用的行为，但是它的接口与现有的客户端代码不兼容。
//在客户端代码使用它之前，Adaptee需要进行一些调整。
class Adaptee{
  public specificRequest():string{
    return '.eetpadA eht fo roivaheb laicepS'
  }
}

//适配器使被适配的接口与目标的接口兼容。
class Adapter extends Target{
  private adaptee:Adaptee;
  constructor(adaptee:Adaptee){
    super();
    this.adaptee=adaptee;
  }
  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter);
