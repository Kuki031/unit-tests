const { validateName, validateEmail, validatePassword } = require('../backend/app');

test('validateName should return true for valid names', () => {
    expect(validateName('Ivan')).toBe(true);
    expect(validateName('Ana-Marija')).toBe(true);
});

test('validateName should return false for invalid names', () => {
    expect(validateName('Jo')).toBe(false);
    expect(validateName('')).toBe(false);
    expect(validateName('A'.repeat(51))).toBe(false);
});

//TODO - add logic for testing validateEmail and validatePassword
test('validateEmail should return true for valid emails', () => {
    expect(validateEmail("test@test.com")).toBe(true);
});

test('validateEmail should return false for invalid emails', () => {
    expect(validateEmail("testtestcom")).toBe(false);
});

test('validatePassword should return true for valid passwords', () => {
    expect(validatePassword("Lozinka1!")).toBe(true);
})


test('validatePassword should return false for length < 8', () => {
    expect(validatePassword("Loz!")).toBe(false);
})

test('validatePassword should return false for one special character', () => {
    expect(validatePassword("Lozinka1")).toBe(false);
})

test('validatePassword should return false for one uppercaes character', () => {
    expect(validatePassword("lozinka1")).toBe(false);
})