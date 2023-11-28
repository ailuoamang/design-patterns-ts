class Singleton{
  private static instance:Singleton;
  private constructor(){};
  public static getInstance():Singleton{
    if(!Singleton.instance){//还能在类里调用类自身的方法，奥，其实也合理，我估计把Singleton删了也可以
      Singleton.instance=new Singleton();
    }
    return Singleton.instance;
  }
  public someBusinessLogic(){
      
  }
}

function clientCode(){
  const s1=Singleton.getInstance();
  const s2=Singleton.getInstance();

  if (s1===s2) {
    console.log('Singleton works, both variables contain the same instances')
  } else {
    console.log('Singleton failed, variables contain different instances.')
  }
}