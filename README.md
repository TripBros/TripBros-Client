## TripBros Client
<br/>

## 폴더 구조

```
├── App.tsx
└── src
    ├── assets 정적 자산들
    ├── components 재사용 가능한 UI 컴포넌트들을 이 폴더에 저장
    ├── contexts Context API를 사용하여 만든 전역 상태 관리 로직이 이 폴더에 들어갑니다
    ├── hooks 커스텀 훅들이 이 폴더에 포함
    ├── libs 외부 라이브러리나 프로젝트에서 공통으로 사용되는 라이브러리와 같은 코드들을 이곳에 저장
    ├── navigators 앱 내의 네비게이션 구조를 정의하는 파일들이 이 폴더에 포함
    ├── screens 애플리케이션의 각 화면에 해당하는 컴포넌트들을 이 폴더에 저장
    ├── styles 전역 스타일, 테마, 스타일 관련 유틸리티 등이 이 폴더에 포함
    ├── types 타입스크립트 타입 정의, 인터페이스, 열거형(enum) 등이 이 폴더에 저장
    └── utils 다양한 유틸리티 함수들이 이 폴더에 포함
```

<br/>

## 폴더 및 컴포넌트명 규칙
- 컴포넌트 명은 camelCase 통일 ex) clickButton.tsx 

<br/>
## Commit 컨벤션 

| 제목        | 내용                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| init        | 브랜치 첫 커밋                                                                   |
| feat        | 새로운 기능을 추가할 경우                                                        |
| style       | 기능에 영향을 주지 않는 커밋, 코드 순서, css 등의 포맷에 관한 커밋               |
| fix         | 버그를 고친 경우                                                                 |
| refactor    | 코드 리팩토링에 대한 커밋                                                        |
| docs        | 문서를 수정한 경우, 파일 삭제, 파일명 수정 등                                    |
| chore       | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우, 주석 추가, 자잘한 문서 수정 |

## 브랜치 전략
- **`feature/페이지명`**
    - feature/Login 
- **`페이지명/#이슈번호-기능설명`**
    - SelectPage/#3-select-custom (-로 연결)

- 페이지명/이슈번호-기능설명 브랜치 ⇒ feature/페이지명으로 merge
- feature/페이지명 완료 되면 ⇒ develop으로 merge
- 중간 중간 develop ⇒ main merge