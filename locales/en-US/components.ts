import type { DeepString } from '@/types'

export const component = {
  sortByTimezone: {
    label: 'Sort by',
    placeholder: 'Please select',
    timezoneOptions: {
      UTC: 'UTC London',
      'UTC+1': 'UTC+1 Berlin',
      'UTC+2': 'UTC+2 Cairo/Kyiv',
      'UTC+3': 'UTC+3 Moscow',
      'UTC+3:30': 'UTC+3:30 Tehran',
      'UTC+4': 'UTC+4 Dubai',
      'UTC+5': 'UTC+5 Karachi',
      'UTC+5:30': 'UTC+5:30 New Delhi',
      'UTC+6': 'UTC+6 Dhaka',
      'UTC+7': 'UTC+7 Bangkok/Jakarta',
      'UTC+8': 'UTC+8 Shanghai/Taipei',
      'UTC+9': 'UTC+9 Tokyo',
      'UTC+10': 'UTC+10 Sydney',
      'UTC+11': 'UTC+11 Magadan',
      'UTC+12': 'UTC+12 Wellington',
      'UTC+13': "UTC+13 Nuku'alofa",
      'UTC+14': 'UTC+14 Kiritimati',
      'UTC-1': 'UTC-1 Azores Island',
      'UTC-2': 'UTC-2 King Edward Point',
      'UTC-3': 'UTC-3 Brasilia',
      'UTC-4': 'UTC-4 New York',
      'UTC-5': 'UTC-5 Toronto',
      'UTC-6': 'UTC-6 Mexico City',
      'UTC-7': 'UTC-7 Los Angeles',
      'UTC-8': 'UTC-8 Vancouver',
      'UTC-9': 'UTC-9 Anchorage',
      'UTC-10': 'UTC-10 Honolulu',
      'UTC-11': 'UTC-11 Midway Atoll',
      'UTC-12': 'UTC-12 Baker Island',
    },
  },
  nftCard: {
    verified: 'Yes',
    unverified: 'No',
    date: 'KYC Date',
    validity: 'Same holder as KYC wallet address',
    history: 'Holder History',
    recently: 'Recently 30 days records',
  },
  nftFrame: {
    expired: 'Expired',
    hide: 'Hide',
  },
} as const

export type ComponentsTranslation = DeepString<typeof component>
