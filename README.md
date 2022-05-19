# webpack + typescript + react + redux + eslint + test 기본설정

## .eslintrc.js

### env
```
"env": {
  "browser": true,
  "es2021": true,
  "node": true,
  "jest": true
}
```

미리 정의된 글로벌 변수를 제공하는 속성
지정하지 않았을경우 process, console, require 등 전역 환경에 있는
변수의 사용이 불가하다.

### parser

```
"parser": "@typescript-eslint/parser",
```
코드를 분석하는 친구 타입스크립트 구문 분석을 위해 위 속성을 사용한다.


### react/jsx-filename-extension" 

```
"react/jsx-filename-extension": [
    "error",
    {
      "extensions": [
        ".jsx",
        ".tsx"
      ]
    }
  ],
```

jsx 문법을 .jsx, .tsx 파일확장자명을 가진 파일에서 사용하도록 해주는 속성
사실상 리액트를 사용한다면 필수 옵션


### "import/extensions"

```
"import/extensions": [
  "error",
  "ignorePackages",
  {
    "js": "never",
    "jsx": "never",
    "ts": "never",
    "tsx": "never"
  }
]
```
임포트 시 파일확장자명 생략 가능하게 하는 옵션


## tsconfig.json


## webpack.config.js

### entry

```
entry: "./src/index.tsx",
```
코드 파일을 번들할 진입점

### output 

```
output: {
  path: path.resolve("dist/"),
  filename: "app.js",
  publicPath: isProdMode ? "/test/" : "/",
}
```

번들된 파일을 어디에 둘지에 대한 경로 설정
publicPath 옵션은 번들된 파일 앞에 prefix 개념으로 문자열을 붙여준다.
주로 서버의 url 이나 이미지 저장소 주소등을 붙여준다. 반드시 개발모드와 배포모드를 
나누어 작성한다.




## package.json


## .babelrc