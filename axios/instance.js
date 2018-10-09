/**
 *Created by qiaozm on 2018/9/20
 */
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://test.ygzykj.com:1901/',//https://test.ygzykj.com:1901/
    method:'post',
    timeout: 100000,
    responseType:'json',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});
export default instance;