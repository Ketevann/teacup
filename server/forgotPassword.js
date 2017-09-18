const crypto = require('crypto')
const db = require('APP/db')
const User = db.model('users')
const Token = db.model('token')


module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    console.log(req.body, 'reached the routes!!')
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user.length !== 0) {
          console.log(user, 'USER')
          const tokenCode = crypto.randomBytes(20).toString('hex')
          console.log(tokenCode, ' tokenCode!!!!!')
          return Token.create({
            token: tokenCode,
            expiration: new Date().setHours(new Date().getHours() + 24)
          })
            .then((createdtoken) => {
              console.log(user, 'token!!!!')
              return createdtoken.setUser(user.id)
            }).then(token => console.log(token))

        }
        else {
          console.log('no such user')
          res.end()
        }
      })

  })
//   var expires = new Date();
// expires.setHours(expires.getHours() + 6);

// user.resetToken = {
//   token: token,
//   expires: expires
// };


//  crypto.randomBytes(20, function (err, buf) {
//             tokenCode = buf.toString('hex');
//             if (err) throw err;
//             console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
//             return tokenCode
//           })
