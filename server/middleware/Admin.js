const jwt = require('jsonwebtoken');

function Admin(req, res, next) {
  //  check if there is a token
  const token = req.headers.token;

  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken

        let payload = jwt.verify(token, 'key');
       
        if (payload.role == 1) {
          next();
        }

      } catch (err) {
        res.status(400).send(err);
        console.log(err)
      }

    }

  } else {
    res.send('Sorry, you are not an Admin');
  }
}


module.exports = Admin;