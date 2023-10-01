import request from "supertest";
import app from "./../../server/app";

describe("express-app", () => {
  it(`testing rute "/" method get`, async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ request: 'success' });
  });
});
