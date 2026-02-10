import http from 'k6/http';
import { SharedArray } from 'k6/data';

const data = new SharedArray('id2', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
  return JSON.parse(open('../file/data.json')).id; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});

export function Callback_TTB(scenario) {
  const ref1 = data[scenario.iterationInTest];
  const url = 'https://loadtest-new-ops.inet.co.th/ttb/api/v1/payment/qr/callback';
  //console.log(ref1);
  const payload = JSON.stringify({
    InstructionId: "20250610134300097126904315100733020",
    BillerNo: "010753700001716",
    Ref1: "" + ref1,
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

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  //console.log('Response body:', response.body);
  return response;
}
