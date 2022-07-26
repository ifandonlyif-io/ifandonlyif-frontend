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
    <div className="mt-7 mb-20 flex flex-col md:mb-24 md:mt-20">
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
