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
    <div className="flex flex-row flex-nowrap items-center pt-24 pb-14">
      <NeonBorder color="cyan" />
      <div className="iff-glass-cyan -mx-9 flex-1 shadow-iff-base">
        <div className="flex flex-row flex-nowrap justify-between py-7 px-20">
          <div className="flex flex-col">
            <h1 className="heading-2 text-shadow-heading-1 mb-16 text-white">
              CHECK NFT HOLDER
            </h1>
            <div className="mb-6 text-xl font-bold text-white">
              <h3 className="mb-5">NFT PROJECT</h3>
              <p>#797</p>
            </div>
            <Button className="!w-[116px]">BACK</Button>
          </div>
          <div className="flex flex-col rounded-[10px] bg-[#00183C]/50 p-6 backdrop-blur-[54px]">
            <NFTCard {...demoNFTCard} flipBack={flip} />
            <button
              className={classNames(
                'flex z-10 flex-row flex-nowrap justify-center items-cente',
                'mt-4 -mb-2 text-sm font-bold text-iff-cyan'
              )}
              onClick={handleCardFlip}
            >
              <Rotate360Icon />
              <span className="ml-[10px]">Press to flip</span>
            </button>
          </div>
        </div>
      </div>
      <NeonBorder color="cyan" flip />
    </div>
  )
}

export default NFTView
