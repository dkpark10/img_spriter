import 'styled-components';

// theme 타입지정을 위한 모듈 작성
declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor:string;
  }
}