const express      = require('express');
const app          = express();
const db           = require('./db/connection');
const bodyParser   = require('body-parser');
const Job = require('./models/job');

const PORT = 3000;

app.listen(PORT,function(){
    console.log(`o Express estar rodando na porta ${PORT}`); 
});

// bodyparser
app.use(bodyParser.urlencoded({extended:false})); 

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
    res.send("esta sendo enviado");
});

//jobs routes 
app.use('/jobs',require('./routes/jobs'));





