# Wedding Invitation Project Handoff

Last updated: 2026-05-09 22:52 KST
Repository: `/Users/imwoo94/study/wedding/wedding-invitation`
Live URL: `https://imwoo94.github.io/wedding-invitation/`
Branch: `main`
Latest checked commit: `c5222bb feat: optimize assets and add footer shortcuts`

## 현재 결론

현재 청첩장 작업은 전반적으로 이슈 없음으로 봐도 된다.

- GitHub Pages 배포 정상
- 로컬 build/lint 정상
- 라이브 페이지 주요 흐름 정상
- 브라우저 콘솔 JS 에러 없음
- 주요 정적 자산 정상 로딩
- RSVP Slack Webhook 공개 노출은 사용자가 개인 Slack 채널 용도이므로 보안 이슈로 취급하지 않기로 함

## 프로젝트 성격

모바일 우선 청첩장 사이트다. React, TypeScript, Vite, Tailwind CSS 기반이며 GitHub Pages로 배포한다.

중요한 디자인 방향:

- 깔끔하고 우아한 모바일 카드 스타일 유지
- 문장은 모바일에서 읽기 좋은 줄바꿈 유지
- 효과는 과하지 않게, 은은한 꽃잎/그림자/구분선 중심
- 섹션별 정보는 밝은 회색 헤더/디바이더로 명확히 분리
- 화려한 인터랙션보다 읽기 편한 안정감을 우선

## 현재 공개 상태

### 공개된 정보

- 신랑/신부 이름: 이상민 / 백누리
- 예식일: 2027.01.31
- 시간: 일요일 오후 2시 30분
- 장소: M스타하우스웨딩&컨벤션 2층 모닝스타홀
- 주소: 대구 동구 동촌로 316
- 교통: 1호선 방촌역 3번 출구 도보 5분
- 갤러리 사진 4장
- 지도 약도 이미지
- 30초 배경음악 하이라이트
- RSVP 이름/인원수 제출 기능

### 아직 비공개인 정보

연락처와 계좌 정보는 현재 intentionally disabled 상태다.

수정 위치:

- `src/data/invitation.ts`
  - `couple.groom.phone`
  - `couple.bride.phone`
  - `accounts[]`

현재 구조:

```ts
phone: {
  enabled: false,
  label: '신랑 연락처',
  value: '',
  placeholder: '필요 시 공개 예정',
}
```

계좌도 동일하게 `enabled: false` 상태다.

## 나중에 연락처를 공개할 때

1. `src/data/invitation.ts` 열기
2. 대상 전화번호의 `enabled`를 `true`로 변경
3. `value`에 전화번호 입력
4. placeholder는 그대로 둬도 됨
5. `npm run lint`
6. `npm run build`
7. commit/push 후 GitHub Pages 배포 확인

예시:

```ts
phone: {
  enabled: true,
  label: '신랑 연락처',
  value: '010-0000-0000',
  placeholder: '필요 시 공개 예정',
}
```

## 나중에 계좌 정보를 공개할 때

1. `src/data/invitation.ts`의 `accounts` 배열 수정
2. `enabled: true`로 변경
3. `bank`, `holder`, `number` 입력
4. `npm run lint`
5. `npm run build`
6. commit/push 후 라이브 페이지에서 복사 버튼 확인

예시:

```ts
{
  enabled: true,
  side: 'groom',
  label: '신랑 측 마음 전하실 곳',
  bank: '국민은행',
  holder: '이상민',
  number: '000000-00-000000',
  placeholder: '필요 시 공개 예정',
}
```

주의:

- 정적 GitHub Pages 사이트라 공개된 연락처/계좌는 누구나 볼 수 있다.
- Git commit에 들어간 값은 히스토리에 남는다.
- 공개 기간이 끝나면 다시 `enabled: false` 및 값 제거 후 배포하는 것이 좋다.

## RSVP Slack 설정

RSVP 제출은 `src/components/RsvpSection.tsx`에서 처리한다.

- 입력값: 이름, 참석 인원수
- Slack 채널 ID: `C0B2PFXVAPQ`
- Webhook 환경변수: `VITE_RSVP_SLACK_WEBHOOK_URL`
- GitHub Actions secret도 같은 이름 사용

사용자 판단:

- 개인 Slack 채널이므로 현재 Webhook 노출은 보안 이슈로 크게 걱정하지 않음
- 향후 스팸이 실제로 발생할 때만 Webhook rotate 또는 프록시 도입 검토

QA 중 실제 테스트 RSVP가 1건 전송되었을 수 있음:

- 이름: 홍길동
- 인원수: 12
- 테스트 데이터로 보면 됨

## 음악 설정

배경음악 버튼은 `src/components/MusicControl.tsx`에 있다.

현재 기본값:

- `public/music/lee-mujin-highlight-30s.mp3`

환경변수:

- `VITE_WEDDING_MUSIC_URL`

동작:

