
exports.up = function (knex) {
    return knex.schema.createTable("users", (usersTable) => {
        usersTable.increments("user_id").primary();
        usersTable.text("username").notNullable;
        usersTable.text("first_name").notNullable;
        usersTable.text("last_name").notNullable;
        usersTable.text("image_url").notNullable;
        usersTable.float("latitude").notNullable;
        usersTable.float("longitude").notNullable;
        usersTable.text("date_of_birth").notNullable;
        usersTable.text("gender")
        usersTable.integer("ability").notNullable;
        usersTable.text("playing_hand").notNullable;
        usersTable.text("club_membership")
        usersTable.boolean("weekday_daytime")
        usersTable.boolean("weekday_evening")
        usersTable.boolean("weekends")
        // usersTable.boolean("mon_morn").notNullable;
        // usersTable.boolean("mon_aft").notNullable;
        // usersTable.boolean("mon_eve").notNullable;
        // usersTable.boolean("tues_morn").notNullable;
        // usersTable.boolean("tues_aft").notNullable;
        // usersTable.boolean("tues_eve").notNullable;
        // usersTable.boolean("wed_morn").notNullable;
        // usersTable.boolean("wed_aft").notNullable;
        // usersTable.boolean("wed_eve").notNullable;
        // usersTable.boolean("thurs_morn").notNullable;
        // usersTable.boolean("thurs_aft").notNullable;
        // usersTable.boolean("thurs_eve").notNullable;
        // usersTable.boolean("fri_morn").notNullable;
        // usersTable.boolean("fri_aft").notNullable;
        // usersTable.boolean("fri_eve").notNullable;
        // usersTable.boolean("sat_morn").notNullable;
        // usersTable.boolean("sat_aft").notNullable;
        // usersTable.boolean("sat_eve").notNullable;
        // usersTable.boolean("sun_morn").notNullable;
        // usersTable.boolean("sun_aft").notNullable;
        // usersTable.boolean("sun_eve").notNullable;
        usersTable.text("description")
        usersTable.integer("distance").default(10);
        usersTable.integer("min_ability")
        usersTable.integer("max_ability")
        usersTable.text("hand_preference")
        usersTable.integer("min_age").default(18);
        usersTable.integer("max_age").default(100);
        usersTable.text("gender_preference")
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
