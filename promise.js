//Creating Promise Object ::::

// let pr = new Promise((resolve, reject) => {
//   resolve("Success");
//   reject("Fail");
// });

// pr.then((msg) => {
//   console.log(msg);
// }).catch((error) => {
//   console.log("Error: " + error);
// });

//Creating promise object in function :::

// const sqr = (n) => {
//   return new Promise((resolve, reject) => {
//     let square = n * n;
//     if (n > 0) {
//       resolve(square);
//     } else {
//       reject("The Value is Less Than Zero OR Zero");
//     }
//   });
// };

// sqr(0)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Finished Promise Object");
//   });

// Creating Promise object By chaining :::

// const chaining = (n) => {
//   return new Promise((resolve, reject) => {
//     let square = n * n;
//     if (square > 6) {
//       resolve(square);
//     } else {
//       reject("The Value is less than 6");
//     }
//   });
// };

// chaining(4)
//   .then((result) => {
//     console.log(result);
//     return chaining(result);
//   })
//   .then((result1) => {
//     console.log(result1);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Promises of All Method :::

// let p1 = new Promise((resolve, reject) => {
//   resolve("Promise 1");
// });

// let p2 = new Promise((resolve, reject) => {
//   resolve("Promise 2");
// });

// let p3 = new Promise((resolve, reject) => {
//   reject("Promise 3");
// });

// Promise.all([p1, p2, p3])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Promises of All Settled Method :::

// let p1 = new Promise((resolve, reject) => {
//   resolve("Promise 1");
// });

// let p2 = new Promise((resolve, reject) => {
//   resolve("Promise 2");
// });

// let p3 = new Promise((resolve, reject) => {
//   reject("Promise 3");
// });

// Promise.allSettled([p1, p2, p3])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Promises of All Method :::

let p1 = new Promise((resolve, reject) => {
  reject("Promise 1");
});

let p2 = new Promise((resolve, reject) => {
  resolve("Promise 2");
});

let p3 = new Promise((resolve, reject) => {
  resolve("Promise 3");
});

Promise.race([p1, p2, p3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
