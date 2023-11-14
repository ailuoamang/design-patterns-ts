"use strict";
function isAdult(user) {
    return user.age >= 18;
}
const justine = {
    name: 'Justine',
    age: 22,
};
const isJustineAnAdult = isAdult(justine);
