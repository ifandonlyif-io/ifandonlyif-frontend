import { checkSiteUri, getDemoFeedbackList, getNftProjects } from 'backend'
import { SelectMenuOption } from 'components/Forms'
import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
  SectionUserFeedbackProps,
} from 'components/pages/Home'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { CheckSiteUrlFormData } from 'types'
import { convertNftProjectsToSelectMenuOptions } from 'utils'

type IndexProps = SectionUserFeedbackProps & {
  projectOptions: SelectMenuOption[]
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
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
    <div className="mt-7 mb-20 flex flex-col md:mb-24 md:mt-20">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck
        projectOptions={props.projectOptions}
        onSiteCheckPanelSubmit={handleSiteCheckPanelSubmit}
        onProjectOptionChange={handleProjectOptionChange}
      />
      <SectionUserFeedback feedbacks={props.feedbacks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({
  locale = 'en-US',
}) => {
  const i18n = await serverSideTranslations(locale, ['common', 'home'])
  const feedbacks = await getDemoFeedbackList()
  const nftProjects = await getNftProjects()
  const projectOptions = convertNftProjectsToSelectMenuOptions(nftProjects)
  return { props: { ...i18n, feedbacks, projectOptions } }
}

export default Index
