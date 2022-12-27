const fs = require('fs');
const axios = require('axios');
const flag = process.argv[2]

if(flag == '--out') { 
    var [arg1,arg2,arg3,output, ...targets] = process.argv;
} else {
    var [arg1,arg2, ...targets] = process.argv;
}

targets.forEach(target => {
    checkURL(target) ? webCat(target) : cat(target);
})
    

function checkURL(target){
    try {
        const url = new URL(target);
        return true;
    } catch (_) {
        return false;
    };
};

function cat(target){
    fs.readFile(target, 'utf8', (err,data) => {
        if(err){
            console.log("ERROR",err);
            process.kill(1);
        }
        flag == '--out' ? writeFile(data) :console.log(data);
    });
};

async function webCat(target){
    try{
        res = await axios.get(target);
        flag == '--out' ? writeFile(res.data) : console.log(res.data);
    }catch(err){
        console.log('ERROR',err);
    };
};

function writeFile(data) {
    fs.writeFile(output, (data + '\n'), {encoding:"utf8",flag:'a'}, err => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file!');
    });
    console.log('writing file...');
};