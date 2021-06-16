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

    if (user.status === 'REMOVIDO' || user.status === 'SUSPENSO') {
      return response.status(400).json({
        error:
          'Seu perfil está suspenso ou foi removido. Contacte o administrador',
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

  async listAll(request, response) {
    let users = [];

    if (request.query.onlyAdmin) {
      users = await User.findAll({
        where: {
          role: 'ADMIN',
        },
        order: [['created_at', 'ASC']],
      });
    } else if (request.query.onlyBase) {
      users = await User.findAll({
        where: {
          role: 'BASE',
        },
        order: [['created_at', 'ASC']],
      });
    } else {
      users = await User.findAll({
        order: [['created_at', 'ASC']],
      });
    }

    if (!users) {
      return response.status(400).json({
        error: 'Erro ao buscar usuários',
      });
    }

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birth_date,
      status: user.status,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));

    return response.status(200).json(formattedUsers);
  }

  async update(request, response) {
    try {
      const { name, email, birthDate } = request.body;
      const { id } = request.params;

      const userExists = await User.findOne({
        where: {
          id,
        },
      });

      if (!userExists) {
        return response.status(404).json({
          error: 'Esse usuário não existe',
        });
      }

      const body = {};

      if (email) {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (user && user.dataValues.id !== id) {
          return response.status(404).json({
            error: 'O email informado pertence a outro usuário',
          });
        }

        body.email = email;
      }

      if (name) body.name = name;

      if (birthDate) body.birth_date = birthDate;

      const result = await User.update(body, { where: { id } });

      if (result) {
        return response.status(200).json({
          message: 'Informações atualizadas com sucesso',
        });
      }
      return response.status(500).json({
        message: 'Erro ao atualizar usuário',
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
      });
    }
  }
}

module.exports = new UserController();
