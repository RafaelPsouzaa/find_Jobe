const express      = require('express');
const exphbs       = require('express-handlebars');
const app          = express();
const path         = require('path');
const db           = require('./db/connection');
const bodyParser   = require('body-parser');
const Job          = require('./models/job');
const Sequelize    = require('sequelize');
const Op           = Sequelize.Op;

const PORT = 3000;

app.listen(PORT,function(){
    console.log(`o Express estar rodando na porta ${PORT}`); 
});

// bodyparser
app.use(bodyParser.urlencoded({extended:false})); 

// handlebar
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs.engine({defaultLayout: 'main'}));
app.set('view engine','handlebars');

// static folder
app.use(express.static(path.join(__dirname,'public')));

//db connection
db
.authenticate()
.then(()=>{
    console.log("conectou ao banco com sucesso");

})
.catch(err => { 
    console.log("erro ao conectar no banco de dados",err);

});
// routes
app.get('/',(req,res) => {

    let search = req.query.job;
    let query  = '%'+search+'%';//procura as palavras ante ou depois do que digitou 


    if(!search){
        Job.findAll({order:[
            ['createdAt','DESC']
        ]})
        .then(jobs =>{
            res.render('index',{
                jobs
            });
    
        })
        .catch(err=>console.log(err));

    }else{
        Job.findAll({
            
            where:{title:{[Op.like]:query}},
            order:[
            ['createdAt','DESC']
        ]})
        .then(jobs =>{
            res.render('index',{
                jobs,search
            });
    
        })
        .catch(err=>console.log(err));;
    }

});

//jobs routes 
app.use('/jobs',require('./routes/jobs'));





