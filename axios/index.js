/**
 * axios简单二次封装使用
 *Created by qiaozm on 2018/9/17
 */
import axios from 'axios';
import qs from 'querystring';
import instance from './instance';
export default class http {
    static async get(url, params,config) {
        /**
         * params{
         *  goods：id，
         *  name：string
         * } ==> ?goods=id&name=string
         */
        try {
            let query = qs.stringify(params);
            let res = null;
            if (!params) {
                res = await instance.get(url,config);
            } else {
                res = await instance.get(url + '?' + query,config);
            }
            return res
        } catch (error) {
            return error
        }
    }
    static async post(url,params,config) {
        try {
            return await instance.post(url,params,config);
        } catch (error) {
            return error
        }
    }
    static async patch(url, params,config) {
        try {
            return await instance.patch(url, params,config);
        } catch (error) {
            return error
        }
    }
    static async put(url, params,config) {
        try {
            return await instance.put(url, params,config);
        } catch (error) {
            return error
        }
    }
    static async delete(url, params,config) {
        /**
         * params默认为数组
         */
        try {
            return await instance.post(url, params,config);
        } catch (error) {
            return error
        }
    }

    /**
     *
     * @param params [{url:'',data:'参数对象'},{url:'',data:'参数对象'}]
     * @param config  扩展配置参数非必填
     * @returns {Promise<*>}
     */
    static async all(params,config){
        try{
            let arr=[];
            if(params!=null && params.length>0 ){
                for(let i=0;i<params.length;i++){
                    let query=params[i].data;
                    let url=params[i].url;
                    if(config!=null && config.method.toLowerCase()==='get'){
                        query = qs.stringify(params[i].data);
                        if(!query){
                            arr[i]=instance.get(url,config);
                        }else{
                            arr[i]=instance.get(url + '?' + query,config);
                        }
                    }else{
                        arr[i]=instance.post(url,query,config);
                    }
                }
            }
           return await axios.all(arr);
        }catch(error){
            return error;
        }
    }
}