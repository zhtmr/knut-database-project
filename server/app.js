
//todo Express Engine Using 
const express = require('express');
const app = express();
const cors = require('cors');

//todo POST 방식 body-Parser 
const bodyParser = require('body-parser');
//todo PORT 3002
const PORT = 3002;
//todo mongoose 
const db = require('./dbs/db');
//todo Rotuer Connection to module
const route_signin = require('./routes/route_signin');
const route_signup = require('./routes/route_signup');
const route_mail = require('./routes/route_mail');
const route_mail_auth = require('./routes/route_mail_auth');
const route_board_list = require('./routes/route_board_list');
const route_board_read = require('./routes/route_board_read');
const route_board_delete = require('./routes/route_board_delete');
const route_board_edit = require('./routes/route_board_edit');
const route_board = require('./routes/route_board');
const route_all_list = require('./routes/route_board_all_list');
const route_open_api = require('./routes/route_open_api')
const route_img_upload = require('./routes/route_img_upload')

//todo database 연결 및 설정
db.db_connect;


//todo cors 처리
app.use(cors({
    origin: 'http://localhost:3002',
    credentials: true

}))

//todo bodyparser(인코딩 설정, JSON 설정)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//todo route signup, signin router connect to and then using exporess moduel 
app.use('/user',route_board);
app.use('/user',route_board_list);
app.use('/user',route_board_read);
app.use('/user',route_board_delete);
app.use('/user',route_board_edit);
app.use('/user',route_mail);
app.use('/user',route_signin);
app.use('/user',route_signup);;
app.use('/user',route_mail_auth);
app.use('/user',route_all_list);
// app.use('/uploades',express.static('uploades'));

// app.use('/user',route_img_upload);
// app.use('/user',route_open_api);
app.post('/', (req,res) =>{
    console.log(req.query.hello);
    console.log(req.params.name)
    // console.log(req.json());
    // json.parse() => string to json
    // json.stringfy = json to string
    console.log(req.body.data);
    res.json({
        "SERVER" : "Node.JS JWT SERVER TEST"
    })
})
app.get('/test',(req,res) =>{
    res.json({
        "SERVER" : "Node.JS JWT SERVER TEST"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})







console.log(__dirname);
console.log(__filename);