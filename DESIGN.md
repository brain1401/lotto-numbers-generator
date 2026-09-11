---
name: 복권 번호 생성기
description: 로또 6/45와 연금복권 720+ 번호를 암호학적 난수로 조용하고 정확하게 뽑는 도구
colors:
  bg: 'oklch(0.09 0 0)'
  surface: 'oklch(0.13 0 0)'
  surface-raised: 'oklch(0.17 0 0)'
  border: 'oklch(0.21 0 0)'
  ink: 'oklch(0.95 0 0)'
  muted: 'oklch(0.68 0 0)'
  primary: 'oklch(0.51 0.105 230)'
  primary-hover: 'oklch(0.47 0.105 230)'
  destructive: 'oklch(0.65 0.18 25)'
  destructive-tint: 'oklch(0.65 0.18 25 / 0.12)'
  focus: 'oklch(0.72 0.1 230)'
  ball-yellow: 'oklch(0.852 0.199 100)'
  ball-blue: 'oklch(0.623 0.214 259)'
  ball-red: 'oklch(0.626 0.258 29)'
  ball-gray: 'oklch(0.704 0.015 252)'
  ball-green: 'oklch(0.723 0.219 149)'
  ball-ink: 'oklch(0.2 0 0)'
typography:
  display:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: '-0.01em'
  title:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.556
    fontFeature: '"tnum"'
  control:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.43
  action:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.43
  body:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.333
  ball-number:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '1.25rem'
    fontWeight: 700
    lineHeight: 1.4
    fontFeature: '"tnum"'
  number:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.43
    fontFeature: '"tnum"'
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  xl: '12px'
  full: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
    typography: '{typography.action}'
    rounded: '{rounded.lg}'
    padding: '10px 24px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.ink}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    rounded: '{rounded.md}'
    height: '28px'
    padding: '0 10px'
  button-ghost-hover:
    backgroundColor: 'oklch(0.17 0 0 / 0.5)'
    textColor: '{colors.ink}'
  button-ghost-expanded:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
  button-destructive:
    backgroundColor: 'transparent'
    textColor: '{colors.destructive}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '4px 8px'
  button-destructive-hover:
    backgroundColor: '{colors.destructive-tint}'
    textColor: '{colors.destructive}'
  button-delete-quiet:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0 4px'
  button-delete-quiet-hover:
    textColor: '{colors.destructive}'
  stepper-button:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    size: '32px'
  stepper-button-hover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
  header:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
    typography: '{typography.display}'
  tab:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    typography: '{typography.control}'
    rounded: '{rounded.lg}'
    padding: '8px 16px'
  tab-hover:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
  tab-active:
    backgroundColor: '{colors.bg}'
    textColor: '{colors.ink}'
  number-ball-yellow:
    backgroundColor: '{colors.ball-yellow}'
    textColor: '{colors.ball-ink}'
    typography: '{typography.ball-number}'
    rounded: '{rounded.full}'
    size: '40px'
  number-ball-blue:
    backgroundColor: '{colors.ball-blue}'
    textColor: '{colors.ink}'
    typography: '{typography.ball-number}'
    rounded: '{rounded.full}'
    size: '40px'
  number-ball-red:
    backgroundColor: '{colors.ball-red}'
    textColor: '{colors.ink}'
    typography: '{typography.ball-number}'
    rounded: '{rounded.full}'
    size: '40px'
  number-ball-gray:
    backgroundColor: '{colors.ball-gray}'
    textColor: '{colors.ball-ink}'
    typography: '{typography.ball-number}'
    rounded: '{rounded.full}'
    size: '40px'
  number-ball-green:
    backgroundColor: '{colors.ball-green}'
    textColor: '{colors.ball-ink}'
    typography: '{typography.ball-number}'
    rounded: '{rounded.full}'
    size: '40px'
  ticket:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.xl}'
    padding: '16px'
  history-entry:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.xl}'
    padding: '16px'
  pension-group-badge:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
    typography: '{typography.number}'
    rounded: '{rounded.lg}'
    padding: '4px 10px'
  pension-digit:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
    typography: '{typography.number}'
    rounded: '{rounded.md}'
    width: '32px'
    height: '40px'
  fairness-panel:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.muted}'
    typography: '{typography.body}'
    rounded: '{rounded.lg}'
    padding: '16px'
