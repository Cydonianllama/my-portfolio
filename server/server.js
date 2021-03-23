const express = require('express');
const app = express();

const path = require('path')
const cors = require('cors')

// configuration
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.static(path.resolve('public')))
app.use('/project-resources', express.static(path.resolve('public/proyectos')))
app.use('/portfolio',express.static(path.resolve('public')))
app.use(cors())

// routes
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('public/index.html'))
})

app.get('/download/cv',(req,res)=>{
    const file = path.resolve('public/resources/CV Grandez.pdf')
    res.download(file)
})

app.get('/projects/:name',(req,res)=>{
    const name = req.params.name;
    if (!name) res.status(404).send({msg : 'lose param : name'})

    console.log(name);

    switch(name){
        case 'content-loading':
            res.sendFile(path.resolve('public/proyectos/project-intermediate-content-loading/index.html'))
            break
        case 'ui-cards':
            res.sendFile(path.resolve('public/proyectos/project-basic-ui-cards/index.html'))
            break
        case 'facebook-clone':
            res.sendFile(path.resolve('public/proyectos/project-basic-facebook-clone/index.html'))
            break
        case 'reddit-clone':
            res.sendFile(path.resolve('public/proyectos/project-basic-reddit-clone/index.html'))
            break
        case 'mini-social-network':
            res.sendFile(path.resolve('public/proyectos/project-intermediate-mini-social-network/index.html'))
            break
        case 'showcase-product':
            res.sendFile(path.resolve('public/proyectos/project-intermediate-showcase-product/index.html'))
            break
        case 'dashboard-one':
            res.sendFile(path.resolve('public/proyectos/project-itermediate-dashboard-1/index.html'))
            break
        case 'linkedin-clone':
            res.sendFile(path.resolve('public/proyectos/project-basic-linkedin-clone/index.html'))
            break
        case 'twitter-clone':
            res.sendFile(path.resolve('public/proyectos/project-basic-twitter-clone/index.html'))
            break

    }
})

app.listen(PORT,(err)=>{
    if (err) console.error(err);
})