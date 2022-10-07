const { Router } = require("express");
const reviewService = require("../services/reviewService");
const passwordMiddleware = require("../middlewares/passwordMiddleware");

const router = Router();

//create review
router.post("/reviews", async (req, res, next) => {
  try {
    const gu = req.body.gu;
    const dong = req.body.dong;
    const title = req.body.title;
    const description = req.body.description;
    const password = req.body.password;
    const noiseLevel = req.body.noiseLevel;

    const newReview = await reviewService.addReview({
      gu,
      dong,
      title,
      description,
      password,
      noiseLevel,
    });

    if (newReview.errorMessage) {
      throw new Error(newReview.errorMessage);
    }

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

//get review by gu
router.get("/reviews/:gu", async (req, res, next) => {
  try {
    const gu = req.params.gu;

    const reviews = await reviewService.getReviewsByGu(gu);

    if (reviews.errorMessage) {
      throw new Error(reviews.errorMessage);
    }

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
})

//update review
router.put("/reviews/:id", passwordMiddleware, async (req, res, next) => {
  try {
    const reviewId = req.currentReview._id;
    const updates = [ "gu", "dong", "title", "description", "password", "noiseLevel" ];
    let toUpdate = {};
    
    updates.forEach((update) => {
      if (req.body[update]) {
        toUpdate[update] = req.body[update];
      }
    })

    const updatedReview = await reviewService.updateReview(reviewId, toUpdate)

    res.status(200).json(updatedReview);
  } catch(error) {
    next(error);
  }
})


//delete review
router.delete("/reviews/:id", passwordMiddleware, async (req, res, next) => {
  try {
    const reviewId = req.currentReview._id;

    const deletedReview = await reviewService.deleteReview(reviewId);

    res.status(200).json(deletedReview);
  } catch(error) {
    next(error);

  }
})

module.exports = router;
