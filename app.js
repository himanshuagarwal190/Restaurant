const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Menu = require('./utils/models')
require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.connect(process.env.mongodb, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

app.get('/', (req, res) =>{
    res.render('index')
})

app.post('/api/additem', (req, res) =>{
    let item = {name: req.body.name,
                price: Number(req.body.price)}
    Menu.create(item, (err, data)=>{
        if(err){    
            res.send(`Error adding item, error: ${err}`)
        }
        else{
            res.send('Added item successfully')
        }
    })
})

app.get('/api/viewitems', (req, res) =>{
    Menu.find({}, (err, data)=>{
        if(err){
            res.send('Error Fetching items')
        }
        else{
            res.send(data)
        }
    })
})

app.post('/api/updateitem', (req, res) =>{
    let item = req.body.name
    let price = Number(req.body.price)
    Menu.findOneAndUpdate(item, {price: price}, (err, data)=>{
        if(err){
            res.send('Error Updating')
        }
        else{
            res.send(data)
        }
    })
})

app.post('/api/deleteitem', (req, res) =>{
    let item = req.body.name
    Menu.findOneAndDelete({name: item}, (err, data)=>{
        if(err){
            res.send('Error Deleting')
        }
        else{
            res.send('Deleted Successfully')
        }
    })
})