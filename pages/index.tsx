import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
} from 'components/pages/Home'

function Index() {
  return (
    <div className="flex flex-col mt-20 mb-24">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck />
      <SectionUserFeedback />
    </div>
  )
}

export default Index
