toast = function (response) {
  if (response && response.status && response.message) {
    var timeout = 2000 + (response.message.length * 50);
    if (response.status === 'success') {
      Materialize.toast(response.message, timeout, 'green darken-2');
      return response.data;
    } else {
      if (response.status === 'failed')
        Materialize.toast(response.message, timeout, 'orange darken-4');
      if (response.status === 'error')
        Materialize.toast(response.message, timeout, 'red accent-3');
      if (response.status === 'info')
        Materialize.toast(response.message, timeout, 'blue darken-1');
      return false;
    }
  } else if (response.data)
    return response.data;
  else
    return response;
}