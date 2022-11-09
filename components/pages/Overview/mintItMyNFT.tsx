import { NFTButton } from 'components/Buttons'
import { NFTFrame } from 'components/NFTs'
import { useTranslation } from 'next-i18next'
import type { BaseComponent, MyNFTItem } from 'types'
import { classNames, sortNFTItems } from 'utils'

import { SectionTitle } from './title'

export type MintItMyNFTProps = BaseComponent & {
  myNFTs: MyNFTItem[]
}

export function MintItMyNFT(props: MintItMyNFTProps) {
  const { myNFTs, className } = props
  const { t } = useTranslation('overview')
  const sortedNFTs = sortNFTItems(myNFTs).reverse()

  return (
    <section className={classNames('flex flex-col', className)}>
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={sortedNFTs.length}
      >
        {t('overview.panelMintIt.mintItMyNFT.sectionTitle')}
      </SectionTitle>
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {sortedNFTs.map((nft, index) => (
          <NFTFrame
            key={`${nft.name}-${index}`}
            expired={false}
            hideTime={true}
            {...nft}
          >
            <NFTButton>
              {t('overview.panelMintIt.mintItMyNFT.nftButton')}
            </NFTButton>
          </NFTFrame>
        ))}
      </div>
    </section>
  )
}
