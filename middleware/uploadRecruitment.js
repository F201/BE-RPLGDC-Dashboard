const multer  = require('multer');
const fileDir = '/public/images/recruitment/';

const upload = multer({storage: multer.memoryStorage() });

module.exports = { upload, fileDir };