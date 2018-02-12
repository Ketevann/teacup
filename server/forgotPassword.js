const crypto = require('crypto')
const nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

const db = require('APP/db')
const User = db.model('users')
const Token = db.model('token')
const bcrypt = require('bcryptjs')


module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user && user.length !== 0) {
          console.log(user, 'USER')
          const tokenCode = crypto.randomBytes(20).toString('hex')
          console.log(tokenCode, ' tokenCode!!!!!')
          return Token.create({
            token: tokenCode,
            expiration: new Date().setHours(new Date().getHours() + 4)
          })
            .then((createdtoken) => {
              //              console.log(user, 'token!!!!')
              return createdtoken.setUser(user.id)
            }).then(token => {

              console.log(tokenCode, 'TOKENCODE', user.id)
              //nodemailer.createTestAccount((err, account) => {

              let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // secure:true for port 465, secure:false for port 587
                auth: {
                  user: 'myexampleapp7@gmail.com',
                  pass: 'nodemailer'
                }
              })
              let mailOptions = {
                from: '"Fred Foo 👻" <myexampleapp7@gmail.com>', // sender address
                to: 'katie.tsin@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: `Hello world ?${token}`, // plain text body
                html: '<p>Click <a href="https://tea-cup.herokuapp.com/reset/' + tokenCode + '">here</a> to reset your password</p>' // html body
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                /*req.end()
                transporter.close()
                res.send('WHYYYYYY')*/
              });
            });
          //  })

        }
        else {
          console.log('no such user')
          res.end()
        }
      })

  })
  .post('/reset', (req, res, next) => {
    console.log(req.body)
    const date = new Date(Date.now())
    return Token.findOne({
      where: {
        token: req.body.token,
        expiration: {
          $gt: date
        }
      }
    })
      .then((token) => {
         console.log(token, 'token')
        if (token) {
          return User.findOne({
            where: {
              id: token.user_id
            }
          })
            .then(user => {
              //  console.log(user, 'user')
              //user.authenticate(req.body.password)
              //return user.update(req.body.email)
              return bcrypt.hash(req.body.password, 10)
                .then(hash =>
                  user.update({ 'password_digest': hash }))


            })
            .then(user => {
            if (user)
            console.log(user, 'usa')
            res.send({changed: true})
            })

        }
        else {
          console.log('token has expired!!!!!!')
          res.send({changed: false})
        }
      })


  })



  // .put('/updatePassword/:userId', (req, res, next) => {
  //   User.findById(req.params.id)
  //       .then((user) => {
  //         return user.authenticate(req.body)
  //       })
  //       .then((upUser) => {
  //         if (upUser) res.sendStatus(200)
  //         else res.status(404).send('Not successfully updated')
  //       })
  // })
