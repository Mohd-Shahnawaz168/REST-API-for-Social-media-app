import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/post");
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname + Date.now();
    cb(null, fileName);
  },
});

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avatar");
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname + Date.now();
    cb(null, fileName);
  },
});
export const avatar = multer({ storage: storage1 });
export const upload = multer({ storage: storage });
