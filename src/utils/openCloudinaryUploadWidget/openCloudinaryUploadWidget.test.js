describe('openCloudinaryUploadWidget test suite', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns url if successful', async () => {
    const result = [{ secure_url: 'http://cloudinary/img/123.png' }];
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null, result);
      },
    };

    const openCloudinaryUploadWidget = require('./openCloudinaryUploadWidget')
      .default;
    const response = await openCloudinaryUploadWidget().then(res => res);
    expect(response).toEqual(result[0].secure_url);
  });

  it('returns error message if failure', async () => {
    const error = { message: 'Image not found' };
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(error, null);
      },
    };

    const openCloudinaryUploadWidget = require('./openCloudinaryUploadWidget')
      .default;

    const response = await openCloudinaryUploadWidget().catch(err => err);
    expect(response).toContain(error.message);
  });
});
