const HelloFunc = require('./helloWorld');

//HelloFunc.Hello();

//console.log(HelloFunc.name);

//setInterval
setInterval(() => {
  HelloFunc.Hello();
}, 1000);

setTimeout(() => {
  console.log(HelloFunc.name);
}, 5000);

//local Module
//Global Module
//3rd Party Module/Package