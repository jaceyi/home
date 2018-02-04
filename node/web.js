const createPublic = require('./createPublic')
const fileUrl = './web/dist/'

const web = createPublic(fileUrl)

module.exports = web
