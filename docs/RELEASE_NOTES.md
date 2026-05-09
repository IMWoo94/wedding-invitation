# Release Notes

이 문서는 청첩장 프로젝트의 작업 흐름을 버전별로 바로 이해할 수 있도록 정리한 변경 기록이다.

## v0.8.0 - 안정화 및 최종 QA 기준점

Date: 2026-05-09 KST
Commit: `c5222bb feat: optimize assets and add footer shortcuts`
Live URL: `https://imwoo94.github.io/wedding-invitation/`

### 요약

현재 배포본을 “전반적으로 이슈 없음” 상태로 보는 기준점이다.

### 포함 내용

- 불필요한 구형 자산 제거
- 갤러리 사진 최적화
- 하단 바로가기 UX 정리
- 공유 섹션 문구/동작 정리
- favicon 추가
- README 음악 설명 조정

### 검증

- `npm run lint` 성공
- `npm run build` 성공
- GitHub Pages 배포 정상
- 라이브 페이지 주요 흐름 정상
- 브라우저 콘솔 JS 에러 없음
- 주요 정적 자산 200 확인
- 제거된 구형 자산 404 확인

### 운영 메모

- RSVP Slack Webhook은 개인 Slack 채널 용도이므로 현재 보안 blocker로 보지 않는다.
- 연락처/계좌 정보는 아직 비공개이며, 확정 후 별도 릴리즈에서 공개한다.

## v0.7.0 - 섹션 배경 및 꽃잎 효과 강화

Date: 2026-05-09 KST
Commit: `7dafaff feat: enrich section petal backgrounds`

### 요약

청첩장 전체 분위기를 더 부드럽고 웨딩다운 느낌으로 다듬었다.

### 포함 내용

- 섹션별 은은한 꽃잎 배경 효과 보강
- 카드/섹션 배경의 깊이감 조정
- 전체 화면에서 심심하지 않도록 미세한 시각 효과 추가

### 디자인 메모

- 과하게 화려한 효과는 피하고, 모바일 카드 스타일의 우아함을 유지한다.

## v0.6.0 - 섹션 스타일 통일 및 RSVP 인원수 입력

Date: 2026-05-09 KST
Commit: `af99331 feat: unify section styling and RSVP count input`

### 요약

섹션들의 스타일 체계를 맞추고 RSVP 기능을 실제 사용 가능한 형태로 개선했다.

### 포함 내용

- 연락처/계좌/위치/RSVP/공유 섹션 스타일 통일
- RSVP에 참석 인원수 입력 추가
- RSVP UI 문구 및 안내 개선
- 섹션 헤더/카드/디바이더 스타일 정리
- Apple-like theme 스타일 확장

### 운영 메모

- RSVP는 이름과 참석 인원수를 Slack으로 전송한다.
- 참석 여부 선택보다 간단한 방문 계획 수집에 초점을 둔다.

## v0.5.0 - 음악 하이라이트 적용 및 RSVP 문구 완화

Date: 2026-05-09 KST
Commit: `a9d8be8 feat: apply highlight music and soften RSVP copy`

### 요약

배경음악을 30초 하이라이트로 교체하고 RSVP 문구를 더 자연스럽게 다듬었다.

### 포함 내용

- `public/music/lee-mujin-highlight-30s.mp3` 추가
- 음악 fallback 경로를 30초 하이라이트로 변경
- RSVP 문구를 부담이 적은 표현으로 조정
- 공유 섹션 스타일 정리
- `.gitignore` 음악 파일 정책 보강

### 운영 메모

- 정적 사이트 특성상 public 음악 파일은 방문자가 접근 가능하다.
- 현재는 짧은 하이라이트 파일을 사용하는 방식이다.

## v0.4.0 - 공유 기능 및 설정 가능한 음악 URL

Date: 2026-05-09 KST
Commit: `72ae3c4 feat: finalize sharing and configurable music`

### 요약

초대장 공유 기능과 음악 URL 환경변수 설정을 마무리했다.

### 포함 내용

