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
    dateText: '2026.00.00',
    timeText: '토요일 오후 0시 00분',
    venueName: '예식장명 입력 예정',
    venueAddress: '주소 입력 예정',
    mapLinks: {
      naver: '',
      kakao: '',
      google: '',
    },
  },
  message: {
    headline: '서로의 오늘이 되어, 함께 내일을 시작합니다.',
    body: '소중한 분들을 모시고 조용하고 따뜻한 시작을 함께 나누고 싶습니다. 아직 세부 정보는 준비 중이며, 확정되는 내용부터 차례로 업데이트하겠습니다.',
  },
  gallery: {
    note: '사진은 추후 WebP로 최적화해서 추가 예정입니다.',
    items: ['Photo 01', 'Photo 02', 'Photo 03'],
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
