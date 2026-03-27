import multer from "multer";

const storage = multer.diskStorage({}); // temp storage
const upload = multer({ storage });

export default upload;
