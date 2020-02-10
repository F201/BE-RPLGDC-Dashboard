const multer  = require('multer');
const fileDir = '/public/images/division/';

const upload = multer({storage: multer.memoryStorage() });

module.exports = { upload, fileDir };