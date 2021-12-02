const AWS=require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoCLient= new AWS.DynamoDB.DocumentClient();
const TABLE_NAME="harrypotter-api";

const getCharacters= async()=>{
    const params={
        TableName:TABLE_NAME
    };
    const characters= await dynamoCLient.scan(params).promise();
    console.log(characters);
    return characters;
}

// funcion para agregar un personaje
const addOrUpdateCharacter= async(character)=>{
    const params={
        TableName:TABLE_NAME,
        Item: character
    }
    return await dynamoCLient.put(params).promise();

}
// obtener caracter por id
const getCharacterById=async(id)=>{
    const params={
        TableName:TABLE_NAME,
        key:{
            id
        }
    }
    return await dynamoCLient.get(params).promise();
}

getCharacterById("0")

// const chp={
//     "id":"0",
//     "name": "Harry Potter",
//     "alternate_names": [
//     ""
//     ],
//     "species": "human",
//     "gender": "male",
//     "house": "Gryffindor",
//     "dateOfBirth": "31-07-1980",
//     "yearOfBirth": 1980,
//     "wizard": true,
//     "ancestry": "half-blood",
//     "eyeColour": "green",
//     "hairColour": "black",
//     "wand": {
//     "wood": "holly",
//     "core": "phoenix feather",
//     "length": 11
//     },
//     "patronus": "stag",
//     "hogwartsStudent": true,
//     "hogwartsStaff": false,
//     "actor": "Daniel Radcliffe",
//     "alternate_actors": [
//     ""
//     ],
//     "alive": true,
//     "image": "http://hp-api.herokuapp.com/images/harry.jpg"
//     };

//     addOrUpdateCharacter(chp);

// getCharacters();