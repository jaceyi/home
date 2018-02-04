const createPublic = require('./createPublic')
const fileUrl = './admin/dist/'

const admin = createPublic(fileUrl)

module.exports = admin
