/**
  Extracts error message from response payload or displays friendly response
  if the one returned is cryptic.

  Args:
    response -- the response from API calls

  Returns: an array of error messages
**/
export default function handleErrors(response) {
  let errors;
  try {
    if (response.message === 'Network Error') {
      errors = [
        'Something seems to be wrong with the network. Please try again',
      ];
    } else if (Array.isArray(response.response.data)) {
      errors = response.response.data;
    } else if (response.response.data instanceof Object) {
      errors = Object.keys(response.response.data).map((field) => {
        const displayFieldName = field.replace(/_/g, ' ');
        return `${displayFieldName}: ${response.response.data[field][0]}`;
      });
    }
  } catch (e) {
    errors = ['There was an error!'];
  }
  return errors;
}
