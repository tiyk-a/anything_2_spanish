// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);


// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});




// const languageTranslator = new LanguageTranslatorV3({
//   version: '2019-04-02',
//   iam_apikey: process.env.IBM_KEY,
//   url: 'https://gateway-wdc.watsonplatform.net/language-translator/api',
// });

// const translateParams = {
//   text: 'Hello',
//   model_id: 'en-es',
// };

// languageTranslator.translate(translateParams)
//   .then(translationResult => {
//     console.log(JSON.stringify(translationResult, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });
