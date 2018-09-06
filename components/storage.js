/**
 * storage初始化对象
 *
 * _saveData方法：
 * key：key值，唯一标识，必传
 * data：传递的对象值，必传
 * expires：数据过期时间，格式（1000 * 3600 * 24）不传则默认一天，在storage中设置的默认，非必传
 * id：非必传，id标识
 *
 *
 * _readData方法：
 * key：key值，与set方法key值对应，必传
 * data：里面暂时只有autoSync这个属性，autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
 * syncCallBack:没有找到数据或数据过期时自动调用的方法
 */
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
let storage = new Storage({
    //最大容量，默认值1000条数据循环存储
    size: 1000,
    //存储引擎：RN使用AsyncStorage
    //如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    //数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,
    //读写时在内存中缓存数据，默认开启
    enableCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    sync : ()=>{},
});
const local = {
    _saveData(key, data, expires, id){
        let setValue = JSON.stringify(data);
        if (id) {
            storage.save({
                key: key,
                id: id,
                data: setValue,
                expires: expires ? expires : null
            })
        } else {
            storage.save({
                key: key,
                data: setValue,
                expires: expires ? expires : null
            })
        }

    },

_readData(key,data,syncCallBack)
{
    storage.load({
        key: key,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: data.autoSync==null?false:data.autoSync,
        sync:data.autoSync==null?storage.sync:syncCallBack,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        syncInBackground: true,
        // 你还可以给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: {
                // 各种参数

            },
            someFlag: true,
        },
    }).then(ret => {
        console.log("strong=========================="+JSON.stringify(ret));
    }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                //this.setState({data: 'NotFoundError'});
                break;
            case 'ExpiredError':
                //this.setState({data: 'ExpiredError'});
                break;
        }
    })
}};

module.exports = local;
