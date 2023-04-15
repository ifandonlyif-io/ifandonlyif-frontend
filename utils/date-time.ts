import { DateTime } from 'luxon'

import { DefaultTimezone } from '@/data'

export function formatDateTime(
  seconds: number,
  format: string,
  zone?: string
): string {
  if (!zone) zone = DefaultTimezone.value
  return DateTime.fromSeconds(seconds).setZone(zone).toFormat(format)
}

export function parseISODateTime(dateTime: string): number {
  return DateTime.fromISO(dateTime).toSeconds()
}

export function isHistorical(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch > dateTime.toSeconds()
}
