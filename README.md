# Dynamoと連携する

基本的にはプライマリーキーでしか、データの検索が出来ないので要注意。例えば、authorがkensukeのものを探したい場合はインデックスを貼るなど工夫が必要。恐らくその場合は、追加料金が発生する…。

## DyanmoDB

### プライマリーキー

プライマリーキーの種類によりKeyShcemaの定義が変わる

- IDのように一意のものを１つ指定
- グループと名前のように２つを組み合わせて一意のものを指定

#### IDのように一意のものを１つ指定

KeySchemaには１つのみ指定

```YAML
# 例
PrimaryKey:
  Name: timestamp
  Type: String
```

#### グループと名前のように２つを組み合わせて一意のものを指定

KeySchemaには２つ指定。この場合は、HASHキーとRANGEキーをそれぞれ設定する。

```YAML
- AttributeName: group
  KeyType: HASH
- AttributeName: name
  KeyType: RANGE
```


### HashキーとRangeキー

#### Hashキー(パーティションキー)

#### Rangeキー（ソートキー）

# ToDo
```
パラメーター
https://qiita.com/hitomatagi/items/68cf6309b8ca94af3900
```

# コミット

```
追加：テンプレートのlambdaをローカルで動かす(イニシャルコミット)
追加：GETリクエストでクエリパラメータを確認する
追加：GETリクエストで「いいね」数を返す(固定値)
追加：POSTリクエストで「いいね」をインクリメントし数を返す(固定値)
追加：Dynamoに値をPOSTする(固定値)
追加：Dynamoに値をPOSTする
追加：Dynamoから値をGETする
```