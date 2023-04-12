"use strict";

const axiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new axiosMockAdapter(axios);

const BASE_URL = "http://localhost:3000"

const {
  shipProduct,
  SHIPIT_SHIP_URL,
} = require("./shipItApi");


test("shipProduct", async function () {

  axiosMock.onPost(SHIPIT_SHIP_URL).reply(200, {
      receipt: {
        itemId: 1000,
        name: 'Test Tester',
        addr: '100 Test St',
        zip: '12345-6789',
        shipId: 814
      }
  }) 
         
    console.log("we are here")
    const shipId = await shipProduct({ productId: 1000,
                                    name: "Test Tester",
                                    addr: "100 Test St",
                                    zip: "12345-6789"});
    expect(shipId).toEqual(814);
      console.log("end of mock")
  // expect(shipId).toEqual(expect.any(Number));
});


