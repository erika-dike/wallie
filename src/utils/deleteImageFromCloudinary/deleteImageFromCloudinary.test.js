import { DEFAULT_PROFILE_PIC } from '../../constants/';

jest.mock('cloudinary', () => ({
  config: () => null,
  v2: {
    uploader: {
      destroy: (_, cb) => cb(null, 'Success'),
    },
  },
}));

global.console = {
  log: jest.fn(),
};

describe('deleteImageFromCloudinary test suite', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('logs success message to console if successful', () => {
    require('./deleteImageFromCloudinary').default(DEFAULT_PROFILE_PIC);
    expect(global.console.log).toHaveBeenCalledWith('Success');
  });
});
