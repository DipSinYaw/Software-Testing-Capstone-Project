const request = require("supertest");

// The base URL of the running application.
// Ensure your dev server is running (`npm run dev`) before executing these tests.
const BASE_URL = "http://localhost:3000";

describe("Products API Endpoint (/api/products/[id])", () => {
  it("should fetch a specific product and assert its details", async () => {
    const response = await request(BASE_URL).get("/api/products/1");

    expect(response.status).toBe(200);

    // console.log("test body value:" + JSON.stringify(response.body));
    expect(response.body).toHaveProperty("name", "Hat");
    expect(response.body).toHaveProperty("id", "1");
  });

  it("should return 404 for a non-existent product", async () => {
    const response = await request(BASE_URL).get("/api/products/9999"); // Use an ID that is unlikely to exist

    console.log("test status value:" + JSON.stringify(response.body));
    expect(response.status).toBe(404);
  });
});
