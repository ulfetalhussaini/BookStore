const jwt = require('jsonwebtoken');

function Auth(req, res, next) {
  //  check if there is a token
  const token = req.headers.token

  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken
        let payload = jwt.verify(token, 'key');
        let originalUrl = req.originalUrl;
        let id = originalUrl.slice(15);
        if (payload.id == id) {
          next()
        }

      } catch (err) {
        res.status(400).send(err);
        console.log(err)
      }

    }

  } else {
    res.send('you need to login');
  }
}


module.exports = Auth;