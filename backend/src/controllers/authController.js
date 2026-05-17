import * as authService from "../services/authService.js";

export const register = async ( req, res, next ) => {
  try {
    const { username, password } = req.body;
    const user = await authService.registerUser( username,password );
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async ( req, res, next) => {
  try {
    const { username, password } = req.body;
    const data =
      await authService.loginUser(
        username,
        password
      );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};