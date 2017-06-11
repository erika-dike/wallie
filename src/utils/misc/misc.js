import moment from 'moment';

export const getFullTime = time => (moment(time)
  .format('h:mm a - D MMM YYYY'));

export const shakeButton = (buttonId) => {
  const elem = document.getElementById(buttonId);
  elem.classList.add('element-shake');
  setTimeout(() => elem.classList.remove('element-shake'), 500);
};
