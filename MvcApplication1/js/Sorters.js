function sortBy_name(a, b) {
    return a.name.localeCompare(b.name);
}

function sortBy_lastName(a, b) {
    return a.last_name.localeCompare(b.last_name);
}

function sortBy_id (a, b) {
    return a.id - b.id;
}