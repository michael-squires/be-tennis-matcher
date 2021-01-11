process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/users", () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  describe("getUsers", () => {
    test("GET responds with 200 when users is requested and format is correct", () => {
      return request(app)
        .get("/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(Object.keys(body.users[0])).toEqual(
            expect.arrayContaining(["user_id", "username", "first_name", "last_name", "image_url", "latitude", "longitude", "date_of_birth", "gender", "ability", "playing_hand", "club_membership", "weekday_daytime", "weekday_evening", "weekends", "description", "distance", "min_ability", "max_ability", "hand_preference", "min_age", "max_age", "gender_preference"
            ])
          );
          expect(body.users.length).toBe(20);
        });
    });
    test("should not return the details of the user whose username is added to the query", () => {
      return request(app)
        .get("/users?username=martina.hingis@yahoo.co.uk")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(19);
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
    test('should filter by minAge / maxAge if those queries exist', () => {
      return request(app)
        .get("/users?min_age=25&&max_age=40")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toEqual(expect.any(Array));
          expect(body.users.length).toBe(9);
        });
    });
  });

  describe("getCurrentUser", () => {
    test("GET responds with 200 when a specific username is requested and format is correct", () => {
      return request(app)
        .get("/users/martina.hingis@yahoo.co.uk")
        .expect(200)
        .then(({ body }) => {
          expect(body.user_id).toBe(1)
          expect(body.username).toBe("martina.hingis@yahoo.co.uk")
          expect(body.first_name).toBe("Martina")
          expect(body.last_name).toBe("Hingis")
          expect(body.latitude).toBe(53.796307)
          expect(body.longitude).toBe(-1.564126)
          expect(body.gender).toBe("f")
          expect(body.ability).toBe(1)
          expect(body.playing_hand).toBe("right-handed")
          expect(body.club_membership).toBe("Kirkstall Abbey Tennis Club")
          expect(body.weekday_daytime).toBe(true)
          expect(body.weekday_evening).toBe(false)
          expect(body.weekends).toBe(false)
          expect(body.description).toBe("Tennis is mostly mental. Of course you must have a lot of physical skill but you can't play tennis well and not be a good thinker. You win or lose the match before you even go out there. Venus Williams")
          expect(body.distance).toBe(10)
          expect(body.min_ability).toBe(1)
          expect(body.max_ability).toBe(3)
          expect(body.hand_preference).toBe("")
          expect(body.min_age).toBe(18)
          expect(body.max_age).toBe(100)
          expect(body.gender_preference).toBe("")
        });
    });
  });

  describe("postNewUser", () => {
    test("POST responds with 201 when a specific username is requested and format is correct", () => {
      return request(app)
        .post("/users/john.doe@yahoo.co.uk")
        .send({
          username: "john.doe@yahoo.co.uk",
          first_name: "John",
          last_name: "Doe",
          latitude: 19.017656,
          longitude: 72.85618,
          date_of_birth: "19880908",
          gender: "m",
          ability: 1,
          playing_hand: "right-handed",
          club_membership: "YTC Tennis Club",
          weekday_daytime: false,
          weekday_evening: true,
          weekends: false,
          description: "I have just started playing tennis and am looking for new partners in the area",
          distance: 20,
          min_ability: 1,
          max_ability: 1,
          hand_preference: "left-handed",
          min_age: 30,
          max_age: 50,
          gender_preference: "f"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user_id).toBe(21)
          expect(body.username).toBe("john.doe@yahoo.co.uk")
          expect(body.first_name).toBe("John")
          expect(body.last_name).toBe("Doe")
          expect(body.latitude).toBe(19.017656)
          expect(body.longitude).toBe(72.85618)
          expect(body.gender).toBe("m")
          expect(body.ability).toBe(1)
          expect(body.playing_hand).toBe("right-handed")
          expect(body.club_membership).toBe("YTC Tennis Club")
          expect(body.weekday_daytime).toBe(false)
          expect(body.weekday_evening).toBe(true)
          expect(body.weekends).toBe(false)
          expect(body.description).toBe("I have just started playing tennis and am looking for new partners in the area")
          expect(body.distance).toBe(20)
          expect(body.min_ability).toBe(1)
          expect(body.max_ability).toBe(1)
          expect(body.hand_preference).toBe("left-handed")
          expect(body.min_age).toBe(30)
          expect(body.max_age).toBe(50)
          expect(body.gender_preference).toBe("f")
        });
    });
  });

  describe("patchCurrentUser", () => {
    test("Patch responds with 201 when the preferences for a specific username are updated", () => {
      return request(app)
        .patch("/users/martina.hingis@yahoo.co.uk")
        .send({ distance: 15, min_ability: 1, max_ability: 2, hand_preference: "left-handed", min_age: 24, max_age: 46, gender_preference: "f" })
        .expect(201)
        .then(({ body }) => {
          expect(body.distance).toBe(15)
          expect(body.min_ability).toBe(1)
          expect(body.max_ability).toBe(2)
          expect(body.hand_preference).toBe("left-handed")
          expect(body.min_age).toBe(24)
          expect(body.max_age).toBe(46)
          expect(body.gender_preference).toBe("f")
        });
    });
  });
});

