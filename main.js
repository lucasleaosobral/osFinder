const fs = require('fs');
const convert = require('xml-js');


(async function generateFile(){
        const filesInfo = [];
        
        const files =  await readDir();
        
       for(let i = 0; i < files.length ; i++ ) {
            filesInfo.push( await readFile(files[i]));
       } 

        writeFile(filesInfo);
}())

function readDir(){
     return new Promise ((resolve , reject) => {
        fs.readdir("arquivos", (err, files) => {
            if(err)
                reject(err);
            else 
                resolve(files);
        });
     });
}
 
function setInfo( json , file) {
    return "\n" + file + " " + json.nfeProc.NFe.infNFe.infAdic.infCpl._text;
}

function writeFile(data){
    fs.writeFile('os-notas.txt', data, 'UTF-8', (err) => {
        if(err) throw err
    });
}

function readFile( file ){
    return new Promise((resolve, reject) => {
        
        fs.readFile(`arquivos/${file}`, 'UTF-8', (err, data) => {
        
            var json = convert.xml2json(data, {compact: true, spaces: 2})
            var jsonParsed = JSON.parse(json)
            
            if(err)
                reject(err);
            else 
                resolve((setInfo(jsonParsed, file)));           
         });  
    });
}
