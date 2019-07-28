const { Storage } = require("@google-cloud/storage");
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
});

const bucket = storage.bucket(CLOUD_BUCKET);
const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
};

const sendUploadToGCS = (req, res, next) => {
  console.log(req.body)
  if (!req.files) {
    return next();
  }

  let promises = [];
  req.files.forEach((image1, index) => {
    const gcsname = Date.now() + image1.originalname;
    const file = bucket.file(gcsname);

    const newPromise = new Promise((resolve, reject) => {
      file
        .createWriteStream({
          metadata: {
            contentType: image1.mimetype
          }
        })
        .on("finish", () => {
          image1.cloudStorageObject = gcsname;

          file.makePublic().then(() => {
            if (req.body.newImages == undefined) {
              req.body.newImages = [];
            }
            req.body.newImages.push(getPublicUrl(gcsname));
            console.log(req.body.newImages);
            resolve();
          });
        })
        .on("error", err => {
          image1.cloudStorageError = err;
          next(err);
        })
        .end(image1.buffer);
    });
    promises.push(newPromise);
  });
  Promise.all(promises)
    .then(response => {
      next();
    })
    .catch(next);
};

const Multer = require("multer"),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 500 * 1024 * 1024
    }
  });

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};
