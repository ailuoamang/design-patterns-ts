/*
抽象工厂设计模式的真实世界示例

需求:
    为不同的环境提供不同的基础设施连接器，例如在测试环境中模拟一些依赖关系，在生产环境中使用云服务等。
解决方案:
    创建一个抽象工厂来提供文件系统、数据库和日志提供者的变体。每个环境都有一个具体的工厂。该工厂被配置为为每种类型的环境提供不同的具体的连接器。
    例如，在开发环境中，我们使用控制台记录消息，而在生产环境中，我们使用Sentry服务。
*/
export abstract class DB {
  public abstract connect(): any;
}

export abstract class FS {
  public abstract readFile(filename: string): any;
}

export abstract class LogProvider {
  public abstract log(message: string): any;
}

//具体DB

export class MySQLDB extends DB {
  public connect() {
    console.log('Connected to MySQL');
  }
}

export class InMemoryMockDB extends DB {
  public connect() {
    console.log('Mocking DB in memory');
  }
}

//具体文件系统

export class S3FS extends FS {
  public readFile(filename: string) {
    console.log(`Reading file ${filename} from S3`);
  }
}

export class RealFS extends FS {
  public readFile(filename: string) {
    console.log(`Reading file ${filename} from a real FS`);
  }
}

export class MockFS extends FS {
  public readFile(filename: string) {
    console.log(`Mocking a read file call to ${filename}`);
  }
}

//具体日志系统

export class ConsoleLogProvider extends LogProvider {
  public log(message: string) {
      console.log(`From console: ${message}`);
  }
}

export class SentryLogProvider extends LogProvider {
  public log(message: string) {
      console.log(`From Sentry: ${message}`);
  }
}

//抽象工厂
export abstract class EnvironmentFactory{
  public abstract getDB():DB;
  public abstract getFS():FS;
  public abstract getLogProvider():LogProvider;
}

//最后创建两个具体的工厂，每个环境一个。每个工厂生产不同的具体产品=连接器，取决于每个环境的需求
export class DevEnvironmentFactory extends EnvironmentFactory {
  public getDB(): DB {
      return new InMemoryMockDB();
  }

  public getFS(): FS {
      return new MockFS();
  }

  public getLogProvider(): LogProvider {
      return new ConsoleLogProvider();
  }
}

export class ProdEnvironmentFactory extends EnvironmentFactory {
  public getDB(): DB {
      return new MySQLDB();
  }

  public getFS(): FS {
      return new RealFS();
  }

  public getLogProvider(): LogProvider {
      return new SentryLogProvider();
  }
}
//客户端函数，这个概念要回味一下，就是指未来变化的部分，或者未来的自己要写的代码
//客户端函数接收一个工厂来生成执行应用程序所需的内容。它不关心环境。
function client(environmentFactory: EnvironmentFactory) {
  const db = environmentFactory.getDB();
  db.connect();

  const fs = environmentFactory.getFS();
  fs.readFile('document.txt');

  const logProvider = environmentFactory.getLogProvider();
  logProvider.log('hello world');
}

//基于环境变量，将环境的具体工厂实现注入到客户端函数中
//要是想测试的话，可以使用donv这个库写环境变量配置

if (process.env.NODE_ENV === 'production') {
  client(new ProdEnvironmentFactory());
} else {
  client(new DevEnvironmentFactory());
}