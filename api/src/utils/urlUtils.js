import {nanoid} from 'nanoid';

export const isValidURL = (url) => {
    let urlObject;
    try {
        urlObject = new URL(url);
    }catch(_) {
        return false;
    }
    return urlObject.protocol === "http:" || urlObject.protocol === "https:";
}

export const generateShortCode = (num) => {
    const code = nanoid(num);
    return code;
}

export const isExpired = (expire_at,date) => {
        if(!expire_at) {
            return false;
        }
        const expireDate = new Date(expire_at);
        if(expireDate < date){
            return true;
        }
        return false;
    }