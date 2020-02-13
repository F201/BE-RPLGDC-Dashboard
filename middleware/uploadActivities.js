const multer  = require('multer');
const fileDir = '/public/images/activities/';

const upload = multer({storage: multer.memoryStorage() });

module.exports = { upload, fileDir };