---

# Design System: 복권 번호 생성기

## Overview

**Creative North Star: "The Midnight Terminal"**

한밤의 로또 판매점 끝자리 터미널. 형광등이 꺼지고 남겨진 추첨기 앞, 어두운 화면 위에 다섯 가지 색의 번호 공이 보석처럼 점등된다. 이 시스템은 그 순간의 고요한 정확함을 포착한다. 화려함이 아니라 신뢰감, 반짝임이 아니라 집중.

UI 표면은 의도적으로 어둡고 중립적이다. 코발트 인디고가 행동 하나를 지시하고, 나머지 표면은 로또 공 다섯 색과 연금복권 숫자판이 가장 선명하게 읽히도록 비켜선다. Vercel, Linear, Raycast가 보여주는 도구적 정직함 — 인터페이스가 작업 속으로 사라진다. 컴포넌트는 정돈되고 직접적이다: 눈길을 끄는 연출은 없지만, 정확히 작동한다는 확신을 준다.

두 복권은 같은 무대를 공유한다. 탭 하나로 전환되고, 게임 수 선택기·생성 버튼·기록·공정성 안내는 같은 부품을 그대로 쓴다. 달라지는 것은 번호가 담기는 티켓뿐이다 — 로또는 색 공 여섯 개, 연금복권은 조 배지와 여섯 칸 숫자판.

이 시스템이 명시적으로 거부하는 것: 카지노·사행성 게임의 금색, 반짝임, 네온, 잭팟 이펙트. 그리고 동행복권 사이트 같은 공공기관 스타일의 정보 과부하, 복잡한 양식, 밀집된 격자.

**Key Characteristics:**

- 어두운 무채색 표면 위에서 로또 공 5색이 조명처럼 빛남
- 코발트 인디고는 세 자리에만: 생성 버튼, 연금 조 배지, 공정성 방패 아이콘
- Pretendard Variable 단일 패밀리, 크기보다 무게 대비로 위계 구성
- 모션은 사용자의 행동에만 반응: 상태 전환 150ms, 번호 등장 160ms + stagger, 페이지 로드 연출 없음
- 그림자 대신 명도 계단으로 깊이 표현, 여백이 구역을 구분

## Colors

어두운 무채색 계단 위에 고정된 로또 공 5색, 그리고 아껴 쓰는 코발트 인디고 하나.

토큰은 `src/index.css`의 `:root`에 `--ds-*`로 한 번만 정의되고, `@theme inline`을 거쳐 `bg-ds-surface`, `text-ds-muted` 같은 유틸리티가 된다. shadcn/ui의 시맨틱 토큰은 모두 `--ds-*`를 가리킨다: `--background`→bg, `--card`→surface, `--popover`·`--secondary`·`--muted`·`--accent`→surface-raised, `--muted-foreground`→muted, `--primary`→primary, `--ring`→focus, `--border`·`--input`→border. 다크 전용이다 — `<html class="dark">`, `color-scheme: dark`, 라이트 테마 없음.

아래 대비 수치는 모두 OKLCH를 sRGB로 변환한 뒤 WCAG 2.1 상대 휘도로 계산한 값이다.

### Primary

- **코발트 인디고** (`primary`): '번호 생성' 버튼 배경, 연금복권 'N조' 배지 배경, 공정성 안내 요약 줄의 방패 아이콘. 화이트 잉크 텍스트와 4.82:1(AA), 아이콘으로서 배경 대비 3.71:1(비텍스트 3:1 통과).
- **딥 코발트** (`primary-hover`): 생성 버튼 hover 배경 전용. 밝아지는 hover는 흰 텍스트 대비를 잃기 때문에(L 0.61에서 3.20:1) 한 단계 가라앉는다 — 화이트 잉크와 5.67:1.
- **포커스 코발트** (`focus`): 키보드 포커스 링 전용이며 shadcn `--ring`도 이 값이다. 배경 8.53:1 · 서피스 8.29:1 · 레이즈드 패널 7.88:1. 코발트보다 밝아서 생성 버튼 위에서도 링이 버튼 면과 섞이지 않는다(2.30:1). 이전의 코발트 60% 반투명 링은 배경 대비 2.18:1로 비텍스트 기준(3:1) 미달이었다.

### Neutral

