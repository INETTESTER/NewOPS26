//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';
import { DownloadFile, GetProfile, PostProfile, PostProfile_2, PostProfile_3, UploadFile } from '../api/example.js';
import { Authen } from '../api/Authen.js';
import { Authen_CreateTxn_CreateQR_Bay } from '../api/Authen_CreateTxn_CreateQR_Bay.js';
import { Authen_CreateTxn } from '../api/Authen_CreateTxn.js';
//import { Callback_Bay } from '../api/Callback_Bay.js';
//import { Authen_CreateTxn_CreateQR_Callback_Bay } from '../api/Authen_CreateTxn_CreateQR_Callback_Bay.js';
import { Authen_CreateTxn_CreateQR_TTB } from '../api/Authen_CreateTxn_CreateQR_TTB.js';
import { Callback_TTB } from '../api/Callback_TTB.js';
import { Authen_CreateTxn_CreateQR_Callback_TTB } from '../api/Authen_CreateTxn_CreateQR_Callback_TTB.js';
import { InquiryTxn } from '../api/InquiryTxn.js';
import { InquiryDate } from '../api/InquiryDate.js';
import { InquiryTxn_Authen_CreateTxn_Callback } from '../api/InquiryTxn_Authen_CreateTxn_Callback.js';
import { InquiryDate_Authen_CreateTxn_Callback } from '../api/InquiryDate_Authen_CreateTxn_Callback.js';
import { Authen_CreateTxn_CreateQR_CIMB } from '../api/Authen_CreateTxn_CreateQR_CIMB.js';
import { Authen_CreateTxn_CreateQR_Callback_CIMB } from '../api/Authen_CreateTxn_CreateQR_Callback_CIMB.js';
import { Verify } from '../api/verify.js';



//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  //================= BAY ======================
  //response = Authen(cid)
  //response = Authen_CreateTxn(cid)
  //response = Authen_CreateTxn_CreateQR_Bay(cid)
  //response = Callback_Bay(scenario)
  //response = Authen_CreateTxn_CreateQR_Callback_Bay(cid)

  //================= TTB =======================
  //response = Authen_CreateTxn_CreateQR_TTB(cid)
  response = Callback_TTB(scenario)
  //response = Authen_CreateTxn_CreateQR_Callback_TTB(cid)

  //================= CIMB ======================
  //response = Authen_CreateTxn_CreateQR_CIMB(cid)
  //response = Authen_CreateTxn_CreateQR_Callback_CIMB(cid)
  //response = Verify()

  //================= Inquiry ===================
  //response = InquiryTxn()
  //response = InquiryDate()
  //response = InquiryTxn_Authen_CreateTxn_Callback(cid)
  //response = InquiryDate_Authen_CreateTxn_Callback(cid)


  error_check(response);
  sleep(1)
}











































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response;
const scenariox = __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if (scenariox == 1) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    discardResponseBodies: false,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 2) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    vus: user,
    duration: durationx + 's',
    gracefulStop: '120s',
  };
}
else if (scenariox == 3) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx + 's', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
        gracefulStop: '120s',
      },
    },
  };
}
else {
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };