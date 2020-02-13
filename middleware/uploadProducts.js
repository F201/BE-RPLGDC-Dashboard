const multer  = require('multer');
const fileDir = '/public/images/products/';

const upload = multer({storage: multer.memoryStorage() });

module.exports = { upload, fileDir };