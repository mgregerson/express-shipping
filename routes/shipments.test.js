"use strict";

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app).post("/shipments").send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error JSON if user provides invalid input", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: "1000",
      name: "",
      addr: "100 Test St",
      zip: "23",
    });
    expect(resp.body).toEqual({
      error: {
        message: [
          "instance.productId is not of a type(s) integer",
          "instance.name does not meet minimum length of 1",
          "instance.zip does not meet minimum length of 5",
        ],
        status: 400,
      },
    });
  });
});
