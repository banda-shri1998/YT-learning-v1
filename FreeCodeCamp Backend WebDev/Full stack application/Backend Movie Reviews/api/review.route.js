import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/movies/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReviews);
router
  .route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReviews);

export default router;
