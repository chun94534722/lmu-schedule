/*
 * LMU long-race schedule data. Loaded by index.html as a classic script (no fetch on file://).
 * Edit ONLY the object literal below; keep it plain data (strings, numbers, booleans, arrays, objects).
 * No functions, variables, spreads or computed values. Validate after every edit:
 *     node C:\Users\chun8\lmu-schedule\check-data.mjs
 * Unknown keys are rejected by the validator, so a typo shows up as an error.
 *
 * Top level
 *   checkedAt   ISO 8601 with offset ('...Z' or '+09:00'). Last time an agent re-checked the official
 *               sources, even if nothing changed. Must not be in the future. The page warns when it is
 *               older than 36 hours.
 *   changeNote  One short Korean sentence describing what the last update changed ('' if nothing).
 *               Shown under the page header.
 *   recommend   The highlighted "recommended" slot, or null for none.
 *               { series: series id, kstWeekday: 'SUN'..'SAT' (KST weekday), kstTime: 'HH:MM' (KST),
 *                 label: chip text }
 *   seasons     Array of seasons, oldest first. Keep a running season while adding the next one;
 *               weeks that have ended are hidden by the page automatically.
 *   specials    Array of Special Events (team races announced only as a date window).
 *   text        Free text blocks (plain text, no HTML).
 *   sources     Array of { label, url } shown under "출처". url must start with https://.
 *
 * Season
 *   id          Unique short id, e.g. 's13'.
 *   name        Display name, e.g. '시즌 13'. Shown in week headings when there are 2+ seasons,
 *               and always on the timetable heading.
 *   week1Start  ISO 8601 instant when week 1 begins (also the weekly turnover time).
 *   weekCount   Number of weeks in the season (1..20).
 *   shownWeeks  Week numbers (1..weekCount) that get a section on the page. Slots are generated
 *               only for these weeks.
 *   weekFlags   Optional { weekNumber: 'Korean warning sentence' } shown as a yellow line in that week.
 *   series      Array of series (ids unique within the season).
 *
 * Series
 *   id          One of americas, proto, gt3, gmr, weekly, team (these drive the filter buttons;
 *               a new id still renders but has no filter button).
 *   kind        'solo' or 'team'.
 *   name        Full name (Latin font), short: name used in the timetable.
 *   len         Race length in minutes. lead: minutes from session start to race start
 *               (practice/quali), used for the estimated end time.
 *   classes     Car classes, any of hy, gt3, p2, wp2, p3, gmr.
 *   req         Requirements line (SR, licence, subscription).
 *   rule        Optional recurring weekly slots: { UTC weekday 'SUN'..'SAT': [UTC hours 0..23] }.
 *               Hours are UTC, not KST. A series appears in the timetable only if it has a rule.
 *   oneOff      Optional array of extra one-off start instants (ISO 8601 with offset). Combined with
 *               rule when both are present. A series needs rule and/or oneOff.
 *   tracks      { weekNumber: 'track text' }. A slot is shown only in weeks that have a track entry.
 *   note        Optional extra line under the series in each week.
 *   tableNote   Optional short suffix in the timetable row, e.g. '7~8주차'.
 *   weather     Optional in-game weather forecast: { weekNumber: entry }, same key style as tracks.
 *               The week must be 1..weekCount and must also have a tracks entry.
 *               Rule: same series + same week = ONE entry. Every time slot of that series in that week
 *               has the same weather (user-confirmed); weather changes from week to week, so never copy
 *               an entry to another week and never guess. Read it only from the game's Online
 *               Championship "EVENT OVERVIEW" screenshot (Steam F12). Keep entries of past weeks.
 *               Weeks without an entry show '날씨 미확인' on the page.
 *     entry     { observed: 'YYYY-MM-DD'  date the screenshot was taken (KST; not in the future),
 *                 source:   short Korean text, e.g. '게임 이벤트 화면 스크린샷',
 *                 practice: session (optional, omit if the screen lacks it),
 *                 qualifying: session (optional, omit if the screen lacks it),
 *                 race:     session (required),
 *                 note:     optional Korean sentence, e.g. observed track behaviour or
 *                           '아이콘 판독 불확실' }
 *     session   { minutes:  session length shown on the screen as a positive integer ('120M' -> 120),
 *                 icons:    exactly 5 icon names, copied left to right = start to end of the session
 *                           (each icon covers minutes/5 of the session),
 *                 realRoad: optional Real Road (RR) text exactly as shown, e.g. 'Saturated', 'Progressing',
 *                           'Green', 'Low', 'Medium', 'High' (1..24 characters) }
 *     icons     sun = 맑음, partly = 구름 조금, cloudy = 흐림, overcast = 짙은 흐림,
 *               lightrain = 약한 비, rain = 비, heavyrain = 강한 비, storm = 뇌우.
 *               No other names are accepted. The page derives the wet part of the race from these.
 *     example   weather: { 5: { observed: '2026-11-08', source: '게임 이벤트 화면 스크린샷',
 *                 practice: { minutes: 3, icons: ['sun','sun','partly','partly','partly'], realRoad: 'Saturated' },
 *                 race: { minutes: 120, icons: ['partly','partly','lightrain','cloudy','partly'], realRoad: 'Progressing' } } }
 *
 * Special
 *   title       Event name. start/end: 'YYYY-MM-DD' calendar dates (start <= end).
 *   classes     Car classes (same set as above).
 *   note        Optional line under the date window.
 *   badge       Optional status chip text. Omitted -> '슬롯 미공개'; '' -> no chip.
 *   A special is placed in the shown week containing (start 12:00 UTC); otherwise it goes to a
 *   trailing "<month> · 스페셜 이벤트" section after the last week.
 *
 * text
 *   planLede      Paragraphs under "주차별 계획" (items 2 and 4 explain the page UI; keep them).
 *   timetableLine Sentence under the timetable.
 *   teamGuide     Paragraphs under "팀 주행 안내".
 *   checks        Bullets under "확인이 필요한 부분".
 *   afterSpecials Line at the end of the trailing specials section ('' for none).
 */
