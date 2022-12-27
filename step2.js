const fs = require('fs');
const axios = require('axios')
const argv = process.argv;
const arg = argv[2]
try {
    const url = new URL(arg);
    webCat()
} catch (_) {
    cat()
}

function cat(){
    fs.readFile(arg, 'utf8', (err,data) => {
        if(err){
            console.log("ERROR",err);
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(){
    try{
        res = await axios.get(arg)
        console.log(res.data)
    }catch(err){
        console.log('ERROR',err)
    }
}