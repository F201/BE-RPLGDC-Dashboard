const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Admin = require('../models/auth')

// router.post('/registerAdmin', (req, res) => {
//   const username = req.body.username
//   const password = req.body.password
//   bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//       if (err) {
//         throw(err)
//       } else {
//         Admin.create({
//           username: username,
//           password: hash
//         }).then(auth => {
//           res.json({
//             "data" : auth,
//             "msg" : "SUCCESSFULLY REGISTER"
//           })
//         })
//       }
//     })
//   })
// })

/* GET users listing. */
router.post('/auth', (req, res, next) => {
  // if the username and password exactly match
  // encrypt password for sql selection
  Admin.findOne({
    where: {
      username: req.body.username
    }
  }).then(auth => {
    if (!auth) {
      return res.json({"msg": "USERNAME NOT FOUND"})
    } else {
      bcrypt.compare(req.body.password, auth.password, function (err, result) {
        if (err) {
          res.sendStatus(401).json({
            message: "AUTH FAILED"
          })
        }
        if(result) {
          const token = jwt.sign({ 
            // generate token for 1 hour
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            username: req.body.username
          }, process.env.JWT_AUTH_CODE);
          res.json({
            token: token,
            msg: "LOGIN SUCCESS"
          })
        } else {
          res.json({msg: "LOGIN FAILED"})
        }
      });
      
    }
  })
});

router.get('/auth/details', (req, res) => {
  jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE,async (err, authData) => {
    if (err) {
        res.json({
          msg : "auth failed"
        })
    } else {
        res.json({
          data: {
            username: authData.username
          },
          status : "auth success"
        })
    }
  })
})

module.exports = router;