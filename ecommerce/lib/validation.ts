// A simple regex for email validation. Not exhaustive, but good for demonstration.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates if a string is in a correct email format.
 * @param email The email string to validate.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export function isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return EMAIL_REGEX.test(email);
}
