const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const router = require("express").Router();
const Tester = require("./models/tester");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router.post("/signin", requireSignin, Authentication.signin);
router.post("/signup", Authentication.signup);

router.get("/", requireAuth, function(req, res) {
  res.send({ message: "Super secret code is ABC123" });
});

router.get("/home", function(req, res) {
  res.send({ message: "Home" });
});

// add new tester
router.post("/tester", requireAuth, function(req, res) {
  const { name, number, bot1, bot2, bot3 } = req.body;

  if (!number || !name) {
    // check if not provided name or number
    return res
      .status(422)
      .send({ error: "You must provide a user and MSISDN " });
  }

  Tester.findOne({ number }, (err, existingTester) => {
    // check for existing user
    if (err) return next(err);

    if (existingTester) {
      return res.status(422).json({ error: "The MSISDN already existed" });
    }
    const tester = new Tester({
      name,
      number,
      bot1: bot1 ? bot1 : 0,
      bot2: bot2 ? bot2 : 0,
      bot3: bot3 ? bot3 : 0
    });
    // save the tester and check for errors
    tester.save(function(err) {
      if (err) return next(err);

      res.json({ message: "Tester created!", tester });
    });
  });
});

// get all testers
router.route("/testers").get(requireAuth, (req, res) => {
  Tester.find((err, testers) => {
    if (err) return next(err);

    res.json(testers);
  });
});

// get a single tester
router.get("/tester/:id", requireAuth, (req, res) => {
  Tester.findById(req.params.id, (err, tester) => {
    if (err) return res.send(err);

    res.json(tester);
  });
});

// update single tester
router.put("/tester/:id", requireAuth, (req, res, next) => {
  const { name, number, bot1, bot2, bot3 } = req.body;
  if (!name || !number) {
    next();
  } else {
    Tester.findById(req.params.id, (err, tester) => {
      if (err) res.send(err);
      tester.name = req.body.name;
      tester.number = req.body.number;
      tester.bot1 = req.body.bot1 ? req.body.bot1 : 0;
      tester.bot2 = req.body.bot2 ? req.body.bot2 : 0;
      tester.bot3 = req.body.bot3 ? req.body.bot3 : 0;

      tester.save(err => {
        if (err) res.send(err);
        res.json({ message: "tester updated", tester });
      });
    });
  }
});

// deltee a single tester
router.delete("/tester/:id", requireAuth, (req, res) => {
  Tester.remove(
    {
      _id: req.params.id
    },
    (err, tester) => {
      if (err) res.send(err);
      res.json({ message: "Successfully deleted", tester });
    }
  );
});

module.exports = router;
