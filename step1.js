const fs = require('fs');

function cat(){
    const argv = process.argv;
    fs.readFile(argv[2], 'utf8', (err,data) => {
        if(err){
            console.log("ERROR",err);
            process.kill(1)
        }
        console.log(data)
    })
}

cat()