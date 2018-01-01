const execSync = require('child_process').execSync;
const getAppVersion = () => execSync('git describe --tags --always --dirty="-dirty"').toString().trim();
module.exports = getAppVersion;
