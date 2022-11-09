import { Button } from 'components/Buttons'
import { IFFCube } from 'components/Logo'
import { useTranslation } from 'next-i18next'

export function SectionHeader() {
  const { t } = useTranslation('home')

  return (
    <section className="mx-auto mb-7 flex flex-col md:mb-[70px] md:flex-row md:flex-nowrap md:justify-center">
      <div className="mr-[112px] hidden w-[324px] md:block">
        <IFFCube className="!mt-0 scale-125" />
      </div>
      <div className="flex max-w-[298px] flex-col md:max-w-[684px]">
        <h1 className="heading-4 md:heading-1 text-shadow-heading-1 mb-4 text-white md:mb-6">
          {t('home.sectionHeader.heading')}
        </h1>
        <h2 className="subtitle-2 md:heading-5 text-shadow-subtitle-2 md:text-shadow-heading-5 mb-8 text-[#D9FFFA]">
          {t('home.sectionHeader.subheading')}
        </h2>
        <Button
          className="mx-auto max-w-[174px] md:max-w-[280px]"
          primary
          size="large"
        >
          {t('home.sectionHeader.joinButton')}
        </Button>
      </div>
    </section>
  )
}
