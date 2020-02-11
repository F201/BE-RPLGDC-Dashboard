const multer  = require('multer');
const fileDir = '/public/recruitment/';

const upload = multer({storage: multer.memoryStorage() });

module.exports = { upload, fileDir };