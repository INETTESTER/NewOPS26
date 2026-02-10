import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';

// const raw = open('../file/txid.json').replace(/^\uFEFF/, '');
// const data = new SharedArray('trxId', function () {
//   return JSON.parse(raw).payment_transaction_no;
// });

const data = new SharedArray('trxId', function () {
  return JSON.parse(open('../file/txid.json')).payment_transaction_no;
});


export function Callback_Bay() {
  //const trxId = data[__VU % data.length].bank_ref;
  const trxId = data[scenario.iterationInTest % data.length].bank_ref;

  //console.log(trxId);
  const url = 'https://loadtest-new-ops.inet.co.th/bay/api/v1/payment/qr/callback';

  const payload = JSON.stringify({
    trxId: "" + trxId,
    trxStatus: "1",
    amount: "1",
    datetime: "2025-09-18T10:36:31Z",
    terminalId: "",
    feeMerchant: "1.00 ",
    fromAccount: "XXX-X-XX302-9",
    billerId: "010754400009425",
    channel: "2"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //const response = http.post(url, payload, params);
  //console.log('Response body:', response.body);
  return response;
}