- **미드나이트 블랙** (`bg`): 앱 배경, 그리고 활성 탭의 면. 활성 탭이 배경과 같은 색이라 헤더에서 본문으로 이어진 문처럼 보인다.
- **다크 서피스** (`surface`): 티켓, 기록 항목, 공정성 안내 패널. 비활성 탭 hover.
- **레이즈드 패널** (`surface-raised`): 헤더 띠, 연금복권 숫자 칸, 스테퍼 hover, 펼쳐진 ghost 트리거.
- **서브틀 보더** (`border`): 헤더 하단선, 활성 탭 윤곽, 스테퍼 테두리, 숫자 칸 윤곽, 공정성 패널 테두리와 내부 구분선. 배경 대비 1.17:1 — 눈에 띄지 않는 것이 목적이다.
- **화이트 잉크** (`ink`): 주 텍스트, 번호, 스테퍼 기호. 배경 17.9:1, 서피스 17.4:1, 레이즈드 패널 16.5:1.
- **뮤트 그레이** (`muted`): 게임 레이블, 날짜, 비활성 탭, '게임 수' 레이블, ghost 트리거, 설명 본문. 배경 7.18:1 · 서피스 6.98:1 · 레이즈드 패널 6.64:1 — 12px 레이블까지 AA를 여유 있게 넘긴다. (이전 값 `oklch(0.55)`는 레이즈드 패널 위 AA 미달이었다.)

### Semantic

- **딥 레드** (`destructive`): '전체 삭제' 텍스트, 기록 항목 '삭제'의 hover 텍스트. 배경 5.88:1 · 서피스 5.72:1. 배경을 채우지 않는 ghost 버튼에만 쓴다.
- **레드 틴트** (`destructive-tint`): '전체 삭제' hover 배경. 딥 레드 12%.

### Lotto Ball Colors (고정 제약, 변경 불가)

- **선라이즈 옐로** (`ball-yellow`): 번호 1–10. 텍스트는 다크 볼 잉크 — 11.67:1.
- **로얄 블루** (`ball-blue`): 번호 11–20. 텍스트는 화이트 잉크 — 3.24:1, 20px bold 큰 텍스트 기준(3:1) 통과.
- **크림슨 레드** (`ball-red`): 번호 21–30. 텍스트는 화이트 잉크 — 3.47:1, 큰 텍스트 기준 통과.
- **실버 그레이** (`ball-gray`): 번호 31–40. 텍스트는 다크 볼 잉크 — 6.89:1. 화이트 잉크는 2.27:1로 실패한다.
- **에메랄드 그린** (`ball-green`): 번호 41–45. 텍스트는 다크 볼 잉크 — 8.12:1. 화이트 잉크는 1.93:1로 실패한다.
- **다크 볼 잉크** (`ball-ink`): 옐로·그레이·그린 공 위 숫자 전용. 다른 곳에 쓰지 않는다.

### 대비 기준

공 숫자는 20px/700이라 WCAG의 큰 텍스트(18.66px bold 이상)에 들고, 3:1 기준이 적용된다. 블루·레드 공의 흰 숫자(3.24·3.47:1)는 이 크기에서만 통과한다 — 공 숫자를 20px 아래로 줄이면 다시 AA 미달이 된다. 버튼, 조 배지, 연금 숫자 칸처럼 14px인 텍스트는 4.5:1을 넘어야 한다.

### Named Rules

**The Quiet Stage Rule.** 로또 공 5색은 이 UI의 목소리다. 앱 셸은 그 다섯 색과 경쟁하지 않는다. 코발트 인디고와 딥 레드 외에 채도 있는 색을 앱 셸에 추가하지 않는다.

**The Single Voice Rule.** 코발트 인디고는 세 자리에만 쓴다: '번호 생성' 버튼(화면의 유일한 주 행동), 연금복권 'N조' 배지(티켓에서 가장 먼저 읽혀야 하는 값), 공정성 안내의 방패 아이콘(신뢰 표식). 키보드 포커스 링은 같은 계열의 더 밝은 값(`focus`)을 쓴다. 링크·다른 배지·장식 아이콘으로 퍼뜨리지 않는다. 네 번째 자리가 필요해 보이면 규칙을 먼저 고친다.

