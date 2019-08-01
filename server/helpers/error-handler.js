module.exports = function(err, req, res, next) {
  /* istanbul ignore else if */
  /* istanbul ignore else */
  console.log(err)
  if (err.name == 'CastError'){
    err.code = 404
    console.log('lk#######lkl')
  }
  if (err.code === 400) {
    res.status(400).json({
      message: `Error 400: Bad Request`
    });
  } else if (err.code === 401) {
    res.status(401).json({
      message: `Error 401: Not Authorized`
    });
  } else if (err.code === 404) {
    console.log(err)
    res.status(404).json({
      message: `Error 404: Not Found`
    });
  } else if (err.name === "ValidationError" || err.name == "CastError") {
    let { message } = err;
    let arr = [
      "User validation failed: ",
      "Validation failed: ",
      "Model validation failed: ",
      "name: ",
      "email: ",
      "password: ",
      "phonenumber: "
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(message)) {
        message = message.replace(arr[i], "");
      }
    }
    res.status(400).json({ message });
  } else {
    res.status(500).json({
      message: `Error 500: Internal server error`
    });
  }
};
