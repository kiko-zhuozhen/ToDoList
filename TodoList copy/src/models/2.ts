(function(){
    class Animal {
        name:string;
        constructor(name:string){
            this.name = name;
        }
        sayHello(){
            console.log('Barking')
        }
    }

    class Dog extends Animal {
        sayHello() {
            //super是当前类的父类
            super.sayHello();
        }
    }

    const dog = new Dog(name:'hiii');
    dog.sayHello();
})();