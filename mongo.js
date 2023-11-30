const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())


const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String,
    admin: Boolean
}))
const modelodePrevisao = mongoose.model('previsoes', new mongoose.Schema({
  descricao: String
}))


mongoose.connect('mongodb://localhost:27017/db')
  .then(()=>{

    app.post('/pegar-dados', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne(req.body)
    res.send(usuarioEncontrado)
    })

    app.post('/postar-dados', async (req,res)=>{
    const usuarioCriado = await modelodeUsuario.create(req.body)
    res.send(usuarioCriado)
    })

    app.put('/atualizar-dados', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate(
        {email: req.body.email, password: req.body.password},
        {email: req.body.newEmail, password: req.body.newPassword},
        {returnDocument: 'after'})

    res.send(usuarioAtualizado)
    })

    app.delete('/delete-dados', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne(req.body)
    await modelodeUsuario.deleteOne(req.body, {returnDocument: 'before'})
    res.send(usuarioEncontrado)
    })

    app.post('/postar-previsoes/admin', async (req,res)=>{
      const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, password: req.body.password, admin: req.body.admin})
      console.log(usuarioEncontrado);
      if(usuarioEncontrado.admin === true){
       const previsao = await modelodePrevisao.create({descricao: req.body.descricao})
      return res.json(previsao)
      }
      res.json('vc não é admin')
    })



    app.listen(3000)
  })
