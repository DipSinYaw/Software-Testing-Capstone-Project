/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // This line helps Jest resolve module aliases like `@/`
    // that you use in your Next.js application code.
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    // The mongodb driver is ESM-only, so we need to tell Jest to transform it.
    // This pattern tells Jest to transform files in node_modules that are in the mongodb or bson folders.
    '/node_modules/(?!(mongodb|bson)/)',
  ],
};