**The Measured Contrast Rule.** 대비 수치는 계산해서 적는다. 새 전경/배경 조합은 추가하기 전에 측정하고, 4.5:1(텍스트)·3:1(아이콘·경계)에 못 미치면 그 자리에서 고친다. 알려진 경계값(공 숫자 20px, 어두워지는 hover)을 되돌리지 않는다.

## Typography

**Body Font:** Pretendard Variable (`pretendard` 패키지의 dynamic-subset 웹폰트), 폴백 `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif`

**Character:** 한국어 최적화 휴머니스트 산스 한 벌. 한글 자소와 숫자가 같은 리듬으로 렌더링되고, 기하학적이지 않아 도구적이면서도 딱딱하지 않다. 크기 단계는 12–24px 사이로 좁고, 위계는 주로 무게(400/500/600/700)가 만든다.

### Hierarchy

- **Display** (700, 1.5rem/24px, lh 1.333, ls -0.01em): 헤더의 앱 타이틀 "복권 번호 생성기". 페이지 전체에 한 번만.
- **Title** (600, 1.125rem/18px, lh 1.556, tabular): 게임 수 스테퍼의 카운터 숫자. 섹션 헤딩은 현재 없다 — 구역은 여백과 `aria-label`로 나뉜다.
- **Control** (500, 0.875rem/14px, lh 1.43): 탭, '게임 수' 레이블, '기록에 저장됨' 같은 한 줄 상태.
- **Action** (600, 0.875rem/14px, lh 1.43): '번호 생성' 버튼 한 곳.
- **Body** (400, 0.875rem/14px, lh 1.625): 공정성 안내의 설명 본문. 컨테이너가 `max-w-4xl`이라 한 줄이 길어질 수 있으니 새 장문은 65ch 안쪽으로 묶는다.
- **Label** (500, 0.75rem/12px, lh 1.333): 게임 레이블("게임 A"). 같은 크기의 날짜·'삭제'·'전체 삭제'·안내 각주는 400으로 한 단계 가볍게.
- **Ball Number** (700, 1.25rem/20px, lh 1.4, tabular): 번호 공 안의 숫자. 대비 기준 때문에 20px 아래로 줄이지 않는다(Colors의 대비 기준 참고).
- **Number** (700, 0.875rem/14px, tabular): 연금복권 숫자 칸, 조 배지.

shadcn `Button`의 `sm` 크기(공정성 안내·이전 기록 트리거)는 자체 크기 0.8rem/500을 쓴다. 이 트리거에만 해당하는 값이라 별도 역할로 만들지 않았다.

### Named Rules

**The No Uppercase Rule.** `text-transform: uppercase`를 쓰지 않는다. 게임 레이블은 "게임 A"이지 "GAME A"가 아니다.

**The Tabular Numbers Rule.** 공 안의 숫자, 연금 숫자 칸, 스테퍼 카운터, 날짜, "이전 기록 N개"의 N — 바뀌는 모든 수치에 `tabular-nums`를 적용한다. 숫자가 바뀌어도 레이아웃이 흔들리지 않는다.

## Layout

단일 칼럼. 헤더와 본문이 같은 컨테이너(최대 폭 56rem/896px, 가운데 정렬, 좌우 거터 16px)를 공유해 탭과 결과의 왼쪽 끝이 한 선에 맞는다. 라우팅은 없고 탭이 본문을 통째로 바꾼다.

본문 순서는 고정이다: 공정성 안내 한 줄 → 생성 섹션(컨트롤 줄 + 결과 그리드) → 기록 줄. 본문 위아래 여백은 32px, 세 구역 사이는 40px. 생성 섹션 안에서 컨트롤 줄과 결과 그리드 사이는 24px.

- **컨트롤 줄**: 왼쪽에 게임 수 스테퍼, 오른쪽 끝에 '번호 생성' 버튼. 좁은 화면에서는 줄바꿈되며 간격 16px.
- **결과 그리드** (`ticket-grid`): 뷰포트 브레이크포인트가 아니라 칸 폭으로 열 수를 정한다. 한 칸의 최소 폭은 19.5rem(312px)으로, 가장 넓은 티켓(공 6개 280px)에 좌우 패딩 32px를 더한 값이다. 최대 컨테이너(864px)에서 2열, 휴대폰에서 1열. 간격 12px.
- **기록 항목**: 항목 사이 16px, 항목 안의 티켓 그리드도 `ticket-grid`에 간격 8px.
- **인라인 디스클로저 줄**(공정성 요약, 기록 줄): 한 줄에 흐르다가 줄바꿈된다. 가로 간격 8px, 세로 4px, 조각 사이 구분은 가운뎃점 "·".

