const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(bodyParser.json());

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const Person = require("./models/person");

// Set the port to use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next();
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received Credential", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // Now, since user exists, check password
      const isPasswordMatch = user.password === password;

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

app.use(passport.initialize());

const localAuthMiddelware = passport.authenticate("local", { session: false });

// Define a route for authentication
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});

app.use("/person", logRequest, personRoutes);
app.use("/menu", localAuthMiddelware, menuItemRoutes);

app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT}`);
});
