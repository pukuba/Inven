# 규칙 (Rules)

## 1. 계정생성 규칙

### 1-1. `ID`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-3. `Password`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-2. `Name`

1. 길이는 6이상. (Length should be longer then 5.)

## 2. Mutation

### 2-1. `join(id:String, pw:String, name:String): String`

정상 처리결과

>"true"

비정상 처리결과

>"id에 오류가 있습니다."
>"pw에 오류가 있습니다."
>"name에 오류가 있습니다."

### 2-2.`login(id:String, pw:String): String`

정상 처리결과

> "token_string"

비정상 처리결과

> null

### 2-3. `logout(token: token): Boolean`

정상 처리결과

> true

비정상 처리결과

> false