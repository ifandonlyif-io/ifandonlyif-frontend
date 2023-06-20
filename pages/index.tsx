import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { checkSiteUri, getFeedbackList, getNftProjects } from '@/backend'
import type { SelectMenuOption } from '@/components/Forms'
import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
  type SectionUserFeedbackProperties,
} from '@/components/pages/Home'
import type { CheckSiteUrlFormData } from '@/types'
import { convertNftProjectsToSelectMenuOptions } from '@/utils'

type IndexProperties = SectionUserFeedbackProperties & {
  projectOptions: SelectMenuOption[]
}

const Index: NextPage<IndexProperties> = (properties: IndexProperties) => {
  const handleSiteCheckPanelSubmit = React.useCallback(
    async (data: CheckSiteUrlFormData) => {
      const url = new URL('/', data.siteUrl)
      const check = await checkSiteUri(url.origin)
      alert(`Check site url: ${check}`)
    },
    []
  )

  const handleProjectOptionChange = React.useCallback(
    (option: SelectMenuOption) => {
      console.debug('handleProjectOptionChange', option)
    },
    []
  )

  return (
    <div className="mb-20 mt-7 flex flex-col md:mb-24 md:mt-20">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck
        projectOptions={properties.projectOptions}
        onSiteCheckPanelSubmit={handleSiteCheckPanelSubmit}
        onProjectOptionChange={handleProjectOptionChange}
      />
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
