import { isValidEmail } from '../../lib/validation';

describe('Email Validation Utility', () => {
    // Happy Path using test.each for multiple valid cases
    test.each([
        ['test@example.com'],
        ['firstname.lastname@example.co.uk'],
        ['user123@sub.domain.org'],
    ])('should return true for a valid email: %s', (email) => {
        expect(isValidEmail(email)).toBe(true);
    });

    // Edge Cases using test.each for multiple invalid cases
    test.each([
        ['testexample.com', 'missing @ symbol'],
        ['test@', 'missing domain'],
        ['test@example', 'missing top-level domain'],
        ['@example.com', 'missing local part'],
        ['', 'empty string'],
        [null, 'null value'],
        [undefined, 'undefined value'],
    ])('should return false for an invalid email: %s (%s)', (email, description) => {
        expect(isValidEmail(email as any)).toBe(false);
    });
});
