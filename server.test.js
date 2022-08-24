"use strict";

const request = require("supertest");
const app = require("./app");
jest.mock("mongoose", () => ({
  connect: jest.fn().mockImplementation((uri, options) => {
    return Promise.resolve({});
  }),
  Schema: jest.fn(),
  model: jest.fn().mockReturnValue({
    insertMany: jest.fn(),
  }),
}));
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {}),
    verify: jest.fn().mockReturnValue((mailoptions, callback) => {}),
  }),
}));

describe("Test contact", () => {
  // Test Contact API
  test("POST /contact", async () => {
    const response = await request(app)
      .post("/contact")
      .set("accept", "application/json")
      .send({ firstName: "test", lastName: "test", email: "test@example.com", message: "test message" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toBe(200);
  });
});
