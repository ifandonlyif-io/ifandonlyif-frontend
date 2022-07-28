import { Button } from 'components/Buttons'
import { NeonBorder } from 'components/Decorate'
import { Rotate360Icon } from 'components/Icons'
import { HolderRecord, NFTCard, NFTCardProps } from 'components/NFTs'
import { NextPage } from 'next'
import React from 'react'
import { classNames } from 'utils'

const holderRecords: HolderRecord[] = [
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]
const demoNFTCard: NFTCardProps = {
  name: 'BORED APE YACHT CLUB',
  nftId: 797,
  nftType: 'ERC-721',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  kycEpoch: 1657864800,
  holderRecords,
  validity: true,
}

const NFTView: NextPage = () => {
  const [flip, setFlip] = React.useState(false)
  const handleCardFlip = React.useCallback(() => setFlip(!flip), [flip])

  return (
    <div className="block flex-row flex-nowrap items-center py-16 md:flex md:py-24">
      <NeonBorder className="hidden md:flex" color="cyan" />
      <div className="iff-glass-cyan shadow-iff-base md:-mx-9 md:flex-1">
        <div className="flex flex-col flex-nowrap px-4 py-6 md:flex-row md:justify-between md:py-7 md:px-20">
          <div className="flex flex-col">
            <h1 className="heading-4 md:heading-2 text-shadow-heading-1 mb-4 text-white md:mb-16">
              CHECK NFT HOLDER
            </h1>
            <div className="text-md mb-5 flex flex-row font-bold text-white md:mb-6 md:flex-col md:text-xl">
              <h3 className="mr-5 md:mb-5">NFT PROJECT</h3>
              <p>#797</p>
            </div>
            <Button className="hidden !w-[116px] md:flex">BACK</Button>
          </div>
          <div className="mb-6 flex flex-col items-center rounded-[10px] bg-[#00183C]/50 p-6 backdrop-blur-[54px] md:mb-0">
            <NFTCard {...demoNFTCard} flipBack={flip} />
            <button
              className={classNames(
                'flex z-10 flex-row flex-nowrap justify-center items-cente',
                'mt-4 -mb-2 text-sm font-bold text-iff-cyan'
              )}
              onClick={handleCardFlip}
            >
              <Rotate360Icon />
              <span className="ml-[10px] hidden md:inline-block">
                Press to flip
              </span>
              <span className="ml-[10px] md:hidden">Tap to flip</span>
            </button>
          </div>
          <Button className="mb-2 ml-auto !w-[116px] md:hidden">BACK</Button>
        </div>
      </div>
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </div>
  )
}

export default NFTView
