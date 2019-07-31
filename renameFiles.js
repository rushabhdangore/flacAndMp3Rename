const readline = require('readline-sync')
var colors = require('colors');
const fs = require('fs')
var path = require('path');

console.log("****************This program should be only run from the folder where the files or sub-folder exist****************".underline.red)
let ans = readline.question("\n Which files you want to rename ? Enter Extention ?  \t".white)

if (ans.match(/flac/i)) {
    console.log("\tFLAC Slected".green);
    renameFiles('.flac');
} else if (ans.match(/mp3/i)) {
    console.log("\tMP3 Slected".green);
    renameFiles('.mp3');
} else {
    console.log("\n\n NO SUCH EXTENSION IS SUPPORTED".red);
}

function renameFiles(ext) {
    var folders = [];
    customPreFix = `[ ${ext.toUpperCase().substring(1)} ]`;
    console.log(`\n This Prifix will be ${customPreFix} \n`)
    let start = readline.question("\n Press Y to Continue...")
    if(start.toLocaleLowerCase() !== "y"){
        return
    }
    console.log('\n Checking For Files....\n'.cyan);
    var currDir = path.dirname(require.main.filename);
    do {
        folders = folders.filter(folder => folder != currDir)
        files = fs.readdirSync(currDir)
        
        console.log(currDir.cyan)
        if (files.length > 0) {
            files.forEach(file => {
                if (path.extname(file).match(new RegExp(ext, 'i'))) {
                    
                    console.log(`\t File Found:- \t${file}`.magenta)
                    
                    if (file.search(customPreFix) === -1) {
                        fFName = `${currDir}\\${file}`
                        console.log(`Renamed As: \t${customPreFix} ${file}`.italic.green);
                        changeName = `${currDir}\\${customPreFix} ${file}`
                        fs.renameSync(fFName, changeName)
                    }
                }
                if (file !== 'node_modules' && path.extname(file) === '') {
                    folders.push({
                        fName: file,
                        isMapped: false
                    })
                }
            })
        }
        folders = folders.map(folder => {
            if (!folder.isMapped) {
                folder.isMapped = true;
                if (folder.fName)
                    return currDir + '\\' + folder.fName;
            }
            return folder;
        })
        currDir = folders[0]
    } while (folders.length > 0)
}

