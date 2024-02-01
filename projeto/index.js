const express      = require('express');
const exphbs       = require('express-handlebars');
const app          = express();
const path         = require('path');
const db           = require('./db/connection');
const bodyParser   = require('body-parser');
const Job          = require('./models/job');

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
    res.render('index');
});

//jobs routes 
app.use('/jobs',require('./routes/jobs'));





