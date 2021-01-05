
exports.up = function(knex) {
    return knex.schema.createTable("clubs", (clubsTable) => {
        clubsTable.increments("club_id").primary();
        clubsTable.text("club_name").notNullable;
        clubsTable.float("longitude").notNullable;
        clubsTable.float("latitude").notNullable;
        clubsTable.text("phone_number").notNullable;
        clubsTable.text("address").notNullable;
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("clubs");
};
