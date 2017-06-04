const openCloudinaryUploadWidget = jest.genMockFromModule(
  '../openCloudinaryUploadWidget/openCloudinaryUploadWidget');


function openCloudinaryUploadWidget() {
  return new Promise((resolve, reject) => {
    resolve('sucess');
  });
}

openCloudinaryUploadWidget.
