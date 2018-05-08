const {passwordUtils} = require('helpers');
const {User: UserModel, Session} = require('models');

const create = async ({name, password}) => {
  const salt = await passwordUtils.generateSalt();
  const hashedPassword = await passwordUtils.hashPassword(
    password,
    salt
  );

  const user = {
    name,
    password: hashedPassword,
    salt,
  };
  const createdUser = await UserModel
    .create(
      user,
    );


  const userWithNameAndId = {
    id: createdUser.id,
    name: createdUser.name,
  };

  return userWithNameAndId;
};

module.exports = {
  create,
};
