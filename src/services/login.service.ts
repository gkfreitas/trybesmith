// src/services/login.service.ts

import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtUtil from '../utils/jwt.utils';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    const message = '"username" and "password" are required'; 
    return { status: 'INVALID_DATA', data: { message } };
  }

  const foundUser = await UserModel.findOne({ where: { username: login.username } });
  
  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    const message = 'Username or password invalid';
    return { status: 'UNAUTHORIZED', data: { message } };
  }

  const { id, username } = foundUser.dataValues;
  console.log(foundUser);
  const token = jwtUtil.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}
export default {
  verifyLogin,
};