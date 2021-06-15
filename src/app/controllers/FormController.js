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

  async listAll(request, response) {
    const formAnswers = await Form.findAll({
      order: [['updated_at', 'ASC']],
    });

    if (!formAnswers) {
      return response.status(400).json({
        error: 'Erro ao buscar respostas do formulário',
      });
    }

    const formattedFormAnswers = await Promise.all(
      formAnswers.map(async (formAnswer) => {
        const foundUser = await User.findOne({
          where: {
            id: formAnswer.userId,
          },
        });

        delete formAnswer.dataValues.userId;
        const { stageId } = formAnswer.dataValues;
        delete formAnswer.dataValues.stageId;

        return {
          ...formAnswer.dataValues,
          focus_area: FormController.getFocusAreaOfKey(
            formAnswer.dataValues.focus_area,
          ),
          stageName: FormController.getStageOfKey(stageId),
          userEmail: foundUser.dataValues.email,
          answersAmount: formAnswer.dataValues.answers.length,
        };
      }),
    );

    return response.status(200).json(formattedFormAnswers);
  }

  static getFocusAreaOfKey(key) {
    const focusAreas = {
      plataforma_e_produtos: 'Plataforma e Produtos',
      fluxo_de_avanco_do_desenvolvedor: 'Fluxo de Avanço do Desenvolvedor',
      devrel_evangelismo_e_advocacia: 'Devrel (evangelismo e advocacia)',
      monitoramento: 'Monitoramento',
    };

    return focusAreas[key] || key;
  }

  static getStageOfKey(key) {
    const stages = {
      A: 'Ativação',
      EN: 'Entrada',
      REC: 'Reconhecimento',
      REF: 'Referência',
      RET: 'Retenção',
      SE: 'Sensibilização',
    };

    return stages[key] || key;
  }

  async getAnswersAmount(request, response) {
    try {
      const { userId, stageId, focusArea } = request.query;

      const form = await Form.findOne({
        where: {
          user_id: userId,
          stage_id: stageId,
          focus_area: focusArea,
        },
      });

      if (!form) {
        return response.status(200).json({
          answersAmount: 0,
        });
      }

      const answersAmount = form.dataValues.answers.length;

      return response.status(200).json({
        answersAmount,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
      });
    }
  }
}

module.exports = new FormController();
