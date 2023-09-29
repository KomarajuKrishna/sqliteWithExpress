// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../server");
// // const sqlite3 = require("sqlite3");
// // const { open } = require("sqlite");
// // const path = require("path");
// // const dbPath = path.join(__dirname, "movies.db");
// // let db = null;

// // const initializeDB = async () => {
// //   try {
// //     db = await open({
// //       filename: dbPath,
// //       driver: sqlite3.Database,
// //     });
// //   } catch (error) {
// //     console.log(error.message);
// //   }
// // };

// // initializeDB();

// const verifyAccessToken = (request, response, next) => {
//   let jwtToken = null;
//   const header = request.headers["authorization"];
//   if (header !== undefined) {
//     jwtToken = header.split(" ")[1];
//   }
//   if (jwtToken === undefined) {
//     response.status(401);
//     response.send("Invalid Access Token");
//   } else {
//     jwt.verify(jwtToken, "tokenAccess", async (error, playLoad) => {
//       if (error) {
//         response.status(401);
//         response.send("Invalid Access Token");
//       } else {
//         next();
//       }
//     });
//   }
// };

// const verifyIDInDB = async (request, response, next) => {
//   const { movieId } = request.params;
//   const checkQuery = `SELECT * FROM movies WHERE id = ${movieId};`;
//   const result = await db.get(checkQuery);
//   // console.log(result);
//   if (result === undefined) {
//     response.status(400);
//     response.send("The ID Which You have Provide Is Not Found");
//   } else {
//     next();
//   }
// };

// // Register User Api :::

// router.post("/register", async (request, response) => {
//   const { username, name, password, gender, location } = request.body;
//   const hashedPassword = await bcrypt.hash(password, 15);
//   const checkUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
//   const verifiedUser = await db.get(checkUserQuery);
//   if (verifiedUser === undefined) {
//     const createUserQuery = `INSERT INTO user
//         (username, name, password, gender, location)
//         VALUES
//         ('${username}', '${name}', '${hashedPassword}', '${gender}', '${location}');
//         `;
//     db.run(createUserQuery);
//     response.status(201);
//     response.send("User Created Successfully");
//   } else {
//     response.status(400);
//     response.send("The User Name is Already Exists");
//   }
// });

// // Login API ::

// router.post("/login", async (request, response) => {
//   const { username, password } = request.body;
//   const getUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
//   const loginUser = await db.get(getUserQuery);
//   if (loginUser === undefined) {
//     response.status(400);
//     response.send("User Not Found");
//   } else {
//     const verifyPassword = await bcrypt.compare(password, loginUser.password);
//     console.log(verifyPassword);
//     // response.send(verifyPassword);
//     if (verifyPassword) {
//       const playLoad = { username: username };
//       const jwtToken = jwt.sign(playLoad, "tokenAccess");
//       response.send({ jwtToken });
//       // response.send("Login Successful");
//     } else {
//       response.status(404);
//       response.send("Invalid Password");
//     }
//   }
// });

// // GET ALL MOVIES API::

// router.get("/movies", verifyAccessToken, async (request, response) => {
//   try {
//     const getAllMoviesQuery = `SELECT * FROM movies;`;
//     const moviesArray = await db.all(getAllMoviesQuery);
//     response.send(moviesArray);
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // GET MOVIE BY ID ::

// router.get(
//   "/movies/:movieId",
//   verifyAccessToken,
//   verifyIDInDB,
//   async (request, response) => {
//     const { movieId } = request.params;
//     // console.log(movieId);
//     try {
//       const getMovieByIDQuery = `SELECT * FROM movies WHERE id=${movieId};`;
//       const getMovieArray = await db.get(getMovieByIDQuery);
//       response.send(getMovieArray);
//     } catch (error) {
//       console.error("Error fetching movies:", error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// // ADD A NEW MOVIE ::

// router.post("/movies", verifyAccessToken, async (request, response) => {
//   const { movie_name, release_year, duration } = request.body;
//   try {
//     const addMovieQuery = `INSERT INTO
//         movies(movie_name, release_year, duration)
//         VALUES('${movie_name}', ${release_year}, ${duration});`;
//     await db.run(addMovieQuery);
//     response.status(201);
//     response.send("Movie Added Successfully");
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //UPDATE MOVIE BY ID ::

// router.put("/movies/:movieId", verifyIDInDB, async (request, response) => {
//   const { movieId } = request.params;
//   const { movie_name, release_year, duration } = request.body;
//   let updateMovieQuery = null;
//   try {
//     switch (true) {
//       case movie_name !== undefined:
//         updateMovieQuery = `UPDATE movies
//           SET
//             movie_name = '${movie_name}'
//             WHERE id = ${movieId};`;
//         await db.run(updateMovieQuery);
//         response.send("Movie Name Updated Successfully");
//         break;

//       case release_year !== undefined:
//         updateMovieQuery = `UPDATE movies
//           SET
//             release_year = ${release_year}
//             WHERE id = ${movieId};`;
//         await db.run(updateMovieQuery);
//         response.send("Release Year Updated Successfully");
//         break;

//       case duration !== undefined:
//         updateMovieQuery = `UPDATE movies
//           SET
//             duration = ${duration}
//             WHERE id = ${movieId};`;
//         await db.run(updateMovieQuery);
//         response.send("Movie Duration Updated Successfully");
//         break;
//     }
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // DELETE MOVIE BY ID ::

// router.delete("/movies/:movieId", verifyIDInDB, async (request, response) => {
//   const { movieId } = request.params;
//   try {
//     const deleteMovieQuery = `DELETE FROM movies WHERE id = ${movieId};`;
//     await db.run(deleteMovieQuery);
//     response.send("Movie Deleted Successfully");
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
