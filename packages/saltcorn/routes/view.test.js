const request = require("supertest");
const app = require("../app");
const {
  getStaffLoginCookie,
  getAdminLoginCookie,
  itShouldRedirectUnauthToLogin
} = require("../auth/testhelp");

describe("view endpoint", () => {
  it("should show view to unauth TODO public vs private views", async done => {
    const res = await request(app).get("/view/authorlist");

    expect(res.statusCode).toEqual(200);
    expect(res.text.includes("Tolstoy")).toBe(true);
    expect(res.text.includes("728")).toBe(false);

    done();
  });
});

describe("viewedit list endpoint", () => {
  itShouldRedirectUnauthToLogin("/viewedit/list");

  it("show list of views", async done => {
    const loginCookie = await getAdminLoginCookie();
    const res = await request(app)
      .get("/viewedit/list")
      .set("Cookie", loginCookie);
    expect(res.statusCode).toEqual(200);
    expect(res.text.includes("authorlist")).toBe(true);
    done();
  });
});

describe("viewedit edit endpoint", () => {
  itShouldRedirectUnauthToLogin("/viewedit/edit/authorlist");

  it("show list of views", async done => {
    const loginCookie = await getAdminLoginCookie();
    const res = await request(app)
      .get("/viewedit/edit/authorlist")
      .set("Cookie", loginCookie);
    expect(res.statusCode).toEqual(200);
    expect(res.text.includes("author")).toBe(true);
    done();
  });
});

describe("viewedit new endpoint", () => {
  itShouldRedirectUnauthToLogin("/viewedit/new");

  it("show new view", async done => {
    const loginCookie = await getAdminLoginCookie();
    const res = await request(app)
      .get("/viewedit/new")
      .set("Cookie", loginCookie);
    expect(res.statusCode).toEqual(200);
    expect(res.text.includes("Template")).toBe(true);
    done();
  });
  it("submit new view", async done => {
    const loginCookie = await getAdminLoginCookie();
    const res = await request(app)
      .post("/viewedit/config")
      .send("viewtemplate=list")
      .send("table_name=books")

      .set("Cookie", loginCookie);
    expect(res.statusCode).toEqual(200);
    expect(res.text.includes("View configuration")).toBe(true);
    done();
  });
});