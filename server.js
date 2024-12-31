const fs = require('node:fs').promises;
const fsSync = require('node:fs')
const express = require('express');
const path = require('node:path');
const os = require('node:os');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Origine autorisée
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Méthodes autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // En-têtes autorisés
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Autoriser les cookies
    next();
});

app.post('/api/data', async (req, res) => {
    const dirPath = req.body.dirPath;

    if (!dirPath) {
        return res.status(400).json({ error: 'Le champ dirPath est requis.' });
    }

    try {
        const files = await searchFile(dirPath);
        res.json({ files });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la lecture du répertoire.' });
    }
});

async function searchFile(dirPath) {
    console.log(dirPath);
    console.log(fsSync.existsSync(dirPath));
    console.log(fsSync.existsSync('~/'));
    dirPath = expandHomeDir(dirPath);
    if(doesExist(dirPath)){
        const filesName = await fs.readdir(dirPath);
        const files = new Map();
        if(!files.isEmpty){
            for(fileName of filesName){
                files.set(fileName, isDirectory(dirPath + '/' + fileName));
            }
        }
        files.forEach((values, key) => {
            console.log(key, values);
        })
        const filesObject = Object.fromEntries(files);
        return filesObject;
    }
    return null;
}

function isDirectory(dirPath){
    try{
        stats = fsSync.statSync(dirPath);
        return stats.isDirectory();
    }catch(error){
        console.error(error);
    }
}

function doesExist(dirPath) {
    return fsSync.existsSync(dirPath);
}

function expandHomeDir(dirPath) {
    if (dirPath.startsWith('~')) {
        return path.join(os.homedir(), dirPath.slice(1));
    }
    return dirPath;
}

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));