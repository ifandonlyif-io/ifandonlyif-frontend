import { NeonBorder } from 'components/Decorate'

export function SectionUserFeedback() {
  return (
    <section className="flex flex-row flex-nowrap items-center">
      <NeonBorder color="purple" />
      <div className="flex-1 px-28 -mx-8 shadow-iff-base iff-glass-cyan">
        <h2 className="mt-14 mb-11 text-center text-white heading-2 text-shadow-heading-2-purple">
          USER FEEDBACK
        </h2>
      </div>
      <NeonBorder color="purple" flip />
    </section>
  )
}