### Named Rules

**The Numbers First Rule.** 생성 버튼과 결과 사이에는 아무것도 두지 않는다. 설명(공정성 안내)과 기록은 기본으로 접혀 있고 사용자가 열 때만 펼쳐진다. 새로 추가하는 것도 번호보다 먼저 시선을 빼앗지 않는 자리에 둔다.

**The One Row Rule.** 한 게임의 번호는 한 줄에 놓인다. 공이 두 줄로 넘어가거나 숫자판이 티켓 밖으로 넘치면 레이아웃이 틀린 것이다 — 공을 줄이지 말고 열을 줄인다.

## Elevation & Depth

그림자 대신 명도 계단으로 깊이를 표현한다. 배경(0.09) → 서피스(0.13) → 레이즈드 패널(0.17) — 명도가 한 단계 오를 때마다 한 층 앞으로 나온다. 헤더는 레이즈드 패널 띠이고, 활성 탭은 배경색 면이 헤더 하단선을 1px 덮어 본문으로 열린 문처럼 보인다. 연금복권 숫자 칸은 서피스 티켓 위에 레이즈드 패널 + 서브틀 보더로 한 단계 올라온, 이 시스템에서 유일한 표면 속 표면이다.

### Shadow Vocabulary

- **focus-ring** (`box-shadow: 0 0 0 2px var(--ds-focus)`): 키보드 포커스 전용. 불투명 포커스 코발트. `focus-visible-ring` 유틸리티로 모든 인터랙티브 요소에 붙는다. Tailwind `ring-*`로 대체하지 않는다.

### Named Rules

**The Flat-By-Default Rule.** 표면은 정적 상태에서 평평하다. 그림자는 포커스 링 하나뿐이다. 버튼, 카드, 공에도 그림자를 넣지 않는다.

## Shapes

둥근 모서리의 계단: 바깥 컨테이너가 가장 둥글고, 안으로 들어갈수록 각이 선다.

- **12px** (`xl`): 티켓, 기록 항목 — 손에 쥔 실제 티켓을 연상.
- **8px** (`lg`): 생성 버튼, 연금 조 배지, 공정성 안내 패널, 탭의 위쪽 두 모서리.
- **6px** (`md`): 연금 숫자 칸, '전체 삭제', ghost 트리거.
- **4px** (`sm`): 기록 항목의 '삭제'.
- **완전한 원** (`full`): 번호 공(40px), 스테퍼 버튼(32px).

테두리는 1px 서브틀 보더 하나만 쓴다. 티켓과 기록 항목에는 테두리가 없고 명도 차이로 구분된다. 테두리는 활성 탭, 스테퍼 버튼, 연금 숫자 칸, 공정성 안내 패널에만 있다.

### Named Rules

**The Nested Radius Rule.** 안쪽 요소는 바깥 요소보다 둥글지 않다: 컨테이너 12px > 컨트롤·패널 8px > 내부 칸 6px. 공과 스테퍼만 예외로 완전한 원이다.

## Components

### Buttons

**정돈되고 직접적이다.** 장식 없이 상태만 분명하게 바뀐다.

- **Primary '번호 생성'**: 코발트 인디고 배경, 화이트 잉크, Action 타이포그래피, 8px 라운드, 패딩 10px 24px. 탭마다 하나뿐이다.
- **Hover**: 딥 코발트로 150ms 색 전환 — 밝아지지 않고 한 단계 가라앉는다.
- **Ghost 트리거 '어떻게 뽑나요?' · '이전 기록 N개'**: shadcn `Button` `variant="ghost" size="sm"` — 높이 28px, 6px 라운드, 뮤트 그레이 텍스트, 오른쪽에 셰브런 아이콘. hover 시 레이즈드 패널 50% 배경 + 화이트 잉크, 펼쳐지면 레이즈드 패널 배경이 남고 셰브런이 200ms에 걸쳐 180° 돈다. 누르면 1px 내려앉는다.
- **Ghost Destructive '전체 삭제'**: 투명 배경, 딥 레드 12px 텍스트, 6px 라운드, 패딩 4px 8px. hover 시 레드 틴트 배경. 기록이 펼쳐져 있을 때만 줄 오른쪽 끝에 나타난다.
- **Quiet Delete 기록 항목 '삭제'**: 평소엔 뮤트 그레이, hover 시에만 딥 레드. 파괴 행동을 기본 상태에서 소리치지 않는다. `aria-label="이 기록 삭제"`.
- **Focus**: 모두 focus-ring. 브라우저 기본 outline은 지운다.
- **Disabled**: shadcn 버튼은 50% 불투명 + 포인터 없음.

