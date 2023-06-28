import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const invalidBody = {
  username: 'biel',
}

const invalidUser = {
  username: 'gkfreitas',
  password: 'bielzinho'
}

const validUser = {
  username: 'biel',
  password: 'biel',
}

const existingUser = { 
  id: 1, 
  username: 'biel',
  vocation: 'programar',
  level: 10,
  password: bcrypt.hashSync('biel', SALT_ROUNDS)
};

export default {
  existingUser,
  invalidBody,
  invalidUser,
  validUser
}