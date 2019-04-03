const getHostRequest = () => {
  return {
    type: 'LOAD',
    payload: {
      request: {
        url: '/hosts',
        onSuccess: res => {
          var buffer = new Buffer(response.data, 'binary');
          var textdata = buffer.toString(); // for string
          console.log(textdata);
        }
      }
    }
  };
};

export function getHost() {
  return (dispatch, getState) => {
    return dispatch(getHostRequest());
  };
}
