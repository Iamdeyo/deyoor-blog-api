import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { StatusCodes } from 'http-status-codes';
import CustomErrorApi from '../errors/CustomErrorApi.js';

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    IMAGE_SIZE,
} = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'express-blog-api', // Optional, set a specific folder in Cloudinary
        format: async () => 'png', // Example: always convert uploaded images to PNG format
    },
});

// File filter function to allow only JPEG, JPG, and PNG
// eslint-disable-next-line consistent-return
const fileFilter = (allowedFileTypes) => (req, file, cb) => {
    const extname = allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(
        new CustomErrorApi(
            `Only ${allowedFileTypes} files are allowed!`,
            StatusCodes.BAD_REQUEST,
        ),
    );
};

const upload = multer({
    storage,
    fileFilter: fileFilter(/jpeg|jpg|png/),
    limits: {
        fileSize: 1024 * 1024 * IMAGE_SIZE, // 1MB limit (adjust as needed)
    },
});

const deleteImage = async (imageUrl) => {
    const urlArray = imageUrl.split('express-blog-api/');
    const url = urlArray[urlArray.length - 1].split('.png', 1)[0];
    const publicId = `express-blog-api/${url}`;

    await cloudinary.api.delete_resources([publicId], {
        type: 'upload',
        resource_type: 'image',
    });
};

// const upload = (req, res, next) => {
//     // console.log(req.files.images);

//     console.log(process.cwd());
//     // const fullPath = path.dirname('/');
//     const fullPath = path.dirname();

//     console.log(fullPath);
//     if (!req.files || !req.files.image) {
//         next();
//     } else {
//         const image = req.files.image.tempFilePath;
//         cloudinary.v2.uploader
//             .unsigned_upload(image, 'express-blog-api')
//             .then((result) => {
//                 req.body.image = result.url;

//                 // Manually delete the temporary file
//                 fs.unlinkSync(image);
//                 next();
//             })
//             .catch(() => {
//                 // console.log(err);

//                 // Manually delete the temporary file
//                 fs.unlinkSync(image);
//                 throw new CustomErrorApi(
//                     'Unable to upload file to cloudinary',
//                     StatusCodes.BAD_REQUEST,
//                 );
//             });
//     }
// };

// eslint-disable-next-line import/prefer-default-export
export { upload, deleteImage };
