const path = require('path');
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');
const crypto = require('crypto');

var dbx = new Dropbox({ accessToken: process.env.DROPBOX_APP_KEY, fetch: fetch });
dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log('connected', response);
  })
  .catch(function(error) {
    console.error(error);
  });
const generateFileName = (filename) => {
  return crypto.pseudoRandomBytes(16).toString('hex') + path.extname(filename)
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const UploadFile = {
  single: async (dir, file) => {
    let imgData = {};
    const filePath = dir + generateFileName(file.originalname)
    await postImg(filePath, file.buffer)
    imgData[file.fieldname] = await getImgUrl(filePath)
    return imgData
  },
  multi: async (dir, file) => {
    let imgData = {};
    let filepath = ''
    return new Promise(async(resolve, reject) => {
      await asyncForEach(Object.values(file), async (val) => {
        filepath = dir + generateFileName(val[0].originalname)
        await postImg(filepath, val[0].buffer)
        imgData[val[0].fieldname] = await getImgUrl(filepath)
      })
      return resolve(imgData);
      // Object.values(file).forEach(async (val, idx) => {
      //   const filepath = dir + generateFileName(val[0].originalname)
      //   console.log(filepath)
      //   await postImg(filepath, val[0].buffer)
      //   imgData[val.fieldname] = await getImgUrl(filepath)
      //   console.log(idx)
      // })
      // return resolve(imgData);
    })
  }
}

const postImg = function (filePath, file) {
  return dbx.filesUpload({path: filePath, contents: file})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log('error upload file', err);
      if (err.error.error['.tag'] !== 'invalid_access_token') postImg(filePath, file);
    });
}

const getImgUrl = (path) => {
  return dbx.sharingCreateSharedLinkWithSettings({path: path})
    .then((res) => {
      return res.url.replace('www.','dl.');
    })
    .catch((err) => {
      console.log('error get link ', err);
      if (err.error.error['.tag'] !== 'shared_link_already_exists' && err.error.error['.tag'] !== 'invalid_access_token') getImgUrl(path);
    });
}
module.exports = UploadFile;