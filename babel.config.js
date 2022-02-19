module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        // root: ['./src/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": ["./src/components"],
          "@model": ["./src/model"],
          "@screens": ["./src/screens"],
          "@assets": ["./src/assets"]
        }
      },
    ],
  ]
};
