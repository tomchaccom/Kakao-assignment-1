# 과제 목표

이번 과제를 통해 무엇을 배우고자 했는지 간단하게 작성해요.

- 기존 React Todo를 Next.js로 마이그레이션하기
- Server Component와 Client Component 구분하기
- Server Action과 API Route를 이용해 FastAPI와 연동하기
- SQLite에 Todo 데이터를 저장하고 서버에서 조회하기

# 과제 위치

- 브랜치명 : `week3-김명성`
- 프론트엔드 : `kakao-assignment-3/frontend`
- 백엔드 : `kakao-assignment-3/backend`
- 주요 파일 : `app/todos` 내부 페이지 / `app/actions.ts` / `app/api/todos/route.ts` / `backend/main.py`

# 구현한 기능

기본 미션 중 구현한 항목에 체크해요.

- [x] Todo CRUD 마이그레이션
- [x] 상태별 필터링 기능 마이그레이션
- [x] Todo 일간 뷰 마이그레이션
- [x] Todo 주간 뷰 마이그레이션
- [x] Next.js API Route와 FastAPI 연동
- [x] Server Action을 이용한 생성, 수정, 삭제
- [x] SQLite 데이터베이스 연동
- [x] 로딩 및 에러 화면 구현
- [x] 환경변수 분리
- [x] Tailwind CSS 적용

# 도전 기능

- [x] 서버 기반 상태별 필터링 구현하기
- [x] 서버 기반 Todo 검색 기능 구현하기
- [x] 날짜, 상태, 검색 조건 동시에 적용하기

# Next.js 마이그레이션 환경 세팅

## AI 활용 내용(사용한 프롬프트)

기존 React 프로젝트를 Next.js로 마이그레이션할 때 어떤 디렉터리 구조가 필요하고, Server Component와 Client Component를 어떻게 구분해야 하는지 표로 정리해줘.

## 직접 확인하고 이해한 부분

`app` 디렉터리의 폴더 구조가 URL이 되고, `page.tsx`는 기본적으로 Server Component로 동작한다는 것을 확인했습니다.

상태나 클릭 이벤트가 필요한 Todo 입력 폼과 에러 화면만 Client Component로 분리했습니다.

| 구분 | 역할 |
| --- | --- |
| Server Component | 데이터 조회와 페이지 화면 구성 |
| Client Component | 입력 상태와 클릭 이벤트 처리 |
| Server Action | 폼 처리, 데이터 변경, 화면 갱신 |
| API Route | FastAPI로 HTTP 요청 전달 |

## 확인한 이유

페이지 전체에 `"use client"`를 작성하지 않고, 브라우저 기능이 필요한 부분만 Client Component로 만들기 위해서 확인했습니다.

# FastAPI와 DB 세션 연동

## AI 활용 내용(사용한 프롬프트)

FastAPI에서 SQLAlchemy DB 세션을 만들고 `Depends`를 이용해 각 API에서 호출하는 방법을 알려줘.

## 직접 확인하고 이해한 부분

`SessionLocal`로 DB 세션을 만들고 `get_db()`에서 요청마다 세션을 열고 닫도록 구현했습니다.

각 API에서는 `Depends(get_db)`를 통해 같은 방식으로 DB 세션을 전달받았습니다.

## 확인한 이유

API마다 세션 생성과 종료 코드를 반복하지 않고, 요청이 끝났을 때 세션이 안전하게 닫히도록 만들기 위해서 확인했습니다.

# Server Action과 API Route 구분

## AI 활용 내용(사용한 프롬프트)

Next.js의 Server Action과 API Route의 차이점과 Todo CRUD에서 각각 어떤 역할을 맡아야 하는지 알려줘.

## 직접 확인하고 이해한 부분

Server Action은 폼 데이터 처리, 입력 검증, `revalidatePath`와 페이지 이동을 담당하도록 했습니다.

API Route는 Next.js와 FastAPI 사이에서 요청을 전달하는 프록시 역할로 사용했습니다.

```text
페이지 → Server Action → API Route → FastAPI → SQLite
```

## 확인한 이유

Server Action과 API Route가 모두 서버에서 동작해서 처음에는 차이를 이해하기 어려웠고, 각각의 책임을 분리하기 위해서 확인했습니다.

# 서버 기반 필터링과 검색

## AI 활용 내용(사용한 프롬프트)

클라이언트에서 배열을 필터링하지 않고 FastAPI에서 상태별 필터링과 Todo 검색을 처리하도록 API를 만들어줘.

## 직접 확인하고 이해한 부분

프론트엔드에서 전체 데이터를 받은 뒤 필터링하는 대신 쿼리 파라미터를 FastAPI로 전달하도록 변경했습니다.

```text
GET /todos?filter=active
GET /todos?filter=completed
GET /todos?search=키워드
GET /todos?filter=active&search=키워드
```

날짜, 상태, 검색 조건도 함께 전달할 수 있도록 구현했습니다.

## 확인한 이유

데이터가 많아졌을 때 전체 데이터를 브라우저로 전달하는 것보다 서버와 DB에서 필요한 데이터만 조회하는 방식이 더 적절하다고 생각했습니다.

# 구현하면서 고민한 점

## 고민한 점

- 어떤 컴포넌트를 Server Component와 Client Component로 구분해야 하는지
- Server Action과 API Route 중 어디에서 FastAPI를 호출해야 하는지
- FastAPI의 DB 세션을 API마다 어떻게 안전하게 사용해야 하는지
- 날짜, 상태, 검색 필터를 프론트와 서버 중 어디에서 처리해야 하는지

## 해결 방법

- 데이터 조회와 목록 화면은 Server Component로 구성했습니다.
- 입력 상태와 이벤트가 필요한 폼만 Client Component로 구성했습니다.
- Server Action은 폼 처리와 화면 갱신, API Route는 FastAPI 요청 전달을 담당하도록 분리했습니다.
- `get_db()`를 만들어 모든 FastAPI API에서 DB 세션을 주입받도록 했습니다.
- 필터와 검색은 FastAPI에서 처리하고 프론트는 쿼리 파라미터만 전달하도록 구현했습니다.

# 과제 회고

## 잘한 점

React로 구현한 기능을 Next.js 구조로 직접 옮기면서 Server Component, Server Action, API Route의 역할을 확인했습니다.

FastAPI와 SQLite까지 연결하고 날짜, 필터, 검색 기능을 서버에서 처리하도록 구현했습니다.

## 아쉬운 점

Next.js의 서버 기능과 FastAPI의 DB 세션을 처음 사용해서 AI의 도움을 많이 받았습니다.

API 요청 흐름과 SQLAlchemy 쿼리 작성 방법은 추가 공부가 필요합니다.

## 다음에 시도해볼 것

- Server Action과 API Route 차이 다시 정리하기
- FastAPI DB 세션과 트랜잭션 공부하기
- Alembic을 이용한 DB 마이그레이션 적용하기
- API와 화면 자동화 테스트 추가하기
