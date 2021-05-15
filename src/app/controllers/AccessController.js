const User = require('../models/User');

class AccessController {
  async manage(request, response) {
    /**
     * verificando se o usuário que está fazendo a requisição é um administrador
     */
    const admin = await User.findOne({
      where: {
        id: request.userID,
        role: 'ADMIN',
      },
    });

    if (!admin) {
      return response.status(400).json({
        error: 'Você não é um administrador',
      });
    }

    /**
     * verificando se o email passado é de usuário que existe
     */
    const user = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (!user) {
      return response.status(400).json({
        error: 'Usuário não existe',
      });
    }

    /**
     * verificando se o administrador está tentando alterar a própria conta
     */
    if (admin.id === user.id) {
      return response.status(400).json({
        error: 'Você não pode alterar o seu própria conta por aqui',
      });
    }

    try {
      const status = AccessController.handleStatus(request.params.manage);

      if (!status) {
        return response.status(400).json({
          error: 'Rota inválida',
        });
      }

      const result = await User.update(
        { status: status.value },
        { where: { id: user.id } },
      );

      if (result[0] !== 1) return response.json({ result });

      return response.json({ message: status.message });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  static handleStatus(param) {
    const status = {
      approve: {
        value: 'ATIVO',
        message: 'Usuário ativo',
      },
      suspend: {
        value: 'SUSPENSO',
        message: 'Usuário suspenso',
      },
      removed: {
        value: 'REMOVIDO',
        message: 'Usuário removido',
      },
    };

    if (!(param in status)) return null;

    return status[param];
  }
}

module.exports = new AccessController();
