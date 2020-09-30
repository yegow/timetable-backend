var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");
const schema = require("../joi-schemas/class");
const createResponse = require("./helpers/create-response");
const controller = require("../controllers/classes");

router.get("/", async function (req, res, next) {
  try {
    res.json(
      createResponse({
        data: await controller.get(),
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async function (req, res, next) {
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(
      createResponse({
        error: "Invalid data. Check that you provided all fields.",
      })
    );
  }

  try {
    res.json(
      createResponse({
        data: await controller.add(req.body),
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;