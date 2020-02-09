const multer  = require('multer')
const fileDir = '/public/images/achievements/'

const upload = multer({storage: multer.memoryStorage() });

module.exports = {upload, fileDir};