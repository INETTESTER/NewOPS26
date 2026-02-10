import http from 'k6/http';
import { check } from 'k6';
export function Authen_CreateTxn_CreateQR_Bay(cid) {
    //Step 1 : Authen
    const url = 'https://loadtest-new-ops.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `${__VU}${__ITER}` + cid;
    const payload = JSON.stringify({
        key: "ELbbfVIn5h6vhsnbIDKxzeE6GoAvigs1EEQHi0dNCHk5ALuNaRnJM8Q38vH5FDbsF8xct3d4MfK+nqraNiXXO/wwo+KiwLO3/EPzG3E4vyM9m47+cOOm9QpvZ4bNirrUpD+4zTds7w1L7/65dVd+MTM+Kb0PO+FwbW3HyQdLKp0=",
        orderId: "LOADTEST-KSP" + orderId
        //orderId: "LOADTEST-KSP"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response_authen = http.post(url, payload, params);
    if (!response_authen || response_authen.error_code || (response_authen.status !== 200 && response_authen.status !== 201)) {
        console.log("Authen Fail!!");
        return response_authen
    }
    const responseBody_oauth = JSON.parse(response_authen.body);
    const token_authen = responseBody_oauth.data.token;
    check(response_authen, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
    });
    //console.log('Response body:', token_authen);
    //return response_authen;
    //====================================================================================================
    //Step 2 : Create Transactions
    const url2 = 'https://loadtest-new-ops.inet.co.th/api/v1/payment-transactions/access-token';

    const payload2 = JSON.stringify({
        key: "ELbbfVIn5h6vhsnbIDKxzeE6GoAvigs1EEQHi0dNCHk5ALuNaRnJM8Q38vH5FDbsF8xct3d4MfK+nqraNiXXO/wwo+KiwLO3/EPzG3E4vyM9m47+cOOm9QpvZ4bNirrUpD+4zTds7w1L7/65dVd+MTM+Kb0PO+FwbW3HyQdLKp0=",
        //orderId: "LOADTEST-KSP",
        orderId: "LOADTEST-KSP" + orderId,
        orderDesc: "LOADTEST-KSP",
        amount: 1,
        payType: "QR",
        regRef: ""
    });

    const params2 = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token_authen,
        },
    };

    const response = http.post(url2, payload2, params2);
    //console.log('Response body:', response.body);
    if (!response || response.error_code || (response.status !== 200 && response.status !== 201)) {
        console.log("CreateTxn Fail ");
        return response
    }
    const responseBody_transaction = JSON.parse(response.body);
    const token_transaction = responseBody_transaction.data.accessToken;
    check(response, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
    });
    //return response;
    //=================================================================================================
    //Step 3 : QR Code
    //console.log(token_transaction);
    const url_qr = 'https://loadtest-new-ops.inet.co.th/bay/api/v1/payment/qr';
    const payload_qr = JSON.stringify({
        accessToken: '' + token_transaction
    });

    const params_qr = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response_qr = http.post(url_qr, payload_qr, params_qr);
    //console.log(response_qr.body);
    if (!response_qr || response_qr.error_code || (response_qr.status !== 200 && response_qr.status !== 201)) {
        console.log("QR Fail : " + response_qr.body);
        return response_qr
    }
    return response_qr
}