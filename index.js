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


// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);
    console.log(req.body);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
          // PREPARE EMPTY ARRAY TO PUT IDENTIDIED LANGUAGE CODE
          let posted_lang = [];

          // FOR AUTHOLIFICATION OF IBM TRANSLATOR
          const languageTranslator = new LanguageTranslatorV3({
            version: '2019-04-02',
            iam_apikey: process.env.IBM_KEY,
            url: 'https://gateway-tok.watsonplatform.net/language-translator/api',
          });

          // IDENTIRY LANGUAGE BY IBM TRANSLATOR
          const identifyParams = {
            text: event.message.text
          };

          languageTranslator.identify(identifyParams)
            .then(identifiedLanguages => {
              console.log(JSON.stringify(identifiedLanguages, null, 2));
              posted_lang.push(identifiedLanguages.languages[0].language);
              console.log(posted_lang[0])
            })
            .catch(err => {
              console.log('error:', err);
              posted_lang.push('en');
              console.log(posted_lang[0])
            });
            // IDENTIRY LANGUAGE BY IBM TRANSLATOR


            // TRANSLATE BY IBM TRANSLATOR
            var from_to = posted_lang[0] + '-es'
            console.log(from_to)
            const translateParams = {
            text: event.message.text,
            model_id: from_to,
            };

          languageTranslator.translate(translateParams)

            // TRANSACTION WHEN SUCCESSFULLY GOT TRANSLATION
            .then(translationResult => {
              console.log(JSON.stringify(translationResult, null, 2));
              events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: translationResult.translations[0].translation
              }));
            })

            // TRANSACTION FOR WHRN ANY ERRORS HAPPENED
            .catch(err => {
              console.log('error:', err);
              events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: "There's no need of translation, mi amor solo quedate aqui...!"
              }));
            });
        }else if (event.type == "message" && event.message.type == "image"){
            events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: "I got you lovely image!"
            }));

        }else if (event.type == "message" && event.message.type == "sticker"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: "Wow received you lovely sticker!!!"
            }));
        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});