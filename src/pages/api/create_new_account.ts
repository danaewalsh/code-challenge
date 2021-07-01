import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: object;
}

// function to check and see if the password has been exposed
async function pwExposure(text: string) {
  const response = await fetch('http://localhost:3000/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({password: text}),
  });
  return await response.json();
}

// check username against requirements
const properUN = (username: string) => {
  let checkUN = new RegExp("^(?=.{10,50}$)");
  return checkUN.test(username);
}

// check password against requirements
const properPW = (password: string) => {
  let checkPW = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{20,50}$")
  return checkPW.test(password);
}

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  // build CreateNewAccountParameters
  const { username }: CreateNewAccountParameters = JSON.parse(req.body);
  const { password }: CreateNewAccountParameters = JSON.parse(req.body);

  await pwExposure(password)
    .then(response => {
      let allErrors = {
        exposedPW: response.result,
        validUN: properUN(username),
        validPW: properPW(password),
      };

      if (allErrors.exposedPW === false && allErrors.validUN === true && allErrors.validPW === true) {
        res.status(200).send({result: true})
      } else {
        res.status(200).send({result: false, errors: allErrors})
      }
    })
    .catch(response => {
      res.status(500);
    })
}
