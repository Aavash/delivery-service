"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileNameTest = exports.editFileName = exports.ImageFileFilter = exports.docFileFilter = void 0;
const path_1 = require("path");
exports.docFileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.')[1];
    if (ext !== 'xlsx' && ext !== 'csv') {
        req.fileValidationError = 'Forbidden extension';
        return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
};
exports.ImageFileFilter = (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only Images Allowed'), false);
    }
    cb(null, true);
};
exports.editFileName = (req, file, callback) => {
    const name = 'test';
    const fileExtName = path_1.extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};
exports.editFileNameTest = (req, file, callback) => {
    const name = 'syncTest';
    const fileExtName = path_1.extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};
//# sourceMappingURL=file-upload-validation.utils.js.map