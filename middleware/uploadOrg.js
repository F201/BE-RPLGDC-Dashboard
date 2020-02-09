const multer  = require('multer');
const fileDir = '/public/images/organizations/';

var upload = multer({ storage: multer.memoryStorage() });

module.exports = { upload, fileDir };