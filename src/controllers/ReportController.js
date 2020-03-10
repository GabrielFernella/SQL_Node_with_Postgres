const {Op} = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req,res){
        //Encontrar todos os usuários com o email que termina com gmail.com
        //destes todos que moram em rua Diogines
        //tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where:{
                email: {
                    [Op.iLike]:'%@gmail.com'
                }
            },
            include: [
                { association: 'addresses', where:{street: 'Rua Diogines'} }, //Endereços
                { association: 'techs',
                required: false, //torna não obrigatório o usuario atender esse where
                    where: {
                        name: {
                            [Op.iLike]:'React%'
                        }
                    }
                }, //tecnologias
            ]
        });

        return res.json(users);
    }
}