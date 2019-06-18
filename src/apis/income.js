import axios from 'axios';
import Config from '../config';
import qs from 'qs';


function incomeTotal(token) {
    return axios.post(`${Config.HOST}/income/income_total`, qs.stringify({
        token,
    }))
}

function incomeBalance(token) {
    return axios.post(`${Config.HOST}/income/income_balance`, qs.stringify({
        token,
    }))
}

export {
    incomeTotal,
    incomeBalance
}