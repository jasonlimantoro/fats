const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryDirPath: path.resolve(__dirname, '../', 'src/'),
  moduleDirPath: path.resolve(__dirname, '../', 'src/modules/'),
  entryPath: path.resolve(__dirname, '../', 'src/index.jsx'),
  templatePath: path.resolve(__dirname, '../', 'src/templates/public.html'),
  styleSheetPath: path.resolve(__dirname, '../', 'stylesheets/app.scss'),
  imagesFolder: 'images',
  audioFolder: 'audios',
  imagesAliasFolder: path.resolve(__dirname, '../', 'assets/images'),
  audioAliasFolder: path.resolve(__dirname, '../', 'assets/audios'),
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
