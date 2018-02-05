import axios from 'axios'

const GET_reviews = 'GET_reviews';

const INITIAL_STATE = {all : [], userReviews: [] }
const reviewsReducer = (reviews = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_reviews:
      return { ...reviews, userReviews: action.payload }
      case POST_REVIEWS:
      console.log(reviews, ' in redux')
      let newReview = reviews.all.filter(elem => {
         if (elem.user_id !== action.reviews.user_id )
          return elem;
       })

        return { all: [...newReview, action.reviews]}

        case GET_ALL_REVIEWS:
          return {...reviews, all: action.reviews}
          case REMOVE_REVIEW:
          console.log(action.id, reviews.userReviews )
            let deletedReviews = reviews.userReviews.filter(elem =>{
              if(elem.id != action.id) return elem;
            })
            return {...reviews, userReviews: deletedReviews}
  }

  return reviews
}

const POST_REVIEWS = 'POST_REVIEWS'
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const REMOVE_REVIEW = 'REMOVE_REVIEW'


const postReview = (reviews) => ({type: POST_REVIEWS, reviews})

const getReviews = (payload) => ({ type: GET_reviews, payload })

const getAllReviews = reviews => ({type: GET_ALL_REVIEWS, reviews})

const remove = (id) => ({type: REMOVE_REVIEW, id})

export const removeReview = (id, dispatch) =>
  dispatch =>
    {
      console.log('in remove')
      return axios.delete(`/api/reviews/${id}`)
  .then(() =>
  {
        console.log('dispatching')

    dispatch(remove(id))
  })
  .catch(err => console.log(err))}

export const postReviews = (info, dispatch) =>
  dispatch => {
    console.log(' in fetch reviews~~~~~~')
    axios.get('/api/auth/whoami')
      .then(response => {
        console.log('response', response)
        // return response.data
        // })
        // .then(user => {

        const userId = response.data.id

        console.log(userId, ' USER!!!!!--------->')
        if (userId) {
          info.userId = userId
          return axios.post(`/api/reviews`, info)

            .then(reviews => {
              console.log('reviews', reviews)
              dispatch(postReview(reviews.data))
            })
            .catch(console.error)
        }
      })
  }

export const getProductReviews = (id, dispatch) =>
  dispatch =>
     axios.get(`/api/reviews/${id}`)

      .then((res) => {
        return dispatch(getAllReviews(res.data))
      })
      .catch(err => console.log(err))

export const fetchReviews = (dispatch) =>
  dispatch => {
    console.log(' in fetch reviews~~~~~~')
    axios.get('/api/auth/whoami')
      .then(response => {
        console.log('response', response)
        // return response.data
        // })
        // .then(user => {

        const userId = response.data.id

        console.log(userId, ' USER!!!!!--------->')
        if (userId) {
          return axios.get(`/api/reviews/user/${userId}`)

            .then(reviews => {
              console.log('reviews', reviews)
              dispatch(getReviews(reviews.data))
            })
            .catch(console.error)
        }
      })
  }
export default reviewsReducer
