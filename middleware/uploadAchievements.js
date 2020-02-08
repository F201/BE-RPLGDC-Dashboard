const multer  = require('multer');
// const storage = require('./uploadImage');
const uploadDir = '/public/images/achievements/'
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/xampp/htdocs/BE-RPLGDC-Dashboard/public/images/achievements')
  },
  filename: function (req, file, cb) {
    console.log(file)
    const db = new Dropbox({ accessToken: process.env.DROPBOX_APP_KEY, fetch: fetch });
    db.filesUpload({path: uploadDir + file.fieldname + '-' + Date.now(), contents: file}).then(result => {console.log(result)}).catch(err => {console.log(err.error)})
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  },
})

var upload = multer({ storage: storage })

// const store = function (file) {
//     console.log('ini',file)
//     storage(file, uploadDir)
// }
// multer.diskStorage({
//     destination: uploadDir,
//     filename: function (req, file, cb) {
//       crypto.pseudoRandomBytes(16, function (err, raw) {
//         if (err) return cb(err)  

//         cb(null, raw.toString('hex') + path.extname(file.originalname))
//       })
//     }
// })

// const upload = multer({storage: store, dest: uploadDir });

// const upload = function dbxUpload(file) {
//   console.log('ini',file)
//   storage(file, uploadDir)
// }

module.exports = upload;