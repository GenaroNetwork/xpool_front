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

function extract_income_balance(token,value,password) {
    return axios.post(`${Config.HOST}/income/extract_income_balance`, qs.stringify({
        token,
        value,
        password
    }))
}


function extract_income_list(token, page=1, pageSize=10) {
    return axios.post(`${Config.HOST}/income/extract_income_list`, qs.stringify({
        token,
        page,
        pageSize
    }))
}


function admin_extract_income_list(token, page=1, pageSize=10) {
    return axios.post(`${Config.HOST}/income/admin_extract_income_list`, qs.stringify({
        token,
        page,
        pageSize
    }))
}



function extract_income_review(reviewId,reason,token,password,states) {
    return axios.post(`${Config.HOST}/income/extract_income_review`, qs.stringify({
        reviewId,
        reason,
        token,
        password,
        states
    }))
}

export {
    incomeTotal,
    incomeBalance,
    extract_income_balance,
    extract_income_list,
    admin_extract_income_list,
    extract_income_review,
}