### Stepper (게임 수 선택기)

- 뮤트 그레이 '게임 수' 레이블(Control) 옆에 − / 카운터 / + 가 12px 간격으로 놓인다.
- **버튼**: 32×32px 원, 투명 배경, 서브틀 보더, 화이트 잉크 굵은 기호. hover 시 레이즈드 패널 배경 + 보더가 `oklch(0.30 0 0)`으로 한 단계 밝아진다.
- **Disabled**: 1과 10에서 해당 버튼이 30% 불투명, 커서 금지.
- **카운터**: Title 타이포그래피, 폭 24px 가운데 정렬, tabular.
- 두 버튼 모두 `aria-label`("게임 수 감소" / "게임 수 증가").

### Navigation (헤더 탭)

- 헤더는 레이즈드 패널 띠 + 하단 서브틀 보더. 타이틀 아래 16px에 탭 두 개('로또 6/45', '연금복권 720+')가 4px 간격으로 붙는다.
- **탭**: Control 타이포그래피, 패딩 8px 16px, 위쪽 모서리만 8px 라운드.
- **비활성**: 뮤트 그레이, hover 시 서피스 배경 + 화이트 잉크.
- **활성**: 배경색 면 + 위·좌·우 서브틀 보더, 아래로 1px 내려 헤더 하단선을 덮는다. `aria-current="page"`.
- 모바일에서도 같은 형태를 유지한다 — 탭이 두 개뿐이라 한 줄에 들어간다.

### Number Balls (시그니처)

앱에서 가장 중요한 시각 요소. 40×40px 원, 5색은 번호 구간으로 고정된다(`getBallClass`와 `.ball-*` 클래스). 숫자는 Ball Number 타이포그래피(20px bold) — 옐로·그레이·그린은 다크 볼 잉크, 블루·레드는 화이트 잉크. 한 티켓 안에서 공 사이 간격은 8px이다. `ticket-grid`가 여섯 개가 한 줄에 들어갈 폭을 보장하므로, 줄바꿈은 344px 미만 화면에서만 일어난다.

- **등장**: 생성할 때마다 투명·55% 크기에서 원래 크기로 160ms(`cubic-bezier(0.22, 1, 0.36, 1)`), 공마다 40ms씩 늦게 시작한다. 생성마다 `generationKey`로 티켓을 다시 마운트해 매번 재생된다. 기록 속 티켓에는 등장 모션이 없다.
- `prefers-reduced-motion`에서는 모션 없이 바로 나타난다.

### Lotto Ticket

- 서피스 배경, 12px 라운드, 패딩 16px, 테두리·그림자 없음.
- 위에 게임 레이블(Label, 뮤트 그레이), 10px 아래에 공 여섯 개가 오름차순으로.

### Pension Ticket

- 컨테이너는 Lotto Ticket과 같다.
- **조 배지**: 코발트 인디고 배경, 화이트 잉크, Number 타이포그래피, 8px 라운드, 패딩 4px 10px, 최소 폭 48px. "3조"처럼 읽힌다.
- **숫자 칸**: 여섯 칸, 각 32×40px, 레이즈드 패널 배경 + 서브틀 보더, 6px 라운드, 칸 사이 6px. 배지와 숫자판 사이 8px.
- **등장**: 공과 같은 모션, 칸마다 35ms씩 늦게 시작.

### History Disclosure

