const axios=require('axios');
const {addOrUpdateCharacter, getCharacters} =require('./dynamo');

const seedData=async()=>{
    const url='http://hp-api.herokuapp.com/api/characters';
    try {
        const {data: characters}=await axios.get(url);
        
        const characterPromises=characters.map((character, i)=>
            addOrUpdateCharacter({...character, id:i+''})
        )
        await Promise.all(characterPromises);
    } catch (error) {
        console.log(error)
        console.log("servidor caido")
    }

}

// seedData();
getCharacters();