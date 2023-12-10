// Intent:允许你通过处理程序链传递请求。在收到请求后，每个处理程序决定是处理请求还是将其传递给链中的下一个处理程序。

interface Handler{
  setNext(handler:Handler):Handler;
  handler(request:string):string;
}

//默认的链接行为可以在基本处理程序类中实现
abstract class AbstractHandler implements Handler {
  private nextHandler:Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler=handler;
    return handler;  
  }

  public handle(request: string): string {
    if(this.nextHandler){
      return this.nextHandler.handler(request);
    }
    return null;//这块看看怎么写类型
  }
}

//所有具体处理程序要么处理请求，要么将其传递给链中的下一个处理程序。
class MonkeyHandler extends AbstractHandler{
  public handler(request: string): string {
    if(request==='Banana'){
      return `Monkey:i'll eat the ${request}`;
    }
    //不是很懂他这里return super.handler
    //我懂了，他调用父类的handler，怪不得父类的实现和子类不一样
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
      if (request === 'Nut') {
          return `Squirrel: I'll eat the ${request}.`;
      }
      return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
      if (request === 'MeatBall') {
          return `Dog: I'll eat the ${request}.`;
      }
      return super.handle(request);
  }
}

/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  for (const food of foods) {
      console.log(`Client: Who wants a ${food}?`);

      const result = handler.handle(food);
      if (result) {
          console.log(`  ${result}`);
      } else {
          console.log(`  ${food} was left untouched.`);
      }
  }
}

/**
* The other part of the client code constructs the actual chain.
*/
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * The client should be able to send a request to any handler, not just the
 * first one in the chain.
 */
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);