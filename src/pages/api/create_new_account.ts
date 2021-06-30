import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
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
  let reqsMet = new RegExp("^(?=.{10,50}$)");
  return reqsMet.test(username);
}

// check password against requirements
// const properPW = (password: string) {

// }

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  // build CreateNewAccountParameters
  const { username }: CreateNewAccountParameters = JSON.parse(req.body);
  const { password }: CreateNewAccountParameters = JSON.parse(req.body);

  // check to see if password is exposed
  const exposed = await pwExposure(password)

  // if password is exposed send response with pwExp error

  // check to see if username fits requirements
  const checkUN = properUN(username);
  // if not, send response with unReq error

  // check to see if password fits requirements
  // if not, send response with pwReq error

  res.status(200).json({ result: true });
}
