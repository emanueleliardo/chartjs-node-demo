const express = require('express');
const router = express.Router();
const ChartjsNode = require('chartjs-node');
const config = require('../../modules/config');
const debug = require('debug')('chartjs-node-demo:api:generate-chart');

/* GET home page. */
router.post('/', function(req, res) {
    var chartJsConfig = req.body;
    var chartNode = new ChartjsNode(400, 400);
    debug('chartjs config:');
    debug(chartJsConfig);
    debug('options: ' + req.body.options);
    return chartNode.drawChart(chartJsConfig)
    .then(()=> chartNode.getImageBuffer('image/png'))
    .then(buffer => buffer.toString('base64'))
    .then(base64 => {
        const base64Image = `data:image/png;base64,${base64}`
        return res.send({base64Image})
    })
    .catch(err => {
        debug(err);
        return res.status(400).send({
            error: {
                title: err.toString(),
                code: 'Invalid Chartjs Config'
            }
        });
    });
});

module.exports = router;
