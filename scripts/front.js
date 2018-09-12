var command = require('./child-command');
console.log(process.argv[2]);
command('npm run ' + process.argv[2], 'tupper-lovers-front');