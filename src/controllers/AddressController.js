const User = require('../models/User');
const Adress = require('../models/Address');

module.exports = {
    async index(req,res){
        const { user_id} = req.params;
        const user = await User.findByPk(user_id,{
            include:{ association: 'addresses'}
        });
        if(!user){
            return res.status(400).json({ error: 'User not found'});
        }

        return res.json(user)
    },

    async store(req, res){
        const { user_id} = req.params;
        const { zipcode, street, number} = req.body;

        const user = await User.findByPk(user_id);
        if(!user){
            return res.status(400).json({ error: 'User not found'});
        }

        const adress = await Adress.create({
            zipcode,
            street,
            number,
            user_id,
        });

        return res.json(adress);
    }

}