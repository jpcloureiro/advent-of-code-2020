var fs = require('fs');

// Returns an array where each element represents
// a line of the given file name
module.exports = function getInputFileContent(fileName, dir, callback) {
  if (!fileName)
    return null;

  return fs.readFile(dir + '/' + fileName, function(err, data) {
    if (err)
      throw err;

    const fileContent = data.toString().split(/\r?\n/);
    fileContent.splice(-1, 1);

    callback(fileContent);
  });
}

