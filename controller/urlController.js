const shortid = require("shortid");

const Url = require("../models/url");

async function handleOriginalUrlToGetShortUrl(req, res) {
  let body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Please provide Url" });
  }
  const shortId = shortid();

  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy : req.user._id,
  });

  return res.render("home", {
    id: shortId,
  });
}

async function handleRedirectToOriginalUrl(req, res) {
  const shortid1 = req.params.shortid;
  // console.log(shortid1);
  const entry = await Url.findOneAndUpdate(
    {
      shortId: shortid1,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectUrl);
}

async function handleGetAnalaticsData(req, res) {
  const shortId = req.params.shortId;

  const result = await Url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
    visitHeaders: req.headers,
  });
}

async function handleGetAllUrls(req, res) {
  const urls = await Url.find({});

  return res.json(urls);
}

async function handleTest(req, res) {
  const urls = await Url.find({});
  return res.render("home");
}

module.exports = {
  handleOriginalUrlToGetShortUrl,
  handleRedirectToOriginalUrl,
  handleGetAnalaticsData,
  handleGetAllUrls,
  handleTest,
};
