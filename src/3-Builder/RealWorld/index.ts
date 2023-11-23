/*
构建器设计模式需要的真实例子:有一个具有大量可选参数和一些复杂逻辑的User类

解决方案:创建一个新类，它知道如何按部分构建用户
*/
enum Gender {Male='Male',Female='Female',Undefined='Undefined'}

export class user {
  public name: string;
  public surname: string;
  public email:string;
  public gender:Gender;

}