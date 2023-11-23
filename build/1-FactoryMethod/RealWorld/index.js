"use strict";
// 工厂方法设计模式的真实例子
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConnectionFactory = exports.MongoConnectionFactory = exports.DBConnectionFactory = exports.RedisConnection = exports.MongoConnection = exports.DBConnection = void 0;
// 需要:创建不同的数据库连接器，并能够使用环境变量切换连接器
// 解决方案:创建一个带有工厂方法的抽象类，该方法返回数据库连接的具体实现
//写完这个，就有个思考了，感觉好像写个switch也行啊，干嘛这么麻烦
//要时刻把自己处于生产者状态，意识到这个代码会有被扩展的可能性
//代码不仅是给现在写的，也是给未来写的
class DBConnection {
    connect() {
        console.log(`Connected to ${this.provider}`);
    }
}
exports.DBConnection = DBConnection;
class MongoConnection extends DBConnection {
    constructor() {
        super();
        this.provider = 'Mongo DB';
    }
}
exports.MongoConnection = MongoConnection;
class RedisConnection extends DBConnection {
    constructor() {
        super();
        this.provider = 'Redis';
    }
}
exports.RedisConnection = RedisConnection;
class DBConnectionFactory {
}
exports.DBConnectionFactory = DBConnectionFactory;
class MongoConnectionFactory extends DBConnectionFactory {
    createDBConnection() {
        return new MongoConnection();
    }
}
exports.MongoConnectionFactory = MongoConnectionFactory;
class RedisConnectionFactory extends DBConnectionFactory {
    createDBConnection() {
        return new RedisConnection();
    }
}
exports.RedisConnectionFactory = RedisConnectionFactory;
function main(dbConnectonFactory) {
    const dbConnection = dbConnectonFactory.createDBConnection();
    dbConnection.connect();
}
switch (process.env.DB) {
    case 'Mongo':
        main(new MongoConnectionFactory());
        break;
    case 'Redis':
        main(new RedisConnectionFactory());
    default:
        console.error('Unknown DB');
}
