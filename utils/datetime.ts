import { DefaultTimezone } from 'data'
import { DateTime } from 'luxon'

export function formatDatetime(
  seconds: number,
  format: string,
  zone?: string
): string {
  if (!zone) zone = DefaultTimezone.value
  return DateTime.fromSeconds(seconds).setZone(zone).toFormat(format)
}

export function isHistorical(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch > dateTime.toSeconds()
}