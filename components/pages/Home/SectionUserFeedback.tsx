import { NeonBorder } from 'components/Decorate'
import { FeedbackItem } from 'types'

export declare type SectionUserFeedbackProps = {
  feedbacks: FeedbackItem[]
}

export function SectionUserFeedback(props: SectionUserFeedbackProps) {
  return (
    <section className="flex flex-row flex-nowrap items-center">
      <NeonBorder color="purple" />
      <div className="iff-glass-cyan -mx-8 flex-1 px-28 shadow-iff-base">
        <h2 className="heading-2 text-shadow-heading-2-purple mt-14 mb-11 text-center text-white">
          USER FEEDBACK
        </h2>
      </div>
      <NeonBorder color="purple" flip />
    </section>
  )
}