- 공유 섹션 기능 개선
- `VITE_WEDDING_MUSIC_URL` 환경변수 추가
- GitHub Actions secret 전달 추가
- README 배경음악 설명 추가
- 민감/상업용 음악 파일이 실수로 커밋되지 않도록 ignore 정책 보강

### 운영 메모

- 환경변수 음악 URL도 정적 번들 또는 네트워크에서 노출될 수 있다.
- 공개 가능한 URL만 사용하는 것을 전제로 한다.

## v0.3.0 - Slack RSVP 제출 기능

Date: 2026-05-09 KST
Commit: `73eaf94 feat: add Slack RSVP submissions`

### 요약

방문자가 RSVP를 제출하면 Slack으로 전달되는 기능을 추가했다.

### 포함 내용

- `RsvpSection` 추가
- Slack Incoming Webhook-compatible POST 전송
- `VITE_RSVP_SLACK_WEBHOOK_URL` 환경변수 추가
- GitHub Actions secret 전달 추가
- RSVP 섹션 스타일 추가
- README RSVP 설정 설명 추가

### 운영 메모

- 현재 Slack 채널 ID: `C0B2PFXVAPQ`
- 개인 Slack 채널 용도라 Webhook 노출은 현재 blocker로 보지 않는다.
- 스팸이 생기면 Webhook rotate 또는 프록시 도입을 검토한다.

## v0.2.0 - 웨딩 분위기 강화 및 음악 버튼

Date: 2026-05-09 KST
Representative commits:

- `34298d0 feat: add wedding entrance effects and couple card`
- `c2efcfb feat: add music control and update footer names`
- `cb00542 fix: refine location map and hero copy`
- `5828307 feat: update invitation details and location map`
- `ef9d1ff feat: update invitation copy and og image`

### 요약

초기 Vite/React 사이트를 실제 청첩장에 가까운 형태로 바꾼 구간이다.

### 포함 내용

- 히어로 문구/OG 이미지 업데이트
- 예식장 정보와 약도 추가
- 네이버/카카오/구글 지도 링크 추가
- 음악 컨트롤 버튼 추가
- 웨딩 입장 효과와 커플 카드 추가
- 초대 문구 다듬기

### 디자인 메모

- 모바일에서 첫 화면의 인상과 가독성을 우선한다.
- 지도/위치 정보는 찾아가기 쉬운 실용성을 우선한다.

## v0.1.0 - 초기 프로젝트 구성

Date: 2026-05-09 이전

### 요약

React + TypeScript + Vite 기반 청첩장 프로젝트 초기 구성.

### 포함 내용

- Vite 앱 구성
- TypeScript/ESLint 빌드 체계
- GitHub Pages 배포 기반
- 기본 컴포넌트 구조 정리

## 다음 릴리즈 예정 후보

### v0.9.0 후보 - 연락처/계좌 공개 릴리즈

조건:

- 신랑/신부 연락처 공개 여부 확정
- 계좌 정보 공개 여부 확정

예상 변경:

- `src/data/invitation.ts`에서 `phone.enabled`를 `true`로 변경
- `src/data/invitation.ts`에서 `accounts[].enabled`를 `true`로 변경
- 은행명/예금주/계좌번호 입력
- 실기기에서 전화 버튼/계좌 복사 버튼 검증

검증:

```bash
npm run lint
npm run build
```

배포 후 확인:

- 라이브 페이지에서 연락처 노출 여부 확인
- 전화 버튼 동작 확인
- 계좌 복사 버튼 동작 확인
- 모바일 Safari/Chrome에서 확인

### v1.0.0 후보 - 최종 공유 릴리즈

조건:

- 모든 공개 정보 확정
- 사진 최종본 확정
- 음악/지도/RSVP 최종 확인
- 실제 공유 전 최종 모바일 QA 완료

예상 검증:

- iPhone Safari
- Android Chrome
- 카카오톡 인앱 브라우저
- Slack/카카오톡 공유 preview
- RSVP 테스트 제출
