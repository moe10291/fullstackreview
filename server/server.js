require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const massive = require('massive');

let {
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET,
    DEV
} = process.env;

// app.use(async function authBypass(req, res, next){
//     if (DEV=== 'true') {
//         let db=req.app.get('db')
//         let user= await db.session_user()
//         req.session.user=user[0];
//         next()
//     }
//     else{
//         next()
//     }
// })
const app = express();
app.use(express.static(__dirname + '/../build'))
app.use(express.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)

        app.listen(SERVER_PORT, () => {
            console.log(`Listening to Port ${SERVER_PORT}.`)
        })
    })

app.post('/auth/signup', async (req, res) => {
    let {
        email,
        password
    } = req.body;
    const db = req.app.get('db')
    // letting me use the db for massive functions
    let user = await db.find_user([email]);
    if (user[0]) {
        return res.status(200).send({
            loggedIn: false,
            message: 'Email already in use'
        })
    } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        let createdCustomer = await db.create_customer([email, hash]);
        req.session.user = {
            email: createdCustomer[0].email,
            id: createdCustomer[0].id
        }
        res.status(200).send({
            loggedIn: true,
            message: 'Login successful'
        })
    }
})


app.post('/auth/login', async(req, res)=> {
    let {email, password}= req.body;
    const db= req.app.get('db');
    let user= await db.find_user([email]);
    if(!user[0]){
        return res.status(200).send({loggedIn: false, message: 'Email not found.'})
    }
    let result= bcrypt.compareSync(password, user[0].hash_value)
    if(result){
        req.session.user= {email: user[0].email, id:user[0]}.id
        return res.status(200).send({loggedIn: true, message:'Login successful'})
}
    else{
        return res.status(401). send({loggedIn:false, message: 'Incorrect Password'})
    }
})

app.get('/api/user-data',(req, res)=> {
    if(req.session.user){
        res.status(200).send(req.session.user)
    }
    else {
        res.status(401).send('Please login to view.')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000')
})

// function authBypass(){

// }