import Carousel from 'better-react-carousel'
import { useTranslation } from 'next-i18next'

import { NeonBorder } from '@/components/Decorate'
import { UserFeedback } from '@/components/Feedback'
import { type SvgIconProperties, SvgIcons } from '@/components/Icons'
import type { BaseComponent, FeedbackItem } from '@/types'
import { cn } from '@/utils'

type CarouselDotProperties = { isActive: boolean }

function CarouselDot(properties: CarouselDotProperties) {
  const { isActive } = properties
  return (
    <span
      className={cn(
        'box-content inline-block h-2.5 w-2.5 rounded-full',
        !isActive && 'bg-[#BED0FF]',
        isActive && 'border-2 border-solid border-[#B2DAFF] bg-iff-purple'
      )}
    />
  )
}

function ChevronLeftIcon(properties: BaseComponent & SvgIconProperties) {
  return (
    <SvgIcons viewBox="0 0 37 47" fill="none" fontSize={30} {...properties}>
      <g filter="url(#filter0_ddi_2_669)">
        <path
          d="M8.44133 23.5003L13.0586 18.883L23.9414 8L28.5587 12.617L17.6759 23.5003L28.5587 34.383L23.9417 39L13.0589 28.1173L8.44192 23.5003H8.44133Z"
          fill="#B3F1FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddi_2_669"
          x="0.441326"
          y="0"
          width="36.1173"
          height="47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.183333 0 0 0 0 1 0 0 0 0 0.853 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_669"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2_669"
            result="effect2_dropShadow_2_669"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2_669"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.454167 0 0 0 0 0.869 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_2_669"
          />
        </filter>
      </defs>
    </SvgIcons>
  )
}

function ArrowLeft() {
  return (
    <div className="absolute top-1/2 -translate-y-2/4 md:hidden">
      <ChevronLeftIcon />
    </div>
  )
}

function ArrowRight() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-2/4 rotate-180 md:hidden">
      <ChevronLeftIcon />
    </div>
  )
}

export declare type SectionUserFeedbackProperties = {
  feedbacks: FeedbackItem[]
}

export function SectionUserFeedback(properties: SectionUserFeedbackProperties) {
  const { feedbacks } = properties
  const { t } = useTranslation('home')

  return (
    <section className="block flex-row flex-nowrap items-center md:flex">
      <NeonBorder className="hidden md:flex" color="purple" />
      <div className="iff-glass-cyan min-w-0 px-8 pb-7 pt-10 shadow-iff-base md:-mx-8 md:flex-1 md:px-28 md:pt-12">
        <h2 className="heading-4 md:heading-2 text-shadow-heading-4-purple md:text-shadow-heading-2-purple mb-6 text-center uppercase text-white md:mb-10">
          {t('home.sectionUserFeedback.heading')}
        </h2>
        <Carousel
          cols={2}
          rows={1}
          gap={60}
          dot={CarouselDot}
          containerClassName="feedback-carousel-container"
          autoplay={5000}
          responsiveLayout={[{ breakpoint: 1279, cols: 1, rows: 1, gap: 1 }]}
          mobileBreakpoint={0}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          loop
          showDots
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
      <NeonBorder className="hidden md:flex" color="purple" flip />
    </section>
  )
}
