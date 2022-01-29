import { notification } from 'antd';

const settings = (message) => ({
  message: message.toString(),
  duration: 2,
  placement: 'bottomRight'
});

export const notifications = {
  error(message) {
    return notification.error(settings(message));
  },
  success(message) {
    return notification.success(settings(message));
  }
};
