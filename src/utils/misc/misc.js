import moment from 'moment';

export const getFullTime = time => (moment(time).format('h:mm a - D MMM YYYY'));
