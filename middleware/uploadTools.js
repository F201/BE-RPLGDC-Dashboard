const multer  = require('multer');
const path = require('path');
const crypto = require('crypto');
const uploadDir = require('path').join(__dirname, '/../public/images/tools');

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})

const upload = multer({storage: storage, dest: uploadDir });

module.exports = upload;