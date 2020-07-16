# API 문서

## 1. Mutation-User

### 1-1 join (id:String!, pw:String!, name:String!): String
> 문자열을 반환합니다
>> 정상적으로 회원가입이 이루어진 경우 "true"를 반환합니다.
>>
>> 회원가입이 이루어지지 않은 경우 error message를 반환합니다.

### 1-2 login (id:String!, pw:String!): String
> 문자열을 반환합니다
>> 정상적으로 로그인이 이루어진 경우 token값을 반환합니다.
>>
>> 로그인이 이루어지지 않은 경우 null을 반환합니다.

### 1-3 logout: Boolean
> 참, 거짓을 반환합니다
>> 로그아웃한 경우 true를 반환합니다

## 2. Mutation-Post

### 2-1 create (content:String!, type:Int!) Boolean
> 참, 거짓을 반환합니다.
>> 글을 정상적으로 작성한경우 true를 반환합니다.
>>
>> 글을 작성하지 못한경우 false를 반환합니다.

## 3. Query

### 3-1 token(토큰) Boolean
> 참, 거짓을 반환합니다.
>> 토큰이 유효하면 true를 반환합니다.
>>
>> 토큰이 유효하지 않으면 false를 반환합니다.




# 규칙 (Rules)

## 1. 계정생성 규칙

### 1-1. `ID`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-3. `Password`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-2. `Name`

1. 길이는 6이상. (Length should be longer then 5.)
