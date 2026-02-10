import http from 'k6/http';

export function InquiryDate() {
  const url = 'https://loadtest-new-ops.inet.co.th/portal/api/v1/payment-transactions/inquiry-txn';

  const payload = JSON.stringify({
    key: "ELbbfVIn5h6vhsnbIDKxzeE6GoAvigs1EEQHi0dNCHk5ALuNaRnJM8Q38vH5FDbsF8xct3d4MfK+nqraNiXXO/wwo+KiwLO3/EPzG3E4vyM9m47+cOOm9QpvZ4bNirrUpD+4zTds7w1L7/65dVd+MTM+Kb0PO+FwbW3HyQdLKp0=",
    status: "Success",
    payment_transaction_no: "",
    end_date: "20260202",
    start_date: "20260101"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  console.log('Response body:', response.body);
  return response;
}
