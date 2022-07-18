import {
  SectionHeader,
  SectionNFTCheck,
  SectionSiteData,
  SectionUserFeedback,
} from 'components/pages/Home'

function Index() {
  return (
    <div className="mt-20 mb-24 flex flex-col">
      <SectionHeader />
      <SectionSiteData />
      <SectionNFTCheck />
      <SectionUserFeedback />
    </div>
  )
}

export default Index
