/* eslint-disable no-unused-vars */
import assert from "node:assert";
import request from "supertest";
import { database } from "../src/libs/prisma.js";

const baseUrl = "http://localhost:3000/api";

/**
    iii. Fetch posts (fetch all posts)
**/
describe("GET /post", function () {
  this.timeout(0);

  it("should have a content type of application/json", function (done) {
    request(baseUrl)
      .get("/post")
      .expect("Content-Type", "application/json; charset=utf-8", done);
  });
  it("should return a status code of 200", function (done) {
    request(baseUrl).get("/post").expect(200, done);
  });
  it("should return response message of 'All posts found' and an array of posts", function (done) {
    request(baseUrl)
      .get("/post")
      .expect(function (res) {
        assert.deepStrictEqual(res.body.message, "All posts found");
        assert.ok(Array.isArray(res.body.data));
      })
      .end(done);
  });
});

const correctUserData = {
  username: "Deyo100",
  password: "DeyoTech100",
};

const wrongUserData = {
  username: "Dey",
  password: "Dey",
};
/**
    i. Register
**/
describe("POST /auth/register", function () {
  this.timeout(0);

  beforeEach(async function () {
    const user = await database.user.findUnique({
      where: { username: correctUserData.username },
    });
    if (user) {
      await database.user.delete({
        where: { username: correctUserData.username },
      });
    }
  });

  it("should return a message of Invalid Request and Array of Errors", function (done) {
    request(baseUrl)
      .post("/auth/register")
      .send(wrongUserData)
      .expect(function (res) {
        assert.deepStrictEqual(res.body.message, "Invalid Request");
        assert.ok(Array.isArray(res.body.errors));
      })
      .end(done);
  });

  it("should return a status code of 400", function (done) {
    request(baseUrl)
      .post("/auth/register")
      .send(wrongUserData)
      .expect(400)
      .end(done);
  });
  it("should return a status code of 201", function (done) {
    request(baseUrl)
      .post("/auth/register")
      .send(correctUserData)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        // console.log(res)
        done();
      });
  });
  it("should return a message of User created successfully and a Token", function (done) {
    request(baseUrl)
      .post("/auth/register")
      .send(correctUserData)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        assert.deepStrictEqual(res.body.message, "User created successfully");
        assert.ok(res.body.data.hasOwnProperty("token"));
        // console.log(res)
        done();
      });
  });
});

const loginUser = {
  username: "DeyoTech",
  password: "DeyoTech100",
};
const WrongLoginuser = {
  username: "DeyoTech",
  password: "Deyozz100",
};

/**
    ii. Login
**/
describe("POST /auth/login", function () {
  this.timeout(0);
  it("should return a message of Invalid User or Password", function (done) {
    request(baseUrl)
      .post("/auth/login")
      .send(WrongLoginuser)
      .expect(function (res) {
        assert.deepStrictEqual(res.body.message, "Invalid User or Password");
      })
      .end(done);
  });

  it("should return a status code of 400", function (done) {
    request(baseUrl)
      .post("/auth/login")
      .send(wrongUserData)
      .expect(400)
      .end(done);
  });
  it("should return a status code of 200", function (done) {
    request(baseUrl)
      .post("/auth/login")
      .send(loginUser)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        // console.log(res)
        done();
      });
  });
  it("should return a message of User logged in successfully and a Token", function (done) {
    request(baseUrl)
      .post("/auth/login")
      .send(loginUser)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        assert.deepStrictEqual(res.body.message, "User logged in successfully");
        assert.ok(res.body.data.hasOwnProperty("token"));
        // console.log(res)
        done();
      });
  });
});

const post = {
  id: "65439d8d4742726a36e8fc23",
  image: null,
  title: "Unique post",
  slug: "unique-post-1698930061625",
  tags: [],
  content: "This is a Unique Post from DeyoTech",
  createdAt: "2023-11-02T13:01:01.736Z",
  updatedAt: "2023-11-02T13:01:01.736Z",
  authorId: "65439990e7f4ee2ea28275cc",
};
let userToken;

/**
    iV. Fetch a particular users post (requires authentication)
**/
describe("GET /post/:id", function () {
  this.timeout(0);

  it("should login user and get token", function (done) {
    request(baseUrl)
      .post("/auth/login")
      .send(loginUser)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        userToken = res.body.data.token;
        done();
      });
  });

  it("should return a status code of 401", function (done) {
    request(baseUrl).get(`/post/${post.id}`).expect(401, done);
  });
  it("should contain a message value of Unauthorized", function (done) {
    request(baseUrl)
      .get(`/post/${post.id}`)
      .expect(function (res) {
        assert.deepStrictEqual(res.body.message, "Unauthorized.");
      })
      .end(done);
  });
  it("should return a 200 status code", function (done) {
    request(baseUrl)
      .get(`/post/${post.id}`)
      .auth(userToken, { type: "bearer" })
      .expect(200, done);
  });
  it("should contain a message value of Post found", function (done) {
    request(baseUrl)
      .get(`/post/${post.id}`)
      .auth(userToken, { type: "bearer" })
      .expect(function (res) {
        assert.deepStrictEqual(res.body.message, "post found");
        assert.deepEqual(res.body.data, post);
      })
      .end(done);
  });
});
