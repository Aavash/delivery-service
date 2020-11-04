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
exports.formUrlEncoded = exports.Axios = exports.hashString = exports.fileName = exports.validateUUIDwithMessage = exports.validateUUID = exports.cleanData = exports.parseJwt = exports.removeEmpty = exports.paginate = exports.hasPrevious = exports.hasNext = exports.isObjectEmpty = void 0;
const class_transformer_1 = require("class-transformer");
const argon = __importStar(require("argon2"));
const is_uuid_1 = require("@nestjs/common/utils/is-uuid");
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
exports.isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
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
function removeEmpty(obj) {
    return Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
}
exports.removeEmpty = removeEmpty;
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
}
exports.parseJwt = parseJwt;
function cleanData(obj, toRemove) {
    for (const key of Object.keys(obj)) {
        if (toRemove.includes(key)) {
            delete obj[key];
        }
    }
}
exports.cleanData = cleanData;
function validateUUID(idx) {
    if (!is_uuid_1.isUUID(idx, 'all')) {
        throw new common_1.HttpException('Invalid idx', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.validateUUID = validateUUID;
function validateUUIDwithMessage(idx, message) {
    if (!is_uuid_1.isUUID(idx, 'all')) {
        throw new common_1.HttpException(`Invalid ${message}`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.validateUUIDwithMessage = validateUUIDwithMessage;
exports.fileName = OldName => {
    return (path.basename(OldName, path.extname(OldName)) +
        '-' +
        Date.now() +
        path.extname(OldName));
};
async function hashString(string) {
    return argon.hash(string, {
        type: argon.argon2d,
        hashLength: 50,
    });
}
exports.hashString = hashString;
function getAxios() {
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
exports.formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
//# sourceMappingURL=helpers.js.map