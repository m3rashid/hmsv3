import multer from 'multer';
import path from 'node:path';

export const upload = multer({
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
