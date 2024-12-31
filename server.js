const fs = require('node:fs').promises;
const path = require('path');

async function searchFile(dirPath){
    try{
        const files = await fs.readdir(dirPath);
        for(const file of files){
            console.log(file);
        }
    }catch(err){
        console.error(err);
    }
}

searchFile('./');