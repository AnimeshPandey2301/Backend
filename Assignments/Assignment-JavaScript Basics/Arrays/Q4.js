const arr = [7, 3, 9, 0];

const min = arr.reduce((a, b) => {
    if (a < b) {
        return a;
    } else {
        return b;
    }
});

console.log(min);