const Form = require('../models/Form');
const User = require('../models/User');
const Stage = require('../models/Stage');

class FormController {
  async create(request, response) {
    try {
      const { userId, stageId, focusArea } = request.body;
      // verificando se o usuário existe
      const userExists = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return response.status(404).json({
          error: 'Esse usuário não existe',
        });
      }

      // verificando se o estágio existe
      const stageExists = await Stage.findOne({
        where: {
          id: stageId,
        },
      });

      if (!stageExists) {
        return response.status(404).json({
          error: 'Esse estágio não existe',
        });
      }

      // verificando se o formulário já foi respondido
      const form = await Form.findOne({
        where: {
          user_id: userId,
          stage_id: stageId,
          focus_area: focusArea,
        },
      });

      if (form) {
        const { answers } = form.dataValues;
        const newAnswers = [...answers, request.body.answers];

        await Form.update(
          { answers: newAnswers },
          {
            where: {
              user_id: userId,
              stage_id: stageId,
              focus_area: focusArea,
            },
          },
        );

        return response.json({
          message: 'Nova resposta foi adicionada ao formulário',
        });
      }

      const body = {
        userId,
        stageId,
        focus_area: focusArea,
        answers: [request.body.answers],
      };

      await Form.create(body);

      return response.json({
        message: 'Formulário adicionado com sucesso',
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
      });
    }
  }
}

module.exports = new FormController();