- 환경변수가 있으면 해당 URL 사용
- 없으면 public에 포함된 30초 하이라이트 mp3 사용
- 모바일 브라우저 정책상 사용자가 버튼을 눌러야 재생됨

## 갤러리 이미지

원본 위치:

- `src/assets/gallery/photo-1.jpeg`
- `src/assets/gallery/photo-2.jpeg`
- `src/assets/gallery/photo-3.jpeg`
- `src/assets/gallery/photo-4.jpeg`

갤러리 컴포넌트:

- `src/components/GallerySection.tsx`

현재 상태:

- 4장 표시
- 자동 슬라이드
- 모달 확대 보기
- 하단 갤러리 바로가기 버튼 존재
- 이미지 자산은 약 1200px급으로 최적화됨

## 위치/지도

데이터 위치:

- `src/data/invitation.ts`의 `event`

컴포넌트:

- `src/components/LocationSection.tsx`

자산:

- `public/mstarhouse-map.png`

현재 상태:

- 네이버/카카오/구글 지도 링크 있음
- 약도 펼치기 기능 있음
- 하단 위치 바로가기 버튼 있음

## 배포/검증 명령

로컬 검증:

```bash
cd /Users/imwoo94/study/wedding/wedding-invitation
npm run lint
npm run build
```

배포:

```bash
git status
git add <changed-files>
git commit -m "..."
git push origin main
```

GitHub Pages는 `.github/workflows/deploy.yml`로 배포된다.

배포 후 확인 URL:

```text
https://imwoo94.github.io/wedding-invitation/
```

## 마지막 QA 결과

검증일: 2026-05-09 KST

확인한 항목:

- `npm run build` 성공
- `npm run lint` 성공
- GitHub Pages 최신 배포 성공
- 라이브 페이지 로딩 정상
- 브라우저 콘솔 JS 에러 없음
- 주요 버튼/폼/모달/지도/음악 동작 확인
- 주요 자산 200 확인
  - `wedding_og.png`
  - `mstarhouse-map.png`
  - `music/lee-mujin-highlight-30s.mp3`
  - `favicon.svg`
- 제거된 구형 자산 404 확인
  - `wedding-music.wav`
  - `wedding_image.png`

## 영상 작업 메모

청첩장과 이어지는 결혼식 영상 작업 문서는 아래에 있다.

- `docs/VIDEO_SCENARIO_DRAFT.md`: 우연한 만남, 10년 연애, 대구/서울/대전·세종/서울 흐름을 담은 시나리오 초안
- `docs/VIDEO_PRODUCTION_PLAN.md`: 10초 캐릭터/무드 테스트부터 30초, 1분, 2분 버전까지 확장하는 제작 계획
- `docs/VIDEO_GEMINI_FLOW_PROMPTS.md`: 첨부 사진 기반 Gemini / Flow용 캐릭터 레퍼런스 및 10초 영상 프롬프트

현재 영상 방향:

- 먼저 10초 버전으로 캐릭터 디자인과 동화풍 3D 애니메이션 무드를 확인한다.
- 캐릭터는 실제 얼굴과 꽤 닮게 만들되, 과한 실사/언캐니 느낌은 피한다.
- 화면 비율은 결혼식장용 16:9와 릴스/모바일용 9:16을 모두 고려한다.
- 의상은 초반 캐주얼 연애룩, 마지막 장면만 웨딩 느낌으로 간다.
- 제작 도구는 Gemini / Flow를 우선 사용한다.
- 결과물이 적합하면 30초 버전으로 확장한다.
- 더 나아가 1분 또는 2분 식전/식중 영상까지 확장 가능하다.
- 직접적인 "Disney/Pixar style" 표현은 피하고, "따뜻한 동화풍 3D 애니메이션", "original family animation film mood" 같은 안전한 표현을 사용한다.

## 다음 작업 후보

현재는 즉시 처리할 필수 이슈 없음.

나중에 정보가 확정되면 다음 순서로 처리하면 된다.

1. 연락처 공개 여부 결정 후 `src/data/invitation.ts` 수정
2. 계좌 정보 공개 여부 결정 후 `accounts[]` 수정
3. 실제 모바일 기기에서 최종 확인
4. `npm run lint && npm run build`
5. commit/push
6. GitHub Pages 배포 후 라이브 페이지 확인

선택 개선 후보:

- 연락처/계좌 비공개 상태의 비활성 버튼을 텍스트만 보이도록 더 정리
- 복사 기능 실패 시 fallback 보강
- 보조 회색 텍스트 대비를 아주 조금 강화
- 갤러리 사진 방향/구도 최종 확인

## 중요한 판단 기록

- Slack RSVP Webhook 공개 노출은 개인 Slack 채널 전송용이므로 현재는 blocker가 아니다.
- 연락처/계좌 정보는 지금 넣지 않고, 추후 확정되면 다시 작업한다.
- 현재 배포본은 전반적으로 이슈 없음으로 판단한다.
