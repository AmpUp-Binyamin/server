import fs from "fs"

if (!fs.existsSync('../../files')) {
    fs.mkdirSync('./uploads')
}

