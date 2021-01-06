const { filterByDistance, getAge } = require('../db/utils/data-manipulation')

describe('distance filter', () => {
    test('should return true if geolocations within specified distance', () => {
        const lat1 = 53.32055555555556, long1 = -1.7297222222222221
        const lat2 = 53.31861111111111, long2 = -1.6997222222222223
        expect(filterByDistance(lat1, long1, lat2, long2, 1)).toBe(false)
        expect(filterByDistance(lat1, long1, lat2, long2, 10)).toBe(true)
    });
});

describe('GetAge returns age for a date provided as YYYYMMDD string', () => {
    test('should return correct age for a given date', () => {
        expect(getAge('19800930')).toBe(40)
        expect(getAge('20000101')).toBe(21)
    });
});