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
        .then((res) => {
          expect(res.body.users).toEqual(expect.any(Array));
          expect(Object.keys(res.body.users[0])).toEqual(
            expect.arrayContaining(["user_id","username","first_name","last_name","latitude","longitude","date_of_birth","gender","ability","playing_hand","club_membership","mon_morn","mon_aft","mon_eve","tues_morn","tues_aft","tues_eve","wed_morn","wed_aft","wed_eve","thurs_morn","thurs_aft","thurs_eve","fri_morn","fri_aft","fri_eve","sat_morn","sat_aft","sat_eve","sun_morn","sun_aft","sun_eve","description","photo","distance","min_ability","max_ability","hand_preference","min_age","max_age","gender_preference"
        ])
          );
          expect(res.body.topics.length).toBe(20);
        });
    });
  })
})