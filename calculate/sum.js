// Modules protect their variables and functions from leaking

console.log("sum module executed");

 var x = "hello world";

  function calculateSum(a, b) {
  const sum = a + b;
  console.log(sum);
}

// module.exports = {
//   x: x,
//   calculateSum: calculateSum,
// };

module.exports = {
  x,
  calculateSum,
};
