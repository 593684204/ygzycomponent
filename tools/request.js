/**
 * autor:qiaozm 2018/05/10
 * 网络请求封装组件
 */
import constant from '../tools/constant';//常量组件
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errorText = codeMessage[response.status] || response.statusText;

    const error = new Error(errorText);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       请求地址
 * @param  {object} [options] 请求参数
 * @return {object}           返回对象 "data" or "err"
 */
export default function request(url, options) {
    const defaultOptions = {
        timeout: constant.timeout
    };
    //options.body += '&versionType=' + RNBridgeModule.versionType + '&versionCode=' + RNBridgeModule.versionCode + '&bundleCode=' + RNBridgeModule.bundleCode + '&upPwsNum=';
    console.log(options);
    const newOptions = {...defaultOptions, ...options};
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                ...newOptions.headers
            };
            //newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers
            };
        }
    }

    //console.log(url, newOptions);
    const fetchPromise = new Promise((resolve, reject) => {
        fetch(url, newOptions)
            .then(checkStatus)
            .then(response => {
                if (newOptions.method === 'DELETE' || response.status === 204) {
                    return response.text();
                }
                // console.log(response);
                return response.json();
            })
            .then(res => {
                // console.log(res);
                resolve(res);
            })
            .catch(e => {
                reject(e);
            });
    });

    return timeoutPromise(fetchPromise, newOptions.timeout);
}

/**
 * 超时
 * @param fetchPromise
 * @param timeout
 * @returns {Promise<any>}
 */
const timeoutPromise = (fetchPromise, timeout) => {
    let abortFn = null;

    //这是一个可以被reject的promise
    const abortPromise = new Promise((resolve, reject) => {
        abortFn = () => {
            reject({status: 504});
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let racePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(() => {
        abortFn();
    }, timeout);

    return racePromise;
};