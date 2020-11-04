"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToCSV = exports.Axios = exports.parseJwt = exports.handleError = exports.removeEmpty = exports.cleanData = exports.serialize = exports.paginate = exports.objectArrayToArray = exports.getFormattedDate = exports.format = exports.capitalize = exports.hasPrevious = exports.hasNext = exports.arrayDiff = exports.hashString = exports.isObjectEmpty = void 0;
const argon = __importStar(require("argon2"));
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
async function hashString(string) {
    return argon.hash(string, {
        type: argon.argon2d,
        hashLength: 50,
    });
}
exports.hashString = hashString;
function arrayDiff(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x));
}
exports.arrayDiff = arrayDiff;
function hasNext(page, totalPages, hostAddress) {
    if (page === totalPages) {
        return '';
    }
    else {
        return `${hostAddress.replace('\n', '')}?page=${page + 1}`;
    }
}
exports.hasNext = hasNext;
function hasPrevious(page, totalPages, hostAddress) {
    if (page <= 1) {
        return '';
    }
    else {
        return `${hostAddress.replace('\n', '')}?page=${page - 1}`;
    }
}
exports.hasPrevious = hasPrevious;
function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}
exports.capitalize = capitalize;
function format(str) {
    return str.toString().length === 1 ? '0' + str : str;
}
exports.format = format;
function getFormattedDate(str) {
    const todayTime = new Date(str);
    const month = format(todayTime.getMonth() + 1);
    const day = format(todayTime.getDate());
    const year = todayTime.getFullYear();
    return day + '/' + month + '/' + year;
}
exports.getFormattedDate = getFormattedDate;
function objectArrayToArray(objectArray, attr) {
    return objectArray.map((el) => {
        return el[attr];
    });
}
exports.objectArrayToArray = objectArrayToArray;
function paginate(pages, page, total, host, result) {
    return {
        total_pages: pages,
        total_items: total,
        next: hasNext(page, pages, host),
        previous: hasPrevious(page, pages, host),
        current_page: page,
        items: class_transformer_1.classToPlain(result),
    };
}
exports.paginate = paginate;
function serialize(obj) {
    const toRemove = [
        'id',
        'is_obsolete',
        'is_superadmin',
        'modified_on',
        'password',
    ];
    if (obj.hasOwnProperty('items')) {
        for (const element of obj['items']) {
            for (const key of Object.keys(element)) {
                if (toRemove.includes(key)) {
                    delete element[key];
                }
            }
        }
        return obj;
    }
    for (const key of Object.keys(obj)) {
        if (toRemove.includes(key)) {
            delete obj[key];
        }
    }
    return obj;
}
exports.serialize = serialize;
function cleanData(obj, toRemove) {
    for (const key of Object.keys(obj)) {
        if (toRemove.includes(key)) {
            delete obj[key];
        }
    }
}
exports.cleanData = cleanData;
function removeEmpty(obj) {
    return Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
}
exports.removeEmpty = removeEmpty;
function handleError(error) {
    throw new common_1.HttpException(error.response.data.message, error.response.data.statusCode);
}
exports.handleError = handleError;
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
}
exports.parseJwt = parseJwt;
function getAxios() {
    common_1.Logger.log(path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`));
    common_1.Logger.log(fs.existsSync(path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`)));
    if (fs.existsSync(path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`))) {
        common_1.Logger.log('CA cert Found');
        const certVerifyFile = fs.readFileSync(path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`));
        return axios_1.default.create({
            httpsAgent: new https.Agent({
                ca: certVerifyFile,
            }),
        });
    }
    common_1.Logger.log('CA cert not Found');
    return axios_1.default.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
}
exports.Axios = getAxios();
function ConvertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
            if (line != '')
                line += ',';
            line += array[i][index];
        }
        str += line + '\n';
    }
    return str;
}
exports.ConvertToCSV = ConvertToCSV;
//# sourceMappingURL=helperFunctions.utils.js.map