window.LMU_DATA = {
  checkedAt: '2026-11-14T18:00:02+09:00',
  changeNote: '7일이 지난 WEC Weekly 11/6 회차를 지웠습니다.',
  recommend: { series: 'americas', kstWeekday: 'SUN', kstTime: '20:00', label: '기본 추천' },

  seasons: [
    {
      id: 's13',
      name: '시즌 13',
      week1Start: '2026-10-06T06:00:00Z',
      weekCount: 8,
      shownWeeks: [5, 6, 7, 8],
      weekFlags: { 6: '11/14 팀 챔피언십과 8시간 바레인이 같은 주말입니다.' },
      series: [
        {
          id: 'americas', kind: 'solo', name: 'Americas Endurance Series', short: 'Americas', len: 120, lead: 17,
          classes: ['hy', 'gt3'], req: 'SR Platinum 1 · RaceControl Pro/Pro+',
          rule: { THU: [8, 11, 14, 16, 18, 20, 22], SUN: [8, 11, 14, 16, 18, 20, 22], FRI: [0, 3], MON: [0, 3] },
          tracks: { 5: '르망', 6: '데이토나', 7: '롱비치', 8: '로드 애틀랜타' },
          weather: {
            5: {
              observed: '2026-11-08',
              source: '게임 이벤트 화면 스크린샷',
              practice: { minutes: 3, icons: ['sun', 'sun', 'partly', 'partly', 'partly'], realRoad: 'Saturated' },
              qualifying: { minutes: 12, icons: ['partly', 'partly', 'partly', 'partly', 'partly'], realRoad: 'Progressing' },
              race: { minutes: 120, icons: ['partly', 'partly', 'lightrain', 'cloudy', 'partly'], realRoad: 'Progressing' },
              note: '같은 주 다른 레이스 화면 기준: 30분 12초에 DAMP, 38분 무렵 WET(젖음 40%, 강수 14.7%, 전원 웻), 71분 무렵 비 그치고 DAMP(젖음 12.5%)였습니다. 예보 칸(48~72분)보다 비가 약 18분 일찍 왔습니다.'
            }
          }
        },
        {
          id: 'proto', kind: 'solo', name: 'Prototype Challenge', short: 'Prototype', len: 100, lead: 17,
          classes: ['p2', 'p3'], req: 'SR Gold 1 · RaceControl Pro/Pro+',
          rule: { WED: [8, 11, 14, 16, 18, 20, 22], MON: [8, 11, 14, 16, 18, 20, 22], THU: [0, 3], TUE: [0, 3] },
          tracks: { 5: '포르티망', 6: '로드 애틀랜타', 7: '이몰라', 8: '실버스톤' }
        },
        {
          id: 'gt3', kind: 'solo', name: 'LMGT3 Sprint Trophy', short: 'LMGT3', len: 80, lead: 17,
          classes: ['gt3'], req: 'SR Silver 1 · RaceControl Pro/Pro+',
          rule: {
            TUE: [8, 11, 14, 16, 18, 20, 22], FRI: [8, 11, 14, 16, 18, 20, 22], SUN: [8, 11, 14, 16, 18, 20, 22],
            WED: [0, 3], SAT: [0, 3], MON: [0, 3]
          },
          tracks: { 5: '스파 (Endurance)', 6: '롱비치', 7: '로드 애틀랜타', 8: '데이토나' }
        },
        {
          id: 'gmr', kind: 'solo', name: 'GMR Esports Series Qualifiers', short: 'GMR', len: 85, lead: 15,
          classes: ['gmr'], req: 'SR Bronze 3 · 누구나 무료', tableNote: '7~8주차',
          rule: { WED: [3, 8, 11, 14, 18, 20], SAT: [3, 8, 11, 14, 18, 20] },
          tracks: { 7: '스파-프랑코샹', 8: '르망' }
        },
        {
          id: 'weekly', kind: 'solo', name: 'WEC Weekly', short: 'WEC Weekly', len: 90, lead: 15,
          classes: ['hy', 'gt3'], req: '구독 불필요(공식 안내) · 슬롯 출처 lmu.tools(서드파티)',
          note: '이후 회차는 아직 알 수 없습니다. 게임 안 일정에서 확인해 주세요.',
          oneOff: [
            '2026-11-08T11:00:00Z', '2026-11-08T13:00:00Z', '2026-11-08T15:00:00Z',
            '2026-11-09T11:00:00Z', '2026-11-09T13:00:00Z', '2026-11-09T15:00:00Z',
            '2026-11-11T11:00:00Z', '2026-11-11T13:00:00Z', '2026-11-11T15:00:00Z',
            '2026-11-12T09:00:00Z', '2026-11-12T11:00:00Z', '2026-11-12T13:00:00Z', '2026-11-12T15:00:00Z',
            '2026-11-16T01:00:00Z', '2026-11-16T03:00:00Z', '2026-11-16T05:00:00Z'
          ],
          tracks: { 5: '폴 리카르', 6: '이몰라 (ELMS)' }
        },
        {
          id: 'team', kind: 'team', name: 'Team Championship: WEC', short: '팀 챔피언십', len: 360, lead: 22,
          classes: ['hy', 'gt3'],
          req: '라인업 Bronze 3 SR · 드라이버별 B2 이상 · Rookie/Warning 배지 불가 · RaceControl Pro/Pro+',
          tableNote: '6·8주차',
          rule: { SAT: [3, 12, 19] },
          tracks: { 6: '6시간 폴 리카르', 8: '6시간 데이토나' }
        }
      ]
    }
  ],

  specials: [
    { title: '8시간 바레인', start: '2026-11-13', end: '2026-11-15', classes: ['hy', 'gt3'],
      note: '공식 캘린더(2026-10-15) 기준 금~일 진행', badge: '슬롯 미공개' },
    { title: '6시간 몬차', start: '2026-11-20', end: '2026-11-22', classes: ['hy', 'gt3'],
      note: '공식 캘린더(2026-10-15) 기준 금~일 진행', badge: '슬롯 미공개' },
    { title: '6시간 실버스톤', start: '2026-12-04', end: '2026-12-06', classes: ['hy', 'gt3'],
      note: '공식 캘린더(2026-10-15) 기준 금~일 진행', badge: '슬롯 미공개' },
    { title: '6시간 (서킷 미정)', start: '2026-12-18', end: '2026-12-20', classes: ['hy', 'wp2', 'gt3'],
      note: '공식 캘린더(2026-10-15) 기준 금~일 진행', badge: '슬롯 미공개' }
  ],

  text: {
    planLede: [
      '기본 추천은 Americas 일요일 20:00입니다. 11/1 일요일 20:00 세브링 120분 기록과 같은 슬롯입니다.',
      '칩의 ~시각은 추정 종료이고, +1은 다음 날입니다. 굵은 테두리는 다음 솔로 출발입니다.',
      'GMR은 5~6주차에 45분이라 85분인 7~8주차만 넣었습니다.',
      'LMGT3를 켜 두면 Americas처럼 LMGT3가 함께 달리는 레이스는 그 시리즈를 꺼도 계속 보입니다.'
    ],
    timetableLine: '토요일 저녁에 쓸 수 있는 솔로 슬롯은 7~8주차 GMR뿐이고, 일요일 저녁에는 LMGT3와 Americas가 함께 열립니다.',
    teamGuide: [
      'Special Event는 2025년 11월 공지 기준 최소 2명, 최대 6명(엔지니어 포함)이고 솔로 참가가 불가합니다.',
      '2026년 규칙은 게임 안 RaceControl 대시보드에서 확인해야 합니다.'
    ],
    checks: [
      '스페셜 이벤트 슬롯은 공식 공지 전이므로 게임 안에서 확인해야 합니다. 서드파티 lmu.tools는 11/14에도 8시간 바레인 슬롯을 12:00·17:00·22:00 UTC로 표시했습니다(11/13에는 금요일, 11/12에는 02:00·09:00·12:00 UTC). 공식 발표가 아니라서 반영하지 않았습니다.',
      '주차 전환 시각은 시즌 13 시작 시각(06:00 UTC)으로 계산했습니다. 예전 공식 안내는 화요일 12:00 UTC였으므로 화요일 17:00·20:00 KST 슬롯의 서킷을 게임에서 확인해 주세요.',
      '서드파티 lmu.tools는 11/14 확인 때도 6시간 몬차를 빠뜨렸고, 11/14 팀 챔피언십(6시간 폴 리카르) 슬롯도 표시하지 않았습니다. 11/13~14에는 Americas 일요일 슬롯을 05:00·08:00·11:00 UTC로 표시했지만 공식 공지는 일요일 08·11·14·16·18·20·22시, 월요일 00·03시 UTC입니다(11/12에는 목요일 슬롯도 공식과 달랐습니다). 공식 공지를 따랐고, 게임 안 일정이 우선입니다.',
      '종료 시각은 추정치입니다. 세션 시작에 Americas·Prototype·LMGT3는 17분, GMR·WEC Weekly는 15분, 팀 챔피언십은 22분을 더하고 레이스 길이를 합했습니다.'
    ],
    afterSpecials: '2026-11-14 기준으로 시즌 14 공지는 찾지 못했습니다.'
  },

  sources: [
    { label: '시즌 13 온라인 챔피언십 공지', url: 'https://lemansultimate.com/season-13-online-championships-are-live/' },
    { label: '스페셜 이벤트 캘린더 2026 Q3·Q4', url: 'https://lemansultimate.com/special-events-calendar-q3-4-2026/' },
    { label: '드라이버 스왑과 팀 레이스 안내', url: 'https://lemansultimate.com/driver-swap-and-team-races-everything-you-need-to-know/' },
    { label: '온라인 챔피언십 안내', url: 'https://lemansultimate.com/online-championships/' },
    { label: 'lmu.tools 일정(서드파티)', url: 'https://lmu.tools/schedule' }
  ]
};
