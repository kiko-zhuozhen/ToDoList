let boo:boolean = true;

let num:number = 1;

let str:string = '1';

let arr:Array<number> = [1,2,3];
let arr2:number[] = [1,2,3];

let und:undefined =undefined;
let nu:null = null;

let some_var: boolean | number = true;

let any_var: any=123; //可以是任何类型

//void
function func():void {
    //如果没有返回任何东西 类型就是void
}

//限制参数类型,最终必须返回一个boolean
function func1(arg:number):boolean {
    return true;
}

//对象：使用接口方法
interface IPerson {
    name:string;
    age:number;
    sex:string;
}

//javascript object

let obj: IPerson = {
    name:'abc',
    age: 20,
    sex:'male'
}
//定义空对象也会报错
//let obj2:IPerson = {}

//可选项
interface IPerson2 {
    name?:string;
    age?:number;
    sex?:string;
}

let obj2:IPerson2 = {} //可以设置空对象

//接口继承,可以继承多个
interface IA extends IPerson {
    hobby:Array<string>;
}

//要写IPerson的信息也要写额外的IA里面的信息
let person2:IA ={
    name:'abc',
    age: 20,
    sex:'male',
    hobby:['eating','sleeping']
}

//与
let person4: IPerson & IA = {
    name:'abc',
    age: 20,
    sex:'male',
    hobby:['eating','sleeping']
}

interface IPerson3 {
    [propName:string]:any; //定义任意属性名称和值
}

let person3: IPerson3 = {
    a:1,
    b:true
};

//implements接口实现
interface IPerson4 {
    name:string;
    age:number;
    sex:string;
    getName: () => string; //一个function可以获得一个string返回值
    getAge(): number;
}

//实现自己的接口
class Person implements IPerson4 {
    name:string ='123';
    age:number = 20;
    sex:string = 'male';
    getName():string {
        return this.name;
    }; 
    getAge(): number {
        return this.age;
    };

    //类自己的方法
    sayHello():void {
    
    }
}

//类型断言
function getLength(str:number | string): number {
    //判断返回类型
    if((str as string).length) {
        return (str as string).length
    } else {
        return str.toString().length
    }
}

//非空断言
function func3 (arg?:string):number {
    return arg!.length;
    //return arg && arg.length 如果arg存在返回length不存在返回null
}

//枚举
enum Color {
    red,
    green,
    blue
}

console.log(Color.red)// 0
console.log(Color.green)// 1

//反向映射
console.log(Color[0]) //Red
console.log(Color[1]) //Green

// 枚举赋值
enum Color2 {
    red,//0
    green = 2, //2
    //如果前一个赋值字符串，那后一个必须也要赋值
    blue //3
}

//泛型:T就是泛型，根据这个属性传一个进去
function func4<T>(arg:T):void {

}

//这里赋值一个number，后面arg位置也必须是number
func4<number>(111)

/*vue装饰器
@component
@watch
@Prop
@Model
@Emit (父组件传递回调函数)
*/

/*
    export default {
        name:"About",
        data() {
            return {
                firstName:'123'
            }
        },
        computed:{
            fullName: {
                get(){
                return this.firstName + this.lastName
                }
                set(){

                }
            }
        }
    }
*/

import { Component, watch } from "vue";

@Component 
export default class About extends Vue {
    firstName:string = '123';
    lastName:string ='456';

    get fullName() {
        return this.firstName + ' ' +this.lastName;
    }

    set fullName(val) {
        const arr = val.split(' ');
        this.firstName = arr[0];
        this.lastName = arr[1];
    }

    modifyFullName(){
        this.fullName = '123123'
    }
}
