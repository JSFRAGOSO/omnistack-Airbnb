const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async store(req,res){
        const {filename} = req.file;
        const {company,price,techs} = req.body;
        const {user_id} = req.headers;
        
        const user = await User.findById(user_id);
        
        if(!user){
            return res.status(400).json({error:'User does not exists'});            
        }

        const spot = await Spot.create({
            user:user_id,
            thumbnail:filename,
            company,
            price,
            techs:techs.split(',').map(tech =>tech.trim())
        });

        return res.status(201).json(spot);
    },
    async index(req,res){
        const {tech} = req.query;
        const spots = await Spot.find({techs:tech});

        return res.json(spots);
    },
    async show(req,res){
        const {id_spot} = req.params;
        const spot = await Spot.findById(id_spot);

        return res.json(spot);
    },
    async update(req,res){
        const {id_spot} = req.params;
        const {company,price,techs} = req.body;

        const spot = await Spot.findById(id_spot);
        spot.company = company;
        spot.techs = techs.split(',').map(tech =>tech.trim());
        spot.price = price;
        await spot.save();

        return res.json(spot);
    }

}