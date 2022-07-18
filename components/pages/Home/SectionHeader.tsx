import { Button } from 'components/Buttons'
import { IFFCube } from 'components/Logo'

export function SectionHeader() {
  return (
    <section className="mx-auto mb-[70px] flex flex-row flex-nowrap justify-center">
      <div className="mr-[112px] w-[324px]">
        <IFFCube className="!mt-0 scale-125" />
      </div>
      <div className="flex max-w-[684px] flex-col">
        <h1 className="heading-1 text-shadow-heading-1 mb-6 text-white">
          THE BEST WAY TO DO 2FA ON WEB3 ERA
        </h1>
        <h2 className="heading-5 text-shadow-heading-5 mb-8 text-[#D9FFFA]">
          A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
        </h2>
        <Button className="max-w-[280px]" primary size="large">
          JOIN NOW
        </Button>
      </div>
    </section>
  )
}
