const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const User = require('../models/User');
// config
const authConfig = require('../../config/auth');

class UserController {
  async create(request, response) {
    const userExists = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (userExists) {
      return response.status(400).json({
        error: 'Já existe cadastro para esse e-mail',
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

  async auth(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(400).json({
        error: 'E-mail ou senha incorretos',
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return response.status(400).json({
        error: 'E-mail ou senha incorretos',
      });
    }

    if (user.status === 'PENDENTE') {
      return response.status(400).json({
        error: 'Seu perfil ainda não foi liberado',
      });
    }

    if (user.status === 'REMOVIDO') {
      return response.status(400).json({
        error: 'Seu perfil foi removido. Contacte o administrador',
      });
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: `${user.id}`,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birth_date,
      status: user.status,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return response.json({ user: formattedUser, token });
  }
}

module.exports = new UserController();
