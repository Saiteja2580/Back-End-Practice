const arr = [1,2,3];
arr.sayHello = ()=>{
    console.log("Hello  World I ama an aray");
}

console.log(Array.prototype);



//factory functiuons used to create objects
function PersonMaker(name,age){
    const person = {
        name:name,
        age : age,
        talk(){
            console.log(`Hi My name is ${this.name}`);
        }
    };
    return person;
}
//to create object from factory function
let p1 = PersonMaker("sai teja",20);
console.log(p1);
p1.talk();

//to create function using constructor
// function Student(name,age,dept){
//     this.name = name;
//     this.age = age;
//     this.dept = dept;
// }
// Student.prototype.talk = function(){
//     console.log(`Hi my name is ${this.name}`);
// }

// let s1 = new Student('Sai Teja',20,'cse');
// let s2  = new Student('Achyuth',19,'cse');
// console.log(s1);
// s1.talk();
// s2.talk();


//using classes and objects to create objects
class Students  {
    constructor(name,age){
        this.name = name;
        this.age =age;
    }

    talk(){
        console.log(`Hi my name is ${this.name}`);
    }
}

let stu = new Students("Sai Teja",25);
let stu2 = new Students("Achyuth",20);



//inheritance in js
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    talk(){
        console.log(`Hi i am ${this.name}`);
    }
}

class Student extends Person{
    constructor(name,age,marks){
        super(name,age);
        this.marks = marks;
    }
}

class Teacher extends Person{
    constructor(name,age,subject){
        super(name,age);
        this.subject = subject;
    }
}

let s = new Student('sai',20,100);
let t = new Teacher('Achyuth',20,'English');