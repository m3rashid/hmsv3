const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, path.join(__dirname, '../uploads'));
    },

    filename: (req, file, done) => {
      const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));

      done(null, file.fieldname + '-' + Date.now() + extension);
    },
  }),
});

module.exports = {
  upload,
};
