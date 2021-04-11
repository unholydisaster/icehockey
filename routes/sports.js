const express=require('express');
const router=express.Router();
const {Sport,validateSport}=require('../models/sports')

//post:create a new sport
router.post('/', async(req,res)=>{   
    const error=await validateSport(req.body);
    if(error.message)res.status(400).send(error.message)

    sport = new Sport({
        hometeam:req.body.hometeam,
        awayteam:req.body.awayteam,
        league:req.body.league,
        pick:req.body.pick,
        H:req.body.H,
        D:req.body.H,
        A:req.body.H
    });
    sport.save().then((sport)=>{
        res.send(sport);
    }).catch((error) =>{
        res.status(500).send("Sport was not stored");
    });
});
//GEt all sports
router.get("/",(req,res)=>{
    Sport.find().then(sport =>res.send(sport))
    .catch((error)=>{
        res.send(500).send("something went wrong")
    })
})
//Get all sport by id
router.get("/:sportId",async(req,res)=>{
    const sport= await Sport.findById(req.params.sportId)
    if(!sport)res.status(404).send("sport not found")
    res.send(sport);
})

//UPDATE sport BASED On ID
router.put("/:sportId",async(req,res)=>{
    const updatedSport=await Sport.findByIdAndUpdate(req.params.sportId,{
        hometeam:req.body.hometeam,
        awayteam:req.body.awayteam,
        league:req.body.league,
        pick:req.body.pick,
        H:req.body.H,
        D:req.body.H,
        A:req.body.H
    },
    {new:true}
    );
    if(!updatedSport)res.status(404).send("sport not found")
    res.send(updatedSport)
    
})
//delete Sport based on id
router.delete('/:sportId',async (req,res)=>{
    const sport=await Sport.findByIdAndRemove(req.params.sportId);
    if(!sport)res.status(404).send('sport with id not found')
    res.send(sport);
});
 
module.exports=router;  