---
name: 로또 번호 생성기
description: 암호학적으로 안전한 6/45 번호를 조용하고 정확하게 생성하는 도구
colors:
  bg: 'oklch(0.09 0.000 0)'
  surface: 'oklch(0.13 0.000 0)'
  surface-raised: 'oklch(0.17 0.000 0)'
  border: 'oklch(0.21 0.000 0)'
  ink: 'oklch(0.95 0.000 0)'
  ink-muted: 'oklch(0.68 0.000 0)'
  primary: 'oklch(0.55 0.105 230)'
  primary-hover: 'oklch(0.61 0.105 230)'
  destructive: 'oklch(0.65 0.18 25)'
  ball-yellow: 'oklch(0.852 0.199 100)'
  ball-blue: 'oklch(0.623 0.214 259)'
  ball-red: 'oklch(0.626 0.258 29)'
  ball-gray: 'oklch(0.704 0.015 252)'
  ball-green: 'oklch(0.723 0.219 149)'
typography:
  display:
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  title:
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1
  number:
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1
    fontFeature: '"tnum"'
rounded:
  sm: '6px'
  md: '8px'
  lg: '12px'
  full: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '10px 24px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '10px 24px'
  button-destructive:
    backgroundColor: 'transparent'
    textColor: '{colors.destructive}'
    rounded: '{rounded.sm}'
    padding: '4px 8px'
  card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
---

# Design System: 로또 번호 생성기

## 1. Overview

**Creative North Star: "The Midnight Terminal"**

한밤의 로또 판매점 끝자리 터미널. 형광등이 꺼지고 남겨진 추첨기 앞, 어두운 화면 위에 다섯 가지 색의 번호 공이 보석처럼 점등된다. 이 시스템은 그 순간의 고요한 정확함을 포착한다. 화려함이 아니라 신뢰감, 반짝임이 아니라 집중.

UI 표면은 의도적으로 어둡고 중립적이다. 코발트 인디고가 주요 행동 요소 하나를 지시하고, 나머지 표면은 로또 공 다섯 색상이 가장 선명하게 빛나도록 비켜선다. Vercel, Linear, Raycast가 보여주는 도구적 정직함 — 인터페이스가 작업 속으로 사라진다. 컴포넌트의 느낌은 정돈하고 직접적인: 한 번에 임바나는 느낌은 없지만, 정확히 작동한다는 확신.

이 시스템이 명시적으로 거부하는 것: 카지노/기능게임의 금색, 반짝임, 네온 합성음, 점프 애니메이션. 그리고 동행복권 사이트 같은 공공기관 스타일의 정보 과부하, 복잡한 양식, 밀집된 격자.

**Key Characteristics:**

- 어두운 무채색 표면 위에 로또 공 5색이 조명처럼 빛남
- 코발트 인디고 1개 액션 색상, 전체 표면의 ≤10%
- Pretendard 단일 패밀리, 무게 대비로만 위계 구성
- 상태에 반응하는 모션 150-250ms, 입장 연출 없음
- 여백이 구역을 구분한다. 카드 테두리는 장식이 아니라 배경 대비

## 2. Colors: The Midnight Palette

어두운 무채색 기반 위에 고정된 5색 볼 팔레트, 단일 코발트 인디고 액션 색.

### Primary

