import { checkSiteUri, getDemoFeedbackList } from 'backend'
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

type IndexProps = SectionUserFeedbackProps

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  const handleSiteCheckPanelSubmit = React.useCallback(
    async (data: CheckSiteUrlFormData) => {
      const check = await checkSiteUri(data.siteUrl)
      alert(`Check site url: ${check}`)
    },
    []
  )

  return (
    <div className="mt-7 mb-20 flex flex-col md:mb-24 md:mt-20">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck onSiteCheckPanelSubmit={handleSiteCheckPanelSubmit} />
      <SectionUserFeedback feedbacks={props.feedbacks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({
  locale = 'en-US',
}) => {
  const i18n = await serverSideTranslations(locale, ['common', 'home'])
  const feedbacks = await getDemoFeedbackList()
  return { props: { ...i18n, feedbacks } }
}

export default Index
