const User = require('../models/User');

class UserController {
  async create(request, response) {
    const userExists = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (userExists) {
      return response.status(400).json({
        error: `Já existe cadastro para esse e-mail`,
      });
    }

    const { id, name, email, birth_date, status, role } = await User.create(
      request.body,
    );

    return response.json({
      id,
      name,
      email,
      birth_date,
      status,
      role,
    });
  }
}

module.exports = new UserController();
