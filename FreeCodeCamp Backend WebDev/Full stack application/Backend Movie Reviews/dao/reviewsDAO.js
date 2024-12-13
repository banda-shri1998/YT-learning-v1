import mongodb, { ObjectId } from "mongodb";

const ObjectID = mongodb.ObjectId;

let reviews;

export default class ReviewDAO {
  static async injectDB(conn) {
    if (reviews) {
      reviews;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.log(`unable to Establish connection handles in userDAO: ${e}`);
    }
  }

  static async addReview(movieID, review, user) {
    try {
      const reviewDoc = { movieId: movieID, user: user, review: review };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.log(`unable to insertOne Post Review : ${e}`);
      return { error: e };
    }
  }

  static async getReview(movieId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(movieId) });
    } catch (e) {
      console.log(`unable to find Review : ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(movieID) {
    try {
      const deletedResp= await reviews.deleteOne({ _id:new ObjectId(movieID) });
      return deletedResp
    } catch (e) {
      console.log(`unable to remove review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, review, user) {
    try {
      const newResponse = await reviews.updateOne(
        { _id:new ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );

      return newResponse;
    } catch (e) {
      console.log(`unable to update Review : ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      return await reviews.find({ movieId: parseInt(movieId) }).toArray();
    } catch (e) {
      console.log(`unable to update Review : ${e}`);
      return { error: e };
    }
  }
}
