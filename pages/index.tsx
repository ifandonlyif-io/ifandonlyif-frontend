import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'

import { getFeedbackList, getNftProjects } from '@/backend'
import type { SelectMenuOption } from '@/components/Forms'
import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
  type SectionUserFeedbackProperties,
} from '@/components/pages/Home'
import { getLocaleProps } from '@/locales'
import { convertNftProjectsToSelectMenuOptions } from '@/utils'

type IndexProperties = SectionUserFeedbackProperties & {
  projectOptions: SelectMenuOption[]
}

const Index: NextPage<IndexProperties> = (properties: IndexProperties) => {
  return (
    <div className="mb-20 mt-7 flex flex-col md:mb-24 md:mt-20">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck projectOptions={properties.projectOptions} />
      <SectionUserFeedback feedbacks={properties.feedbacks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProperties> =
  getLocaleProps(async () => {
    const feedbacks = await getFeedbackList()
    const nftProjects = await getNftProjects()
    const projectOptions = convertNftProjectsToSelectMenuOptions(nftProjects)
    return { props: { feedbacks, projectOptions } }
  })

export default Index
