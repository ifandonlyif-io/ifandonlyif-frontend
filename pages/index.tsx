import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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

export const getServerSideProps: GetServerSideProps<IndexProperties> = async ({
  locale = 'en-US',
}) => {
  const i18n = await serverSideTranslations(locale, ['common', 'home'])
  const feedbacks = await getFeedbackList()
  const nftProjects = await getNftProjects()
  const projectOptions = convertNftProjectsToSelectMenuOptions(nftProjects)
  return { props: { ...i18n, feedbacks, projectOptions } }
}

export default Index