- **코발트 인디고** (`oklch(0.55 0.105 230)`, ≈ #2b6bcf): 주 행동 버튼("번호 생성")과 활성 상태 표시. 표면의 ≤10%. 대비 검증: 흰 텍스트 on 코발트 인디고 ≥4.6:1 (AA 통과).
- **라이트 코발트** (`oklch(0.61 0.105 230)`, hover 상태): 버튼 hover 전용. 다른 용도에 사용하지 않는다.

### Neutral

- **미드나이트 블랙** (`oklch(0.09 0.000 0)`, ≈ #131313): 앱 배경. 무채색. 순수 어둠.
- **다크 서피스** (`oklch(0.13 0.000 0)`, ≈ #1e1e1e): 카드, 티켓 컨테이너, 기록 항목.
- **레이즈드 패널** (`oklch(0.17 0.000 0)`, ≈ #262626): 헤더, 모달 배경 등 한 단계 올라온 표면.
- **서브틀 보더** (`oklch(0.21 0.000 0)`, ≈ #313131): 구분선, 카드 테두리. 눈에 잘 띄지 않아야 한다.
- **화이트 잉크** (`oklch(0.95 0.000 0)`, ≈ #f1f1f1): 주 텍스트. 배경 대비 >15:1 (AAA).
- **뮤트 그레이** (`oklch(0.68 0.000 0)`, ≈ #989898): 날짜, 보조 설명, 게임 레이블, 비활성 탭. 대비는 배경 7.2:1 · 서피스 7.0:1 · 레이즈드 패널 6.6:1 — 12px 레이블과 긴 설명문까지 AA를 여유 있게 넘긴다. 화이트 잉크와는 2.5:1 차이로 위계를 유지한다. (이전 값 `oklch(0.55)`는 레이즈드 패널 위 3.9:1로 AA 미달이었다.)

### Semantic

- **딥 레드** (`oklch(0.65 0.18 25)`, ≈ #d45c4a): "전체 삭제", "삭제" 같은 파괴적 행동의 텍스트 색. 배경이 없는 ghost 버튼에만 사용.

### Lotto Ball Colors (고정 제약, 변경 불가)

- **선라이즈 옐로** (`oklch(0.852 0.199 100)`, ≈ #facc15): 번호 1-10. 텍스트는 어두운 잉크(`oklch(0.20)`).
- **로얄 블루** (`oklch(0.623 0.214 259)`, ≈ #3b82f6): 번호 11-20. 텍스트는 화이트 잉크.
- **크림슨 레드** (`oklch(0.626 0.258 29)`, ≈ #ef4444): 번호 21-30. 텍스트는 화이트 잉크.
- **실버 그레이** (`oklch(0.704 0.015 252)`, ≈ #9ca3af): 번호 31-40. 텍스트는 어두운 잉크(`oklch(0.20)`). 흰 텍스트는 대비 2.6:1로 실패 — 항상 어두운 텍스트.
- **에메랄드 그린** (`oklch(0.723 0.219 149)`, ≈ #22c55e): 번호 41-45. 텍스트는 화이트 잉크.

**The Quiet Stage Rule.** 로또 공 5색은 이 UI의 목소리다. 앱 셸은 그 다섯 색과 경쟁하지 않는다. 코발트 인디고 외에 채도 있는 색을 앱 셸에 추가하지 않는다.

**The Single Voice Rule.** 코발트 인디고는 "번호 생성" 버튼 하나에만 사용한다. 링크, 아이콘, 배지에 분산시키지 않는다. 희귀함이 강조다.

## 3. Typography

**Body Font:** Pretendard (한국어 최적화 휴머니스트 산스세리프), 폴백: `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`

단일 패밀리, 무게 대비로만 위계. 한국어 자소와 로마자 숫자 모두 균일하게 렌더링된다. 기하학적이지 않고 휴머니스트 — 도구적이되 딱딱하지 않다. 스케일 비율: 1.20-1.25 (product 레지스터 기준 tight scale).

### Hierarchy

- **Display** (700, `1.5rem`/24px, lh 1.2, ls -0.01em): 앱 타이틀 "로또 번호 생성기". 페이지 전체에 한 번만.
- **Title** (600, `1.125rem`/18px, lh 1.3): 섹션 헤딩 "생성 기록". 구역의 출발점.
- **Body** (400, `0.9375rem`/15px, lh 1.6): 부제, 설명. 최대 65ch 줄 길이.
- **Label** (500, `0.75rem`/12px, lh 1): 게임 레이블(게임 A, B...), 버튼 텍스트, 날짜, 보조 UI.
- **Number** (700, `0.875rem`/14px, lh 1, `font-variant-numeric: tabular-nums`): 번호 공 내부 숫자. 공의 크기가 동일해 보이도록 tabular 필수.

**The No Uppercase Body Rule.** 레이블과 버튼 텍스트는 소문자 유지. `text-transform: uppercase`는 사용하지 않는다 — 게임 레이블은 "게임 A"이지 "GAME A"가 아니다.

**The Tabular Numbers Rule.** 공 안의 숫자, 게임 수 카운터, 날짜의 모든 수치에 `font-variant-numeric: tabular-nums`를 적용한다. 숫자가 달라져도 레이아웃이 흔들리지 않는다.

## 4. Elevation

이 시스템은 그림자 대신 명도 차이로 깊이를 표현한다. 배경(`oklch(0.09)`)에서 서피스(`oklch(0.13)`)로, 레이즈드 패널(`oklch(0.17)`)로 — 명도가 올라갈수록 한 단계씩 앞에 있다. 그림자는 정적 표면에 없다.

**The Flat-By-Default Rule.** 표면은 정적 상태에서 평평하다. 그림자는 오직 두 가지 용도로만: (1) 키보드 포커스 링, (2) 없음. 버튼에도 그림자 없음.

### Shadow Vocabulary

- **focus-ring**: `0 0 0 2px oklch(0.55 0.105 230 / 0.6)` — 키보드 포커스 상태 전용. 코발트 인디고 60% 불투명 링. 모든 인터랙티브 요소에 적용.

## 5. Components

### Buttons

**정돈하고 직접적인.** 버튼은 작동한다는 확신을 줘야 한다. 장식 없이 명확한 상태 전환.

- **Primary ("번호 생성")**: 코발트 인디고 배경, 화이트 잉크 텍스트, 8px 라운드, `padding: 10px 24px`, Label 타이포그래피
- **Hover**: `oklch(0.61 0.105 230)`, `transition: background 150ms ease-out`
- **Focus**: focus-ring 적용, 기본 outline 제거
- **Disabled**: `opacity: 0.4`, 커서 금지
- **Ghost Destructive ("삭제", "전체 삭제")**: 투명 배경, 딥 레드 텍스트, 6px 라운드, `padding: 4px 8px`. Hover 시 `oklch(0.65 0.18 25 / 0.12)` 배경 틴트

### Stepper Control (게임 수 선택기)

- **Shape**: 32×32px 원형 버튼 (`border-radius: 9999px`)
- **Default**: 투명 배경, `oklch(0.21)` 테두리, `oklch(0.80)` 아이콘/텍스트
- **Hover**: `oklch(0.17)` 배경, `oklch(0.30)` 테두리
- **Disabled**: `opacity: 0.3`, 포인터 없음
- **카운터 표시**: Title 타이포그래피, `min-width: 24px`, center align

### Number Balls (NumberBall)

앱에서 가장 중요한 시각 요소. 40×40px 원. 5개 색상 고정.

- **Yellow (1-10)**: `oklch(0.852 0.199 100)` 배경, `oklch(0.20)` 어두운 텍스트
- **Blue (11-20)**: `oklch(0.623 0.214 259)` 배경, `oklch(0.95)` 흰 텍스트
- **Red (21-30)**: `oklch(0.626 0.258 29)` 배경, `oklch(0.95)` 흰 텍스트
- **Gray (31-40)**: `oklch(0.704 0.015 252)` 배경, `oklch(0.20)` 어두운 텍스트 (흰 텍스트 대비 2.6:1로 실패 — 반드시 어두운 텍스트)
- **Green (41-45)**: `oklch(0.723 0.219 149)` 배경, `oklch(0.95)` 흰 텍스트

### Cards / Containers (LottoTicket, 기록 항목)

- **Corner Style**: 부드럽게 둥근 (12px) — 손에 쥔 실제 티켓을 연상
- **Background**: 다크 서피스 `oklch(0.13 0.000 0)`
- **Shadow**: 없음. 배경과의 명도 차이로 구분
- **Border**: 선택적 — `1px solid oklch(0.21 0.000 0)`. 카드가 배경에 묻힐 때만 사용
- **Internal Padding**: 16px 균일
- **Game Label**: Label 타이포그래피, 뮤트 그레이 색상. 대문자 없음

### Header

- **Background**: 레이즈드 패널 `oklch(0.17 0.000 0)` 또는 배경과 같은 색 + 하단 보더
- **Title**: Display 타이포그래피, 화이트 잉크
- **Subtitle**: Body 타이포그래피, 뮤트 그레이. 기술적 사실("암호학적 난수, 6/45")만 — 슬로건 금지

## 6. Do's and Don'ts

### Do:

- **Do** 로또 공 5색을 절대 변경하지 않는다. 사용자가 이미 아는 언어다.
- **Do** 실버 그레이(31-40) 번호 공에는 어두운 텍스트를 사용한다. 흰 텍스트는 WCAG AA 실패.
- **Do** 코발트 인디고는 "번호 생성" 버튼 하나에만 쓴다. 전체 표면의 ≤10%.
- **Do** 모든 인터랙티브 요소에 focus-ring을 적용한다. 키보드 사용자 포함.
- **Do** 모든 수치에 `font-variant-numeric: tabular-nums`를 적용한다.
- **Do** `prefers-reduced-motion` 대응. transition에 `@media (prefers-reduced-motion: reduce) { transition: none }`.
- **Do** 빈 상태("기록이 없습니다")는 사용자에게 다음 행동을 알려준다. 단순 "없음"으로 끝내지 않는다.
- **Do** `aria-label`을 모든 아이콘 전용 버튼에 적용한다 (감소/증가 버튼 포함).

### Don't:

- **Don't** 금색, 반짝임, 네온, 그라디언트 텍스트. 카지노/기능게임 언어 — 이 앱의 반대 편이다.
- **Don't** `border-left` > 1px 컬러 스트라이프 장식. 카드 좌측 강조선은 절대 금지.
- **Don't** 국가 공공기관 스타일의 밀집된 격자, 복잡한 양식, 과도한 레이블.
- **Don't** 로또 공 색상과 겹치는 채도 있는 브랜드 색상을 추가한다. 앱 셸은 배경이다.
- **Don't** 섹션마다 작은 대문자 눈썹 레이블("GENERATOR", "HISTORY"). 이미 내용이 분명하다.
- **Don't** 페이지 로드 시 오케스트레이션 애니메이션. Product UI는 작업 속으로 들어간다.
- **Don't** 따뜻한 크림/샌드/베이지 배경. 이 앱의 차가운 정확함과 정면 충돌한다.
- **Don't** 중첩 카드. LottoTicket이 이미 카드다 — 그 안에 또 다른 카드 배경을 넣지 않는다.
