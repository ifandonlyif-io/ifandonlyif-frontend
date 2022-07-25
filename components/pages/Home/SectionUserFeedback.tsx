import Carousel from 'better-react-carousel'
import { NeonBorder } from 'components/Decorate'
import { UserFeedback } from 'components/Feedback'
import { FeedbackItem } from 'types'
import { classNames } from 'utils'

type CarouselDotProps = { isActive: boolean }

function CarouselDot(props: CarouselDotProps) {
  const { isActive } = props
  return (
    <span
      className={classNames(
        'inline-block box-content h-[10px] w-[10px] rounded-full',
        !isActive && 'bg-[#BED0FF]',
        isActive && 'bg-iff-purple border-[2px] border-solid border-[#B2DAFF]'
      )}
    />
  )
}

export declare type SectionUserFeedbackProps = {
  feedbacks: FeedbackItem[]
}

export function SectionUserFeedback(props: SectionUserFeedbackProps) {
  const { feedbacks } = props
  return (
    <section className="flex flex-row flex-nowrap items-center">
      <NeonBorder color="purple" />
      <div className="iff-glass-cyan -mx-8 flex-1 px-28 pt-12 pb-8 shadow-iff-base">
        <h2 className="heading-2 text-shadow-heading-2-purple mb-10 text-center text-white">
          USER FEEDBACK
        </h2>
        <Carousel
          cols={2}
          rows={2}
          gap={60}
          dot={CarouselDot}
          containerClassName="feedback-carousel-container"
          autoplay={5000}
          loop
          showDots
          hideArrow
        >
          {feedbacks.map((fd, index) => (
            <Carousel.Item key={`${fd.username}-${index}`}>
              <UserFeedback avatarSrc={fd.avatar} username={fd.username}>
                {fd.content}
              </UserFeedback>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <NeonBorder color="purple" flip />
    </section>
  )
}
