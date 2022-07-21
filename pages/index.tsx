import { getDemoFeedbackList } from 'backend'
import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
  SectionUserFeedbackProps,
} from 'components/pages/Home'
import { GetServerSideProps, NextPage } from 'next'

type IndexProps = SectionUserFeedbackProps

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  return (
    <div className="mt-20 mb-24 flex flex-col">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck />
      <SectionUserFeedback feedbacks={props.feedbacks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const feedbacks = await getDemoFeedbackList()
  return { props: { feedbacks } }
}

export default Index
