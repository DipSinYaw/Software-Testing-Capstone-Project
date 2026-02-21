import http from "k6/http";
import { check, sleep } from "k6";

export const options = {

  stages: [
    { duration: "30s", target: 20 }, 
    { duration: "1m", target: 20 }, 
    { duration: "10s", target: 0 }, 
  ],

  thresholds: {

    http_req_duration: ["p(95)<500"],

    http_req_failed: ["rate<0.01"],
  },
};

export default function () {

  const res = http.get("http://127.0.0.1:3000/api/products");

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}
