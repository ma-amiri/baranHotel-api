// controllers/authController.js

import User  from '../models/User';
import { createError }  from '../utils/error';
import { AuthenticationClient }  from 'auth0';

const auth0 = new AuthenticationClient({
  domain: 'dev-uyx8wzfu4xt6hily.us.auth0.com',
  clientId: '63CULnaHLVZzkbxfAHIqEhtkhmHiEKnU',
  clientSecret: 'CS1HeNTUzh-W9roM1HX-Ymty0bkeTIOQXJ2JaJTZGvaLbjdMpi6viwYU1OJ2KW9j',
});

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const newUser = {
      username,
      password,
    };

    await User.create(newUser);
    res.status(200).send('User has been created.');
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return next(createError(404, 'User not found!'));

    // Authenticate user using Auth0
    const authResult = await auth0.passwordGrant({
      username,
      password,
      audience: 'your-auth0-audience',
      scope: 'openid',
    });

    const { access_token: token, id_token: idToken } = authResult;

    const { password: _, isAdmin, ...otherDetails } = user.toJSON();
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
