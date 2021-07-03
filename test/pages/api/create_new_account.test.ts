import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true for properly formatted username and password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'danadanawalsh',
        password: '9!Hellohellohellohello'
      },
    });
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      'result': true,
    });
  });

  test('returns false with correct errors for improperly formatted username and password that has not been exposed', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'dana',
        password: 'dw'
      },
    });
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      'result': false,
      'errors': {
        'exposedPW': false,
        'validPW': false,
        'validUN': false,
      }
    });
  });

  test('returns false with correct errors for improperly formatted username and password that has been exposed', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'dana',
        password: 'weakpass'
      },
    });
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      'result': false,
      'errors': {
        'exposedPW': true,
        'validPW': false,
        'validUN': false,
      }
    });
  });
});