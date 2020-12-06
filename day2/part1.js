var getInputFileContent = require('../util/readInputFile.js');

function verifyCompliance(password, policy) {
  const { minOccur, maxOccur, charToVerify } = policy

  var count = 0
  const arrPwd = [...password];
  arrPwd.forEach(character => {
    if (character === charToVerify)
      count++;
  });
  return count >= minOccur && count <= maxOccur;
}

function getPasswordPolicy(entry) {
  // entry example: 1-3 a: abcde
  // split gets 3 elements.
  // first one is min-max occurences
  // second is the char to occur
  // thrid is the password
  const comps = entry.split(' ');

  const occurences = comps[0].split('-');
  const minOccur = occurences[0];
  const maxOccur = occurences[1];

  const charToVerify = comps[1].replace(':', ''); 

  const password = comps[2];

  return [
    {
      minOccur,
      maxOccur,
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

