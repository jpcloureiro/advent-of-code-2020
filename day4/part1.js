var getInputFileContent = require('../util/readInputFile.js');

function resetDocValidator() {
  return {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
    cid: false,
  };
}

function validateDoc(docData) {
  const mandatoryFields = {
    byr: true,
    iyr: true,
    eyr: true,
    hgt: true,
    hcl: true,
    ecl: true,
    pid: true,
  };

  return Object.keys(mandatoryFields).reduce((isValid, field) => {
    if (!isValid)
      return false;

    const hasField = Boolean(docData[field]);

    if (hasField)
      return true;

    return false;
  }, true)
}

function getAvailableFields(currentFields,line) {
  const pairs = line.split(' ');

  return pairs.reduce((acc, pair) => {
    const field = pair.split(':')[0];

    return {
      ...acc,
      [field]: true,
    };

  }, currentFields);
}

function solution(input) {
  let docData = resetDocValidator();

  const validDocsCount =  input.reduce((acc, line) => {
    const isLineEmpty = Boolean(!line);

    if (isLineEmpty) {
      const isDocValid = validateDoc(docData);

      docData = resetDocValidator();

      if (isDocValid)
        return acc + 1;

      return acc;
    }

    docData = getAvailableFields(docData, line);
    return acc;
  }, 0);

  // Last doc might be valid. It wasn't checked inside
  // reduce above because there's no new line after it.
  // Check it now.
  
  const isDocValid = validateDoc(docData);
  if (isDocValid)
    return validDocsCount + 1;

  return validDocsCount;
}

function main() {
  const fileName = process.argv[2];
  if (!fileName)
    return null;

  getInputFileContent(fileName, __dirname, function(fileContent) {
    const result = solution(fileContent);
    console.log(result);
  });
}

main()

