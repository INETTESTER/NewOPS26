import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check } from 'k6';

const data = new SharedArray('id4', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
  return JSON.parse(open('../file/data.json')).id; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});

export function Callback_Verify_CIMB(scenario) {
  const ref1 = data[scenario.iterationInTest];
  const url = 'https://loadtest-new-ops.inet.co.th/cimb/api/payment/cimb/verifydata/v1';

  const payload = JSON.stringify({
    header: {
      requester_system: "SIBS",
      request_reference_no: "BP202004021536201234543231",
      transaction_datetime: "2026-02-02T10:40:54.000+07:00"
    },
    data: {
      biller_id: "010754400009421",
      reference1: "" + ref1,
      reference2: "M24120200001",
      reference3: "66",
      transaction_id: "REF12345",
      transaction_datetime: "2026-02-02T10:40:54.000+07:00",
      amount_paid: 1,
      sender_account_name: "AAAA"
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'True-Client-Ip': '203.23.188.236',
      'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04Zzt2aU49eWpvUDJE',
    },
  };

  const response = http.post(url, payload, params);
  //console.log('Response body:', response.body);
  if (!response || response.error_code || (response.status !== 200 && response.status !== 201)) {
    console.log("Verify Fail!!");
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
  //return response;
  //================================================================================
  const url2 = 'https://loadtest-new-ops.inet.co.th/cimb/api/payment/cimb/notification/v1';

  const payload2 = JSON.stringify({
    data: {
      amount_paid: 1,
      biller_display_name: "",
      biller_id: "010754400009421",
      reference1: "" + ref1,
      reference2: "M24120200001",
      reference3: "",
      result: "S",
      sender_account_name: "Suthasinee Phasiw",
      sender_account_number: "1234567890",
      sender_bank_code: "004",
      transaction_datetime: "2026-02-02T10:10:00.000+07:00",
      transaction_id: "20260202101000"
    },
    header: {
      request_reference_no: "SIBS55328df0-eb90-4511-82f9-b03799bc6662",
      requester_system: "SIBS",
      transaction_datetime: "2025-08-22T10:10:00.000+07:00"
    }
  });

  const params2 = {
    headers: {
      'True-Client-Ip': '203.23.188.236',
      'Content-Type': 'application/json',
      'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04Zzt2aU49eWpvUDJE',
    },
  };

  const response2 = http.post(url2, payload2, params2);

  //console.log('Response body:', response.body);

  return response2;
}
