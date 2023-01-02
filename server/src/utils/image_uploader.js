const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename(req, file, cb) {
    // console.log('storage', req.user);
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid Format,Please choose png,jpg and jpeg format'),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
