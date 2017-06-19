import { DEFAULT_PROFILE_PIC } from '../../constants/';

jest.mock('cloudinary', () => ({
  config: () => null,
  v2: {
    uploader: {
      destroy: (_, cb) => cb('Error', null),
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

  it('logs error message to console if unsuccessful', async () => {
    require('./deleteImageFromCloudinary').default(DEFAULT_PROFILE_PIC);
    expect(global.console.log).toHaveBeenCalledWith('Error');
  });
});
