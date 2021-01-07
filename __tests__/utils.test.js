const { filterByDistance, filterByAge } = require('../db/utils/data-manipulation')

describe('distance filter', () => {
    test('should return true if geolocations within specified distance', () => {
        const lat1 = 53.32055555555556, long1 = -1.7297222222222221
        const lat2 = 53.31861111111111, long2 = -1.6997222222222223
        expect(filterByDistance(lat1, long1, lat2, long2, 1)).toBe(false)
        expect(filterByDistance(lat1, long1, lat2, long2, 10)).toBe(true)
    });
});

describe('filterByAge returns age for a date provided as YYYYMMDD string and compares it against a minimum and a maximum age', () => {
    test('should return true for a datestring between a minimum and a maximum age and false otherwise', () => {
        expect(filterByAge('19800930', 35, 45)).toBe(true)
        expect(filterByAge('20000101', 35, 45)).toBe(false)
    });
});