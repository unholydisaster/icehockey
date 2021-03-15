const express=require("express");
const mongoose=require("mongoose");
const winston=require('winston')
const app=express();
require('dotenv').config();
const cors=require('cors');
const sportsRoute=require('./routes/sports.js')

const PORT =process.env.PORT|| 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//create a logger
const logger=winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({filename:'error.log',level:'error'})
    ],
    exceptionalHandlers:[
        new winston.transports.File({filename:'path/to/exceptional.log'})
    ]
})

//routes
app.use('/api/sports',sportsRoute);



//connect to mongo db
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser:true}
)
.then(()=>{
    logger.info("connected to mongoDb atlas")
}).catch(error =>{
    logger.error(error.message)
})

//start server
app.listen(PORT,()=>{
    logger.warn(`server started at PORT ${PORT}`)
});