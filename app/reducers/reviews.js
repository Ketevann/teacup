import axios from 'axios'

const GET_reviews = 'GET_reviews';

const INITIAL_STATE = {userReviews: []}
const reviewsReducer = (reviews = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_reviews:
      return { ...reviews, userReviews: action.payload }
  }
  return reviews
}

const getReviews = (payload) => ({ type: GET_reviews, payload })

export const fetchReviews = (dispatch) =>
  dispatch =>{
    console.log(' in fetch reviews~~~~~~')
    axios.get('/api/auth/whoami')
      .then(response => {
        console.log('response', response)
        // return response.data
        // })
        // .then(user => {
        const userId = response.data.id
        console.log(userId, ' USER!!!!!--------->')
        return axios.get(`/api/reviews/${userId}`)
      })
      .then(reviews => {
        console.log('reviews', reviews)
        dispatch(getReviews(reviews.data))
      })
      .catch(console.error)
  }
export default reviewsReducer
