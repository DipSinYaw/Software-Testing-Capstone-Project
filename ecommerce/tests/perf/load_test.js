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

// This is the main function that each virtual user will execute repeatedly.
export default function () {
  // Each VU sends a GET request to the all products endpoint.
  const res = http.get("http://127.0.0.1:3000/api/products");

  // Check if the request was successful.
  check(res, { "status is 200": (r) => r.status === 200 });


  sleep(1);
}
