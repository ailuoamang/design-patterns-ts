// 意图:为另一个对象提供代理或占位符来控制对原始对象的访问或添加其他职责。
// 问题他和包装器、装饰器模式有什么区别？

// Subject接口为RealSubject和Proxy声明了通用操作。
// 只要客户端使用这个接口与RealSubject一起工作，你就可以向它传递一个代理而不是一个真正的subject。

interface Subject {
  request(): void;
}

// RealSubject包含一些核心业务逻辑。
// 通常，真实对象能够做一些有用的工作，但也可能非常缓慢或敏感——例如纠正输入数据。
// 代理可以解决这些问题，而无需对RealSubject的代码进行任何更改。

class RealSubject implements Subject {
  public request(): void {
    console.log('Real:处理请求')
  }
}

// 代理具有与RealSubject相同的接口。
class ProxySubject implements Subject {
  private realProject: RealSubject;

  constructor(realProject: RealSubject) {
    this.realProject = realProject;
  }
  // 代理模式最常见的应用是延迟加载、缓存、控制访问、日志记录等。
  // 代理可以执行这些操作之一，然后根据结果，将执行传递给链接的RealSubject对象中的同一个方法。
  public request(): void {
    if (this.checkAccess()) {
      this.realProject.request();
      this.logAccess()
    }
  }

  private checkAccess(): boolean {
    // Some real checks should go here.
    console.log('Proxy:在触发真正的请求前检查访问权限')
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: 记录请求时间.');
  }

}

// 客户端代码应该通过Subject接口处理所有对象(包括主体和代理)，以便同时支持真实的主体和代理。
// 然而，在现实生活中，客户大多直接与他们的真实对象打交道。
// 在这种情况下，为了更容易地实现模式，您可以从真实主题的类扩展代理。
function clientCode(subject: Subject) {
  // ...

  subject.request();

  // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new ProxySubject(realSubject);
clientCode(proxy);