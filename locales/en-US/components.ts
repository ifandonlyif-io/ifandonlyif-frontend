export const Components = {
  // SortByTimezone Component
  'component.sortByTimezone.label': 'Sort by',
  'component.sortByTimezone.placeholder': 'Please select',
  'component.sortByTimezone.timezoneOptions.UTC': 'UTC London',
  'component.sortByTimezone.timezoneOptions.UTC+1': 'UTC+1 Berlin',
  'component.sortByTimezone.timezoneOptions.UTC+2': 'UTC+2 Cairo/Kyiv',
  'component.sortByTimezone.timezoneOptions.UTC+3': 'UTC+3 Moscow',
  'component.sortByTimezone.timezoneOptions.UTC+3:30': 'UTC+3:30 Tehran',
  'component.sortByTimezone.timezoneOptions.UTC+4': 'UTC+4 Dubai',
  'component.sortByTimezone.timezoneOptions.UTC+5': 'UTC+5 Karachi',
  'component.sortByTimezone.timezoneOptions.UTC+5:30': 'UTC+5:30 New Delhi',
  'component.sortByTimezone.timezoneOptions.UTC+6': 'UTC+6 Dhaka',
  'component.sortByTimezone.timezoneOptions.UTC+7': 'UTC+7 Bangkok/Jakarta',
  'component.sortByTimezone.timezoneOptions.UTC+8': 'UTC+8 Shanghai/Taipei',
  'component.sortByTimezone.timezoneOptions.UTC+9': 'UTC+9 Tokyo',
  'component.sortByTimezone.timezoneOptions.UTC+10': 'UTC+10 Sydney',
  'component.sortByTimezone.timezoneOptions.UTC+11': 'UTC+11 Magadan',
  'component.sortByTimezone.timezoneOptions.UTC+12': 'UTC+12 Wellington',
  'component.sortByTimezone.timezoneOptions.UTC+13': "UTC+13 Nuku'alofa",
  'component.sortByTimezone.timezoneOptions.UTC+14': 'UTC+14 Kiritimati',
  'component.sortByTimezone.timezoneOptions.UTC-1': 'UTC-1 Azores Island',
  'component.sortByTimezone.timezoneOptions.UTC-2': 'UTC-2 King Edward Point',
  'component.sortByTimezone.timezoneOptions.UTC-3': 'UTC-3 Brasilia',
  'component.sortByTimezone.timezoneOptions.UTC-4': 'UTC-4 New York',
  'component.sortByTimezone.timezoneOptions.UTC-5': 'UTC-5 Toronto',
  'component.sortByTimezone.timezoneOptions.UTC-6': 'UTC-6 Mexico City',
  'component.sortByTimezone.timezoneOptions.UTC-7': 'UTC-7 Los Angeles',
  'component.sortByTimezone.timezoneOptions.UTC-8': 'UTC-8 Vancouver',
  'component.sortByTimezone.timezoneOptions.UTC-9': 'UTC-9 Anchorage',
  'component.sortByTimezone.timezoneOptions.UTC-10': 'UTC-10 Honolulu',
  'component.sortByTimezone.timezoneOptions.UTC-11': 'UTC-11 Midway Atoll',
  'component.sortByTimezone.timezoneOptions.UTC-12': 'UTC-12 Baker Island',
  // NFT Card Component
  'component.nftCard.verified': 'Yes',
  'component.nftCard.unverified': 'No',
  'component.nftCard.date': 'KYC Date',
  'component.nftCard.validity': 'Same holder as KYC wallet address',
  'component.nftCard.history': 'Holder History',
  'component.nftCard.recently': 'Recently 30 days records',
  // NFT Frame Component
  'component.nftFrame.expired': 'Expired',
  'component.nftFrame.hide': 'Hide',
} as const

export type ComponentsTranslation = Readonly<
  Record<keyof typeof Components, string>
>