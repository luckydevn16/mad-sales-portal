import { Request } from 'express';
import multer from "multer";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: CallableFunction) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: any, cb: CallableFunction) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
