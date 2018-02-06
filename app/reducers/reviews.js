import axios from 'axios'


const INITIAL_STATE = { all: [], userReviews: [] }
const reviewsReducer = (reviews = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_reviews:
      return { ...reviews, userReviews: action.payload }
    case POST_REVIEWS:
      let newReview = reviews.all.filter(elem => {
        if (elem.user_id !== action.reviews.user_id)
          return elem;
      })
      return { all: [...newReview, action.reviews] }

    case GET_ALL_REVIEWS:
      return { ...reviews, all: action.reviews }
    case REMOVE_REVIEW:
      let deletedReviews = reviews.userReviews.filter(elem => {
        if (elem.id != action.id) return elem;
      })
      return { ...reviews, userReviews: deletedReviews }
  }

  return reviews
}

//post a new review
const POST_REVIEWS = 'POST_REVIEWS'
const postReview = (reviews) => ({ type: POST_REVIEWS, reviews })

//get user reviews
const GET_reviews = 'GET_reviews';
const getReviews = (payload) => ({ type: GET_reviews, payload })

//get all reviews
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const getAllReviews = reviews => ({ type: GET_ALL_REVIEWS, reviews })

//remove a specific review
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const remove = (id) => ({ type: REMOVE_REVIEW, id })

//remove a specific review
export const removeReview = (id, dispatch) =>
  dispatch =>
    axios.delete(`/api/reviews/${id}`)
      .then(() => {
        dispatch(remove(id))
      })
      .catch(err => console.log(err))

//post a new review
export const postReviews = (info, dispatch) =>
  dispatch =>
    axios.post(`/api/reviews`, info)
      .then(reviews => {
        const reviewObj = reviews.data.review;
        reviewObj.user = reviews.data.user
        dispatch(postReview(reviewObj))
      })
      .catch(console.error)



// get reviews for a specific product
export const getProductReviews = (id, dispatch) =>
  dispatch =>
    axios.get(`/api/reviews/${id}`)
      .then((res) => {
        return dispatch(getAllReviews(res.data))
      })
      .catch(err => console.log(err))

//get user reviews
export const fetchReviews = (dispatch) =>
  dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const userId = response.data.id
        if (userId) {
          return axios.get(`/api/reviews/user/${userId}`)
            .then(reviews => {
              dispatch(getReviews(reviews.data))
            })
            .catch(console.error)
        }
      })
  }
export default reviewsReducer
