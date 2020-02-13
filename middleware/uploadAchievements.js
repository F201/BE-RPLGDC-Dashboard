const multer  = require('multer');
const fileDir = '/public/images/achievements/';

var upload = multer({ storage: multer.memoryStorage() })

module.exports = { upload, fileDir };