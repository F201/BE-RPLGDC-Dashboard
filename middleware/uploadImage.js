const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch')

var dbx = new Dropbox({ accessToken: process.env.DROPBOX_APP_KEY, fetch: fetch });
dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log('connected', response);
  })
  .catch(function(error) {
    console.error(error);
  });

const doUpload = (file, dir) => {
    console.log(file)
    // dbx.filesUpload({path: dir, contents: file})
    // .then(function(response) {
    //   console.log('uploaded', response);
    // })
    // .catch(function(error) {
    //   console.error(error);
    // });

}
module.exports = doUpload;