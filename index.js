const express = require('express');
const {getCharacters, getCharacterById,addOrUpdateCharacter,deleteCharacter}=require('./dynamo')
const app = express();

// habiliar para recibir data
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// obtener personajes
app.get('/personajes', async(req, res)=>{
    try {
        const characters=await getCharacters();
        res.status(200).json(characters)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error al obtener la informacion de la base de datos"})
    }
})
// obtener personajes
app.get('/personaje/:id', async(req, res)=>{
    const id=req.params.id;
    console.log(id)
    try {
        const character=await getCharacterById(id);
        console.log(character)
        res.json(character)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error al obtener la informacion de la base de datos"})
    }
})
// agregar
app.post('/agregar/personaje', async (req, res)=>{
    const data=req.body;
    console.log(data)
    try {
        const character=await addOrUpdateCharacter(data);
        console.log(character)
        res.json(character)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error al obtener la informacion de la base de datos"})
    }
})
// actualizar
app.put('/actualizar/personaje/:id', async (req, res)=>{
    const data=req.body;
    const {id}=req.params;
    data.id=id;
    try {
        const characterUp=await addOrUpdateCharacter(data);
        res.json(characterUp)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error al obtener la informacion de la base de datos"})
    }
})
// borrar
app.delete('/delete/personaje/:id', async(req, res)=>{
    const {id}=req.params;
    console.log(id)
    try {
        await deleteCharacter(id);
        res.status(200).json({success: "se borro con exito"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error al eliminar el personaje de la base de datos"})
    }
})

const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//Run app, then load http://localhost:3000 in a browser to see the output.

// generar eexpress e4-exampl.....