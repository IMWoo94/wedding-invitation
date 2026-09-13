export type Person = {
  name: string
  fullName: string
  role: 'groom' | 'bride'
}

export type ContactPerson = {
  side: 'groom' | 'bride'
  relation: string
  name: string
  phone: string
}

export type AccountEntry = {
  side: 'groom' | 'bride'
  relation: string
  bank: string
  holder: string
  number: string
  tossBank?: string
}

// Sensitive values (phones, bank accounts) are never committed to the repo.
// They are injected at build time from the GitHub Actions secret VITE_SENSITIVE_JSON:
// {
//   "contacts": [
//     {"side":"groom","relation":"신랑","name":"이상민","phone":"010-0000-0000"},
//     {"side":"groom","relation":"아버지","name":"이OO","phone":"010-0000-0000"}
//   ],
//   "accounts": [
//     {"side":"groom","relation":"신랑","bank":"카카오뱅크","holder":"이상민","number":"0000-00-0000000"}
//   ]
// }
// Entries render in registration order. Legacy keys groomPhone/bridePhone are
// still honored as a single contact per side when "contacts" is absent.
type SensitivePayload = {
  groomPhone?: string
  bridePhone?: string
  contacts?: Array<{
    side: 'groom' | 'bride'
    relation?: string
    name: string
    phone: string
  }>
  accounts?: Array<{
    side: 'groom' | 'bride'
    relation?: string
    bank: string
    holder: string
    number: string
    // Bank name as Toss recognizes it (e.g. "대구은행" for an iM뱅크 account).
    // When present, the account row shows a Toss transfer button.
    tossBank?: string
  }>
}

function readSensitivePayload(): SensitivePayload {
  const raw = (import.meta.env.VITE_SENSITIVE_JSON as string | undefined)?.trim()
  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as SensitivePayload
  } catch {
    return {}
  }
}

const sensitive = readSensitivePayload()

const coupleNames = {
  groom: '이상민',
  bride: '백누리',
} as const

function contactsFor(side: 'groom' | 'bride'): ContactPerson[] {
  const roleLabel = side === 'groom' ? '신랑' : '신부'
  const listed = (sensitive.contacts ?? [])
    .filter((contact) => contact.side === side && contact.name && contact.phone)
    .map((contact) => ({
      side,
      relation: contact.relation || roleLabel,
      name: contact.name,
      phone: contact.phone,
    }))

  if (listed.length) {
    return listed
  }

  const legacyPhone = side === 'groom' ? sensitive.groomPhone : sensitive.bridePhone
  return legacyPhone
    ? [{ side, relation: roleLabel, name: coupleNames[side], phone: legacyPhone }]
    : []
}

function accountsFor(side: 'groom' | 'bride'): AccountEntry[] {
  const roleLabel = side === 'groom' ? '신랑' : '신부'
  return (sensitive.accounts ?? [])
    .filter((account) => account.side === side && account.bank && account.number)
    .map((account) => ({
      side,
      relation: account.relation || roleLabel,
      bank: account.bank,
      holder: account.holder,
      number: account.number,
      tossBank: account.tossBank,
    }))
}

export const invitation = {
  meta: {
    title: '누리 ❤︎ 상민 결혼합니다',
    description: '서로 다른 길을 걷던 두 사람이, 같은 방향을 바라보기로 했습니다.',
  },
  couple: {
    groom: {
      role: 'groom',
      name: '상민',
      fullName: '이상민',
    } satisfies Person,
    bride: {
      role: 'bride',
      name: '누리',
      fullName: '백누리',
    } satisfies Person,
  },
  contacts: {
    groom: contactsFor('groom'),
    bride: contactsFor('bride'),
  },
  event: {
    dateText: '2027.01.31',
    timeText: '일요일 오후 2시 30분',
    venueName: 'M스타하우스웨딩&컨벤션',
    venueHall: '2층 모닝스타홀',
    venueAddress: '대구 동구 동촌로 316',
    transitText: '1호선 방촌역 3번 출구 도보 5분',
    venueMapImage: 'mstarhouse-map.png',
    mapLinks: {
      naver: 'https://map.naver.com/p/entry/place/19550872?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202605091637&locale=ko&svcName=map_pcv5',
      kakao: 'https://map.kakao.com/link/search/M%EC%8A%A4%ED%83%80%ED%95%98%EC%9A%B0%EC%8A%A4%EC%9B%A8%EB%94%A9',
      google: 'https://www.google.com/maps/search/?api=1&query=M%EC%8A%A4%ED%83%80%ED%95%98%EC%9A%B0%EC%8A%A4%EC%9B%A8%EB%94%A9%26%EC%BB%A8%EB%B2%A4%EC%85%98%20%EB%8C%80%EA%B5%AC%20%EB%8F%99%EA%B5%AC%20%EB%8F%99%EC%B4%8C%EB%A1%9C%20316',
    },
  },
  message: {
    body: '손으로 세상에\n도움을 주고픈 사람과\n\n코드로 꿈꾸는 세상을\n만들고 싶은 사람이 만났습니다.\n\n매일이 조금씩 다르지만,\n함께라서 더 단단해지는\n하루를 알게 되었습니다.\n\n그 시작을\n가장 가까운 분들과 나누고 싶습니다.\n\n귀한 걸음으로 축하해주시면\n더없는 기쁨이겠습니다.',
  },
  gallery: {
    note: '사진은 자동 슬라이드로 천천히 넘어갑니다.',
    items: ['Photo 01', 'Photo 02', 'Photo 03', 'Photo 04'],
  },
  accounts: {
    groom: accountsFor('groom'),
    bride: accountsFor('bride'),
  },
} as const
