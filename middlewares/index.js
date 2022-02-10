
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const compression= require('compression')

module.exports=app=>{
    //.........build in middleware.........

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded( {extends:true} ))
app.use(compression());
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}
}