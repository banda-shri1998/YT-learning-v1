const APILINK = "http://localhost:8000/api/v1/reviews/";

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const main = document.getElementById("section");
const title = document.querySelector(".title");
title.innerHTML = movieTitle;

const div_new = document.createElement("div");
div_new.innerHTML = `      
  <div class="row">
    <div class="column">
      <div class="card">
      New Review
      <p>    
        <strong>Review: </strong>
        <input type="text" id="new_review" value="" /> 
      </p>
      <p>
        <strong>User: </strong>
        <input type="text" id="new_user" value="" />
      </p>
      <p>
        <a href="#" onclick="saveReview('new_review','new_user')" class="button">Save</a>
      </p>
      </div>
    </div>
  </div>`;

main.appendChild(div_new);

returnReviews(APILINK);
function returnReviews(url) {
  debugger;
  fetch(url + "movies/" + movieId)
    .then((res) => res.json())
    .then(async(data) => {
      console.log(data);
      data.forEach(async (review) => {
        const div_card = document.createElement("div");
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p>
                  <strong>Review: </strong>${review.review}
                </p>
                <p>
                  <strong>User: </strong>${review.user}
                </p>
                <p class="action">
                  <a href="#" class="button" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Update</a>
                  <a href="#" class="button" onclick="deleteReview('${review._id}')">Delete</a>
                </p>
              </div>
            </div>
          </div>`;
        main.appendChild(div_card);
      });
    });

  console.log(location.href);
}

function saveReview(review, user, id) {
  const userData = document.getElementById(user);
  const reviewData = document.getElementById(review);
  if (id) {
    fetch(APILINK + id, {
      method: "PUT",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userData.value, review: reviewData.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else {
    fetch(APILINK + "new", {
      method: "POST",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData.value,
        review: reviewData.value,
        movieId: movieId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
}

function editReview(id, review, user) {
  console.log(id, review, user);
  const element = document.getElementById(id);
  const reviewInput = "review" + id;
  const userInput = "user" + id;
  element.innerHTML = `
  <p>    
    <strong>Review: </strong>
    <input type="text" id="${reviewInput}" value="${review}" /> 
  </p>
  <p>
    <strong>User: </strong>
    <input type="text" id="${userInput}" value="${user}" />
  </p>
  <p>
    <a href="#" onclick="saveReview('${reviewInput}','${userInput}','${id}')" class="button">Save</a>
  </p>
  `;
  console.log(location.href);
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      debugger
      location.reload();
    });
}
