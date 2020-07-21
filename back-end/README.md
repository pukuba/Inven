# API 문서

## 0. Models

###  0-1 `User`
> name:String (닉네임)
>
> id:String (아이디)
>
> icon:String (프로필)
>
> level:Int (레벨)
>
> exp:Int (경험치)
>
> money:Int (머니)
>
> latest:String (마지막 접속시간)

### 0-2 `Icon`
> imgId:Int (이미지 아이디)
>
> name:String (이미지 이름)
>
> imgUrl:String (이미지 주소)

### 0-3 `Post`
>title: String (제목)
>
>author: String (작성자)
>
>date: String (작성날짜)
>
>id: Int (게시글 아이디)
>
>content: String (게시글 내용)
>
>type: Int (게시글 종류)


## 1. Mutation-User

### 1-1 `join (id:String!, pw:String!, name:String!): String`
> 문자열을 반환합니다
>> 정상적으로 회원가입이 이루어진 경우 "true"를 반환합니다.
>>
>> 회원가입이 이루어지지 않은 경우 error message를 반환합니다.

### 1-2 `login` (id:String!, pw:String!): String
> 문자열을 반환합니다
>> 정상적으로 로그인이 이루어진 경우 token값을 반환합니다.
>>
>> 로그인이 이루어지지 않은 경우 null을 반환합니다.

### 1-3 `logout: Boolean`
> 참, 거짓을 반환합니다
>> 로그아웃한 경우 true를 반환합니다

## 2. Mutation-Post

### 2-1 create (content:String!, type:Int!): Boolean
> 참, 거짓을 반환합니다.
>> 글을 정상적으로 작성한경우 true를 반환합니다.
>>
>> 글을 작성하지 못한경우 false를 반환합니다.

## 3. Query

### 3-1 token: Boolean
> 참, 거짓을 반환합니다.
>> 토큰이 유효하면 true를 반환합니다.
>>
>> 토큰이 유효하지 않으면 false를 반환합니다.

### 3-2 latest: [Post]
>Type:Post를 반환합니다.
>>가장 최근에 올라간 게시글 순서대로 반환합니다.

### 3-3 userPost (author:String): [Post]
>Type:Post를 반환합니다.
>> author이 작성한 게시글을 반환합니다.


# 규칙 (Rules)

## 1. 계정생성 규칙

### 1-1. `ID`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-3. `Password`

1. 길이는 6이상. (Length should be longer then 5.)

### 1-2. `Name`

1. 길이는 6이상. (Length should be longer then 5.)
