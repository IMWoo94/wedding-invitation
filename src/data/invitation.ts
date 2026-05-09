export type SensitiveText = {
  enabled: boolean
  label: string
  value: string
  placeholder: string
}

export type Person = {
  name: string
  role: 'groom' | 'bride'
  phone: SensitiveText
}

export type AccountInfo = {
  enabled: boolean
  side: 'groom' | 'bride' | 'family'
  label: string
  bank: string
  holder: string
  number: string
  placeholder: string
}

export const invitation = {
  meta: {
    title: 'Wedding Invitation',
    description: '모바일 청첩장',
  },
  couple: {
    groom: {
      role: 'groom',
      name: '신랑',
      phone: {
        enabled: false,
        label: '신랑 연락처',
        value: '',
        placeholder: '필요 시 공개 예정',
      },
    } satisfies Person,
    bride: {
      role: 'bride',
      name: '신부',
      phone: {
        enabled: false,
        label: '신부 연락처',
        value: '',
        placeholder: '필요 시 공개 예정',
      },
    } satisfies Person,
  },
  event: {
    dateText: '2027.01.31',
    timeText: '일요일 오후 2시 30분',
    venueName: 'M스타하우스웨딩&컨벤션',
    venueHall: '2층 모닝스타홀',
    venueAddress: '대구 동구 동촌로 316',
    transitText: '1호선 방촌역 3번 출구 도보 5분',
    mapLinks: {
      naver: 'https://map.naver.com/p/entry/place/19550872?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202605091637&locale=ko&svcName=map_pcv5',
      kakao: 'https://map.kakao.com/link/search/M%EC%8A%A4%ED%83%80%ED%95%98%EC%9A%B0%EC%8A%A4%EC%9B%A8%EB%94%A9%26%EC%BB%A8%EB%B2%A4%EC%85%98',
      google: 'https://www.google.com/maps/search/?api=1&query=M%EC%8A%A4%ED%83%80%ED%95%98%EC%9A%B0%EC%8A%A4%EC%9B%A8%EB%94%A9%26%EC%BB%A8%EB%B2%A4%EC%85%98%20%EB%8C%80%EA%B5%AC%20%EB%8F%99%EA%B5%AC%20%EB%8F%99%EC%B4%8C%EB%A1%9C%20316',
    },
  },
  message: {
    headline: '서로의 오늘이 되어, 함께 내일을 시작합니다.',
    body: '소중한 분들을 모시고 조용하고 따뜻한 시작을 함께 나누고 싶습니다. 아직 일부 세부 정보는 준비 중이며, 확정되는 내용부터 차례로 업데이트하겠습니다.',
  },
  gallery: {
    note: '사진은 자동 슬라이드로 천천히 넘어갑니다.',
    items: ['Photo 01', 'Photo 02', 'Photo 03', 'Photo 04'],
  },
  accounts: [
    {
      enabled: false,
      side: 'groom',
      label: '신랑 측 마음 전하실 곳',
      bank: '',
      holder: '',
      number: '',
      placeholder: '필요 시 공개 예정',
    },
    {
      enabled: false,
      side: 'bride',
      label: '신부 측 마음 전하실 곳',
      bank: '',
      holder: '',
      number: '',
      placeholder: '필요 시 공개 예정',
    },
  ] satisfies AccountInfo[],
} as const
