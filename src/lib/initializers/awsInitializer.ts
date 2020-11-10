import AWS from 'aws-sdk';

export const initializeAws  = (config = {}) => {
  AWS.config.update(config);
};
