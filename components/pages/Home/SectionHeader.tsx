import { Button } from 'components/Buttons'
import { IFFCube } from 'components/Logo'

export function SectionHeader() {
  return (
    <section className="flex flex-row flex-nowrap justify-center mx-auto mb-[70px]">
      <div className="mr-[112px] w-[324px]">
        <IFFCube className="!mt-0 scale-125" />
      </div>
      <div className="flex flex-col max-w-[684px]">
        <h1 className="mb-6 text-white heading-1 text-shadow-heading-1">
          THE BEST WAY TO DO 2FA ON WEB3 ERA
        </h1>
        <h2 className="mb-8 text-[#D9FFFA] heading-5 text-shadow-heading-5">
          A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
        </h2>
        <Button className="max-w-[280px]" primary size="large">
          JOIN NOW
        </Button>
      </div>
    </section>
  )
}
