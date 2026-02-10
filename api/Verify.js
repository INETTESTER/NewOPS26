import http from 'k6/http';

export function Verify() {
  const url = 'https://loadtest-new-ops.inet.co.th/cimb/api/payment/cimb/verifydata/v1';

  const payload = JSON.stringify({
    header: {
      requester_system: "SIBS",
      request_reference_no: "BP202004021536201234543231",
      transaction_datetime: "2026-02-02T10:40:54.000+07:00"
    },
    data: {
      biller_id: "010754400009421",
      reference1: "P02022356312689",
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
  console.log('Response body:', response.body);
  return response;
}
