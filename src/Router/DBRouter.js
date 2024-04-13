let Router = require("express");
const router = Router();
let { sendToBackend } = require('../Controlter/DBControler')
let { getGraphData } = require('../Controlter/GraphControler')


router.route('/getsearch').post(sendToBackend)
router.route('/getGraphData').post(getGraphData)

module.exports = router;