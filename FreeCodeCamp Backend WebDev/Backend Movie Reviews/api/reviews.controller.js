import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReviews(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(movieId, review, user);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ errro: e.message });
    }
  }

  static async apiDeleteReviews(req, res, next) {
    try {
      const movieId = req.params.id;
      const deleteRequest = await ReviewsDAO.deleteReview(movieId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ errro: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api , ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;
      const reviewResp = await ReviewsDAO.updateReview(reviewId, review, user);
      var { error } = reviewResp;
      if (error) {
        res.status(400).json({ error });
      }
      if (reviewResp.modifiedCount === 0) {
        throw new Error("unable to update review");
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req,res,next){
    try {
      let id=req.params.id ||{};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      if (!reviews){
        res.status(404).json({error:"not FOund"})
        return
      }
      res.json(reviews)
    } catch (e) {
      console.log(`api: ${e}`);
      res.status(500).json({error:e})
    }
  }
}
