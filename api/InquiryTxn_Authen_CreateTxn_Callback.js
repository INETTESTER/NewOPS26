import http from 'k6/http';
import { check } from 'k6';
export function InquiryTxn_Authen_CreateTxn_Callback(cid) {
    const url_1 = 'https://loadtest-new-ops.inet.co.th/portal/api/v1/payment-transactions/inquiry-txn';
    const payload_1 = JSON.stringify({
        key: "ELbbfVIn5h6vhsnbIDKxzeE6GoAvigs1EEQHi0dNCHk5ALuNaRnJM8Q38vH5FDbsF8xct3d4MfK+nqraNiXXO/wwo+KiwLO3/EPzG3E4vyM9m47+cOOm9QpvZ4bNirrUpD+4zTds7w1L7/65dVd+MTM+Kb0PO+FwbW3HyQdLKp0=",
        status: "",
        payment_transaction_no: "P02024641248621",
        end_date: "",
        start_date: ""
    });

    const params_1 = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response_1 = http.post(url_1, payload_1, params_1);
    if (!response_1 || response_1.error_code || (response_1.status !== 200 && response_1.status !== 201)) {
        console.log("InquiryTxn Fail!!");
        return response_1
    }
    check(response_1, {
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
    //console.log('Response body:', response.body);
    //return response;
    //============================================================================================
    //Step 1 : Authen
    const url = 'https://loadtest-new-ops.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `${__VU}${__ITER}` + cid;
    const payload = JSON.stringify({
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        orderId: "test-balance" + orderId
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
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        //orderId: "LOADTEST-KSP",
        orderId: "test-balance" + orderId,
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
    //return response
    //================================================================================
    //Step 4 : Callback
    const url_c = 'https://loadtest-new-ops.inet.co.th/ttb/api/v1/payment/qr/callback';

    const payload_c = JSON.stringify({
        InstructionId: "20250610134300097126904315100733020",
        BillerNo: "010753700001716",
        Ref1: "P05276442313324",
        Ref2: "M25052700001",
        QRId: "ZXXXE231231235900001",
        PayerAccount: "0123456789",
        PayerName: "นส.สุธาสิณี ผาซิว",
        PayerBank: "004",
        Amount: "1",
        ResultCode: "000",
        ResultDesc: "Successful",
        TransDate: "20250610134300"
    });

    const params_c = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response_c = http.post(url_c, payload_c, params_c);
    //console.log('Response body:', response.body);
    return response_c;
}