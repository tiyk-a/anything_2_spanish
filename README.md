# 何語でもスペイン語に訳してくれるLINE botです:dizzy:
![esbot](https://github.com/tiyk-a/images/blob/master/lbot.png "image")

## Update
2022/08/29: Herokuデプロイしてたのを閉じました。公開サーバーなし
https://esbot-line.herokuapp.com/

## :grey_exclamation:Description
送信されたメッセージのスペイン語訳を返信してくれるLINE botです。
英語⇆スペイン語は公式botが存在しますが、英語以外の言語から直接スペイン語に翻訳してくれるbotがないので作成しました。

## :speech_balloon:Usage
1. botのトーク画面へ

![esbot-QRcode](https://github.com/tiyk-a/images/blob/master/lbot_qr.png "QRcode")
- LINEのお友達追加からQRコードを読み取る
- コードが読み込まれたらトークへ
- お友達追加をしていただくとグループトークに追加して使用することもできます

2. 翻訳したいメッセージを送信する
- 何語でも対応できます
- 複数の言語が一つのメッセージに含まれていると正しい翻訳が得られません

3. 翻訳が届く


- スペイン語でメッセージを送信した場合にはスペイン語でシンプルに言い換えをして返信が届きます
- 単語よりも文章の方が翻訳が得意なようです

## :gear:Requirement
- IBM Watson Language Translator (https://www.ibm.com/watson/services/language-translator/)

## Languages & Frameworks
- :page_with_curl:Node.js 10.16.0
