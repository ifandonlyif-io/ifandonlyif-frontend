import { $fetch } from 'ohmyfetch'
import { FeedbackItem } from 'types'
import { GetDemoNFTListRes } from 'types/backend'

export async function getDemoNftList() {
  return await $fetch<GetDemoNFTListRes>(
    'http://localhost:3001/api/demo/nftlist'
  )
}

export async function getDemoFeedbackList() {
  return await $fetch<FeedbackItem[]>(
    'http://localhost:3001/api/demo/feedbacklist'
  )
}

export async function getDemoGasPriceData() {
  return await $fetch<[number, number][]>(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json'
  )
}
