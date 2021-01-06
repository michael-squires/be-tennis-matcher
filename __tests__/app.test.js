process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/users", () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  describe("get users", () => {
    test("GET responds with 200 when users is requested and format is correct", () => {
      return request(app)
        .get("/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(Object.keys(body.users[0])).toEqual(
            expect.arrayContaining(["user_id", "username", "first_name", "last_name", "latitude", "longitude", "date_of_birth", "gender", "ability", "playing_hand", "club_membership", "weekday_daytime", "weekday_evening", "weekends", "description", "photo", "distance", "min_ability", "max_ability", "hand_preference", "min_age", "max_age", "gender_preference"
            ])
          );
          expect(body.users.length).toBe(20);
        });
    });
    test('should filter by gender if gender query added', () => {
      return request(app)
        .get("/users?gender=m")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.every(({ gender }) => (gender === 'm'))).toBe(true)
          expect(body.users.length).toBe(10);
        });
    });
    test('should filter by handedness if that query added', () => {
      return request(app)
        .get("/users?playing_hand=left-handed")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.every(({ playing_hand }) => (playing_hand === 'left-handed'))).toBe(true)
          expect(body.users.length).toBe(8);
        });
    });
    test('should filter by ability range if those queries added', () => {
      return request(app)
        .get("/users?min_ability=1&max_ability=2")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.every(({ ability }) => (ability >= 1 && ability <= 3))).toBe(true)
          expect(body.users.length).toBe(13);
        });
    });
    test('should filter by weekday evening availability if this query is added', () => {
      return request(app)
        .get("/users?weekday_evening=true")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.every(({ weekday_evening }) => (weekday_evening))).toBe(true)
          expect(body.users.length).toBe(6);
        });
    });
    test('should filter by distance if distance query exists', () => {
      return request(app)
        .get("/users?distance=1&&latitude=53.796305&&longitude=-1.564126")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.length).toBe(9);
        });
    });
    test('should filter by minAge/ maxAge if those queries exist', () => {
      return request(app)
        .get("/users?min_age=25&&max_age=40")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.length).toBe(9);
        });
    });
  });
});

