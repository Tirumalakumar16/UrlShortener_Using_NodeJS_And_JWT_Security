const express = require('express');

const urlController = require('../controller/urlController')

const router = express.Router();



router
.route('/')
.post(urlController.handleOriginalUrlToGetShortUrl)
.get(urlController.handleGetAllUrls)

// router.post('/test',urlController.handleTest)


router
.get('/:shortid',urlController.handleRedirectToOriginalUrl)

router
.get('/analytics/:shortId',urlController.handleGetAnalaticsData)


module.exports = router;
