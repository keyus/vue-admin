import axios from 'axios';
import Qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [data => Qs.stringify(data)];

const host  = "http://api.com";
const AmApi = {
    category (id) {
        let sendid = id || '';
        return axios.get(`${host}/v1/category/getdata?id=${sendid}`);
    },
    //type = update  | insert   update  is default
    categoryEdit (query) {
        return axios.post(`${host}/v1/category/edit`,query);
    },
    categoryDelete (id) {
        return axios.post(`${host}/v1/category/delete`,{id:id});
    }
};

export default AmApi;