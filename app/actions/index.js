export const getHost = () => {
  return {
    type: 'LOAD',
    payload: {
      request: {
        url: '/hosts',
        onSuccess: res => {
          console.log(res);
        }
      }
    }
  };
};
