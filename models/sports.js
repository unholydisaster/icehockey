const mongoose =require('mongoose');
const { string,number } = require('yup');
const yup=require('yup');



//sports schema
const SportSchema=new mongoose.Schema({
    hometeam:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    awayteam:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    league:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50

    },
    pick:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    H:{
        type:Number,
        required:true,
        minlength:1,
        maxlength:50
    }
    ,
    D:{
        type:Number,
        required:true,
        minlength:1,
        maxlength:50
    },
    A:{
        type:Number,
        required:true,
        minlength:1,
        maxlength:50
    }
});

   const validateSport=sport=>{
          const schema=yup.object().shape({
            hometeam:yup.string().required().min(2).max(50),
            awayteam:yup.string().required().min(2).max(50),
            league:yup.string().required().min(2).max(50),
            pick:yup.string().required().min(2).max(50),
            H:yup.number().required().min(1).max(50),
            D:yup.number().required().min(1).max(50),
            A:yup.number().required().min(1).max(50)
          });
          return schema
          .validate(sport)
          .then(sport=>sport)
          .catch(error=>{
              return{
                  message:error.message
              }
          });
   };
exports.Sport=new mongoose.model('Sport',SportSchema);
exports.validateSport=validateSport;