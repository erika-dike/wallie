import handleErrors from './errorHandler';


describe('handleErrors test suite', () => {
  it('returns right message for network errors', () => {
    const response = { message: 'Network Error' };
    const result = handleErrors(response);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toContain(
      'Something seems to be wrong with the network. Please try again',
    );
  });

  it('returns right message when response data is array', () => {
    const response = {
      message: undefined,
      response: {
        data: ['username is already taken', 'password: does not match'],
      },
    };
    const result = handleErrors(response);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual(response.response.data);
  });

  it('returns right message when response data is an object (not array)',
  () => {
    const response = {
      response: {
        data: {
          username: ['does not meet minimum length requirements'],
          password: ['does not match'],
        },
      },
    };
    const result = handleErrors(response);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toContain(`username: ${response.response.data.username[0]}`);
    expect(result).toContain(`password: ${response.response.data.password[0]}`);
  });

  it('returns a default message for messages that cannot be decoded', () => {
    const response = {
      unknown: 'Unknown error type',
    };
    const result = handleErrors(response);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual(['There was an error!']);
  });
});
