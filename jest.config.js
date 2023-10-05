 
 module.exports={
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
      setupFiles: ['dotenv/config'],

// globals: {
//     'import.meta.env': envConfig,
//   },
}