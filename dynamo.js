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
const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        },
    };
    console.log(params)
    return await dynamoCLient.get(params).promise();
};


// borrar personaje por id
const deleteCharacter=async(id)=>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            id
        }
    }
    return await dynamoCLient.delete(params).promise();
}


// exportar
module.exports={
    dynamoCLient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter
}



