const {Session: SessionModel} = require('models');

const checkAuth = async (id) => {
  try {
    const session = await SessionModel.findById(id);
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  checkAuth,
};
