/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
      "^.+.tsx?$": ["ts-jest",{}],
    },
    reporters: [
      'default', 
      ['jest-junit', {outputDirectory: 'reports', outputName: 'jest-junit.xml'}]
    ],
  };