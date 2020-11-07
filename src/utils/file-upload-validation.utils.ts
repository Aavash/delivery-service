import { extname } from 'path';

export const docFileFilter = (req, file, cb) => {
	const ext = file.originalname.split('.')[1];

	if (ext !== 'xlsx' && ext !== 'csv') {
		req.fileValidationError = 'Forbidden extension';
		
return cb(null, false, req.fileValidationError);
	}
	cb(null, true);
};

export const ImageFileFilter = (req, file, cb) => {
	if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
		return cb(new Error('Only Images Allowed'), false);
	}
	cb(null, true);
};

export const editFileName = (req, file, callback) => {
	const name = 'test';
	const fileExtName = extname(file.originalname);

	callback(null, `${name}${fileExtName}`);
};

export const editFileNameTest = (req, file, callback) => {
	const name = 'syncTest';
	const fileExtName = extname(file.originalname);

	callback(null, `${name}${fileExtName}`);
};
