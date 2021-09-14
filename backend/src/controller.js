const db = require("./repository.js");
const productDb = db.db("product");
const reviews = productDb.collection("review");

exports.create = async (body, res) => {
  try {
    if (!body.content) {
      res.status(400).send({ message: "Content must not be empty." });
      return;
    }
    if (
      !body.rating ||
      body.rating < 0 ||
      body.rating > 5 ||
      !isInt(body.rating)
    ) {
      res
        .status(400)
        .send({ message: "Rating must an integer be between 1 and 5." });
      return;
    }

    const review = {
      rating: body.rating,
      content: body.content,
      date: new Date().toISOString(),
    };

    return await reviews
      .insertOne(review)
      .then(() => {
        res.status(200).send();
        return review;
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "500 - Something went wrong.",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message || "500 - Something went wrong.",
    });
  }
};

exports.findAll = async (body, res) => {
  try {
    let cursor = await reviews
      .find()
      .sort({ date: -1 })
      .limit(body.limit || 25)
      .toArray();

    res.send(cursor);
  } catch (err) {
    res.status(500).send({
      message: err.message || "500 - Something went wrong.",
    });
  }
};

function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}
