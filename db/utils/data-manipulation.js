exports.formatUsers = (usersData) => {
    return usersData.map(user => {
        formattedUser = { ...user }
        formattedUser.minAge
    })
}

exports.filterByDistance = (lat1, lon1, lat2, lon2, maxDistance) => {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return (dist < maxDistance)
}

exports.filterByAge = (dateString, min_age, max_age) => {
    const today = new Date();
    const year = dateString.slice(0, 4)
    const month = dateString.slice(4, 6) - 1
    const day = dateString.slice(6)
    let age = today.getFullYear() - year;
    let m = today.getMonth() - month;
    if (m < 0 || (m === 0 && today.getDay() < day)) {
        age--;
    }
    return (age >= min_age) && (age <= max_age);
}