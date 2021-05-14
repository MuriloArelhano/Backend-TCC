const User = require('../models/User');

class UserController {
  async approveUser(request, response) {
    const { email } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(400).json({
        error: 'Usuário não existe',
      });
    }

    try {
      const result = await User.update(
        { status: 'ATIVO' },
        { where: { id: user.id } },
      );

      if (result[0] !== 1) return response.json({ result });

      return response.json({ message: 'Usuário ativo' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async suspendUser(request, response) {
    const { email } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(400).json({
        error: 'Usuário não existe',
      });
    }

    try {
      const result = await User.update(
        { status: 'SUSPENSO' },
        { where: { id: user.id } },
      );

      if (result[0] !== 1) return response.json({ result });

      return response.json({ message: 'Usuário suspenso' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
