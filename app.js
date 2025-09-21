require("./text.js");


var x=2;
// const calculateSum=require("./sum.js")
// const {x,calculateSum} = require("./sum.js");
// const Obj = require("./calculate/sum.js");
// import { x,calculateSum } from "./sum.js";
// const { calculateMultiply } = require("./calculate/multiply.js");


const {calculateSum,calculateMultiply}=require("./calculate")
const data =require("./data.json")
// console.log(global);
// console.log(globalThis===global)
// console.log(this)
z = "In Non-Strict mode ";
var a = 10;
var b = 20;
calculateSum(a, b);
// calculateSum(a, b);
calculateMultiply(a, b);

console.log(x);

console.log(z);
console.log(data)


