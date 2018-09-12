var spawn = require('child_process').spawn;
var path = require('path');

module.exports = function (script, relativePath) {
    console.log(path.join(process.cwd(), relativePath));
    return spawn(script, {
        stdio: 'inherit',
        shell: true,
        cwd: path.join(process.cwd(), relativePath)
    });
};
