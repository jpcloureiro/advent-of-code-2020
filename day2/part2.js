var getInputFileContent = require('../util/readInputFile.js');

function verifyCompliance(password, policy) {
  const { firstOccur, lastOccur, charToVerify } = policy

  const hasCharOnFirstOccur = password[firstOccur] === charToVerify;
  const hasCharOnLastOccur = password[lastOccur] === charToVerify;

  return hasCharOnFirstOccur && !hasCharOnLastOccur
    || !hasCharOnFirstOccur && hasCharOnLastOccur
}

function getPasswordPolicy(entry) {
  // entry example: 1-3 a: abcde
  // split gets 3 elements.
  // first one is first-last occurence
  // second is the char to occur
  // thrid is the password
  const comps = entry.split(' ');

  const occurences = comps[0].split('-');
  const firstOccur = occurences[0] - 1 ;
  const lastOccur = occurences[1] - 1;

  const charToVerify = comps[1].replace(':', ''); 

  const password = comps[2];

  return [
    {
      firstOccur,
      lastOccur,
      charToVerify,
    },
    password,
  ]
}

function solution(input) {
  const correctPasswords = input.filter(entry => {
    const [passwordPolicy, password] = getPasswordPolicy(entry);
    return verifyCompliance(password, passwordPolicy);
  });

  return correctPasswords.length;
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

