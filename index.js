const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())

app.get('/app/:email', (req, res) => {
    
    res.send(JSON.parse(fs.readFileSync(req.params.email+'.json')))
    })
app.post('/app/post', (req, res) => {
    const data = req.body
    fs.writeFileSync(data.email+'.json', JSON.stringify(data))
    res.send({email: data.email})
    })
app.put('/app/put', (req, res) => {
    const data = req.body 
    fs.writeFileSync(`${data.email}.json`, JSON.stringify(data), {flag: 'w'})
    res.send(`dados atualizados com sucesso`)
    })
app.delete('/app/delete', (req, res) => {
    const data = req.body
    fs.unlinkSync(data.email+'.json')
    res.send('dados apagados')
    })

    app.all('*', (req,res)=>{
        res.send({erro: true, msg: "Rota não definida no servidor."})
    })


app.listen(3000, ()=>console.log(`server loading`))
