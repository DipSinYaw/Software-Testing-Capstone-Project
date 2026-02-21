const request = require("supertest");

const BASE_URL = "http://localhost:3000";

describe("Products API Endpoint (/api/products/[id])", () => {
  it("should fetch a specific product and assert its details", async () => {
    const response = await request(BASE_URL).get("/api/products/1");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("name", "Hat");
    expect(response.body).toHaveProperty("id", "1");
    expect(typeof response.body.price).toBe('number');
  });

  it("should return 404 for a non-existent product", async () => {
    const response = await request(BASE_URL).get("/api/products/9999"); // Use an ID that is unlikely to exist

    expect(response.status).toBe(404);
    expect(response.text).toBe("Product not found");
  });
});

