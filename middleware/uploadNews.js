const multer  = require('multer');
const fileDir = '/public/images/news/';

var upload = multer({ storage: multer.memoryStorage() })

module.exports = { upload, fileDir };