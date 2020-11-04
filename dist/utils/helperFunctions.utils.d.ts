export declare const isObjectEmpty: (obj: unknown) => boolean;
export declare function hashString(string: string): Promise<string>;
export declare function arrayDiff(arr1: Array<any>, arr2: Array<any>): Array<any>;
export declare function hasNext(page: number, totalPages: number, hostAddress: string): string;
export declare function hasPrevious(page: number, totalPages: number, hostAddress: string): string;
export declare function capitalize(s: string): string;
export declare function format(str: string | number): string | number;
export declare function getFormattedDate(str: string): string;
export declare function objectArrayToArray(objectArray: Array<any>, attr: string): Array<any>;
export declare function paginate(pages: number, page: number, total: number, host: string, result: Array<any>): Ipagination;
export declare function serialize<T>(obj: T): T;
export declare function cleanData(obj: unknown, toRemove: Array<string>): void;
export declare function removeEmpty(obj: unknown): any;
export declare function handleError(error: {
    response: {
        data: {
            message: string | Record<string, any>;
            statusCode: number;
        };
    };
}): any;
export declare function parseJwt(token: string): any;
export declare const Axios: import("axios").AxiosInstance;
export declare function ConvertToCSV(objArray: Array<any>): string;
