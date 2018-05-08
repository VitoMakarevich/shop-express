const {passwordUtils} = require('helpers');
const {User: UserModel, Session: SessionModel} = require('models');
const {CustomError} = require('errors');
const {strings} = require('assets');

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

const checkSignIn = async ({name, password}) => {
  const user = await UserModel
    .findOne({
      where: {
        name: name,
      },
    });

  if (!user) {
throw new CustomError(strings.incorrectLoginOrPassword);
}

  const hashedPassword = await passwordUtils.hashPassword(
    password,
    user.salt,
  );

  // maybe replace with timing safe equal
  if (hashedPassword === user.password) {
    const session = {
      profileId: user.id,
    };
    const sessionId = await SessionModel.create(session);

    const userWithPublicFields = {
      id: user.id,
      name: user.name,
    };

    return {
      sessionId,
      user: userWithPublicFields,
    };
  } else {
    throw new CustomError(strings.incorrectLoginOrPassword);
  }
};

module.exports = {
  create,
  checkSignIn,
};