- 생성 결과 바로 아래 한 줄: "✓ 기록에 저장됨 · 이전 기록 N개 ⌄". 저장 표시는 뮤트 그레이 체크 아이콘 + Control 텍스트.
- 기본으로 접혀 있다. 트리거를 누르면 기록 목록이 페이드 + 위에서 4px 미끄러지며 200ms에 열린다(shadcn `Collapsible`, Base UI).
- 이전 기록도 없고 방금 저장한 것도 없으면 아무것도 렌더링하지 않는다.

### History Entry

- 서피스 배경, 12px 라운드, 패딩 16px. 윗줄에 날짜(Label 400, tabular)와 Quiet Delete, 12px 아래에 티켓 그리드.
- 안의 티켓도 서피스 배경이라 항목과 한 면으로 이어진다 — 카드 속 카드처럼 보이지 않게 하는 장치다.

### Fairness Notice

- 본문 맨 위 한 줄: 코발트 인디고 방패 아이콘 + 화이트 잉크 요약("모든 번호 조합이 똑같은 확률로 나옵니다") + Ghost 트리거 '어떻게 뽑나요?'.
- 펼치면 서피스 패널(8px 라운드, 서브틀 보더, 패딩 16px): 항목 제목은 500 화이트 잉크, 설명은 Body 뮤트 그레이, 항목 사이 12px. 맨 아래에 서브틀 보더 구분선과 12px 각주.
- 열림 모션은 History Disclosure와 같다.

## Do's and Don'ts

### Do:

- **Do** 로또 공 5색을 절대 변경하지 않는다. 사용자가 이미 아는 언어다.
- **Do** 옐로·그레이·그린 공에는 다크 볼 잉크를 쓴다. 이 셋 위의 화이트 잉크는 20px에서도 3:1에 못 미친다.
- **Do** 코발트 인디고는 생성 버튼, 연금 조 배지, 공정성 방패 아이콘, 포커스 링에만 쓴다.
- **Do** 새 색 조합은 추가 전에 대비를 계산한다. 텍스트 4.5:1, 아이콘·경계 3:1.
- **Do** 모든 인터랙티브 요소에 `focus-visible-ring`을 적용한다.
- **Do** 바뀌는 모든 수치에 `tabular-nums`를 적용한다.
- **Do** 모든 모션에 `prefers-reduced-motion` 대안을 둔다 — 등장 애니메이션은 끄고, 셰브런 회전과 디스클로저 모션은 `motion-reduce:`로 끈다.
- **Do** 아이콘 전용 버튼과 기호 버튼(−, +, 삭제)에 `aria-label`을 단다.
- **Do** 새 디스클로저·버튼은 `src/components/ui/`의 shadcn `Collapsible`·`Button`으로 만든다. 색은 `--ds-*`를 통해 자동으로 맞는다.
- **Do** 두 복권 탭에 같은 부품을 쓴다. 복권별로 달라지는 것은 티켓 모양과 안내 문구뿐이다.

### Don't:

- **Don't** 금색, 반짝임, 네온, 그라디언트 텍스트, 잭팟 이펙트. 카지노·사행성 게임의 언어다.
- **Don't** 폭 1px을 넘는 컬러 좌측선 장식. 카드 좌측 강조선은 절대 금지.
- **Don't** 공공기관 스타일의 밀집된 격자, 복잡한 양식, 과도한 레이블.
- **Don't** 로또 공 색과 겹치는 채도 있는 브랜드 색을 앱 셸에 추가한다.
- **Don't** 섹션마다 작은 대문자 눈썹 레이블("GENERATOR", "HISTORY")을 단다.
- **Don't** 페이지 로드 시 오케스트레이션 애니메이션. 모션은 사용자가 번호를 뽑거나 무언가를 펼칠 때만.
- **Don't** 따뜻한 크림·샌드·베이지 배경이나 라이트 테마. 이 앱은 다크 전용이다.
- **Don't** 티켓 안에 또 다른 배경색 카드를 넣는다. 연금 숫자 칸이 유일한 표면 속 표면이다.
- **Don't** 헤더에 슬로건형 부제를 붙인다.
- **Don't** 포커스 표시를 Tailwind `ring-*`로 바꾼다. shadcn `ui/button.tsx`를 다시 받으면 `focus-visible-ring`을 다시 적용한다.
- **Don't** 공 숫자를 20px 아래로 줄이거나 코발트 hover를 밝게 만든다. 둘 다 흰 텍스트 대비를 AA 아래로 떨어뜨린다.
