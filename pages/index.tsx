import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'

import { getFeedbackList, getIffNftMeta, getNftProjects } from '@/backend'
import type { SelectMenuOption } from '@/components/Forms'
import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  type SectionSiteDataProperties,
  SectionUserFeedback,
  type SectionUserFeedbackProperties,
} from '@/components/pages/Home'
import { getLocaleProps } from '@/locales'
import { convertNftProjectsToSelectMenuOptions } from '@/utils'

type IndexProperties = SectionUserFeedbackProperties &
  SectionSiteDataProperties & {
    projectOptions: SelectMenuOption[]
  }

const Index: NextPage<IndexProperties> = (properties: IndexProperties) => {
  const { iffNftMeta, feedbacks, projectOptions } = properties

  return (
    <div className="mb-20 mt-7 flex flex-col md:mb-24 md:mt-20">
      <SectionHeader />
      <SectionSiteData iffNftMeta={iffNftMeta} />
      <SectionNFTCheck projectOptions={projectOptions} />
      <SectionUserFeedback feedbacks={feedbacks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProperties> =
  getLocaleProps(async () => {
    const feedbacks = await getFeedbackList()
    const nftProjects = await getNftProjects()
    const projectOptions = convertNftProjectsToSelectMenuOptions(nftProjects)
    const iffNftMeta = await getIffNftMeta()
    return { props: { iffNftMeta, feedbacks, projectOptions } }
  })

export default Index
