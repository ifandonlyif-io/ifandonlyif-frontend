import { Button } from 'components/Buttons'
import { NeonBorder } from 'components/Decorate'
import {
  Input,
  SelectMenuOption,
  SelectMenus,
  Textarea,
} from 'components/Forms'
import { TabPanel, TabSwitchers } from 'components/Tabs'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { BaseComponent, CheckSiteUrlFormData } from 'types'
import { classNames, validateCheckSiteUrlData } from 'utils'

function CheckPanel(props: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = props
  return (
    <div
      className={classNames(
        'bg-[#00183C]/50 backdrop-blur-[54px] rounded-b-[10px] px-5 md:px-32 py-10 md:py-12 min-h-[294px] md:min-h-[324px] mx-0.5',
        className
      )}
    >
      {children}
    </div>
  )
}

type HolderCheckPanelProps = {
  projectOptions: SelectMenuOption[]
  onProjectOptionChange: (option: SelectMenuOption) => void
}

function HolderCheckPanel(props: HolderCheckPanelProps) {
  const { projectOptions, onProjectOptionChange } = props
  const { t } = useTranslation('home', {
    keyPrefix: 'home.sectionNFTCheck.holderCheckPanel',
  })

  return (
    <CheckPanel>
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-bold text-white">
          {t('checkPanel.heading')}
        </h3>
        <SelectMenus
          placeholder={t('selectMenus.placeholder')}
          options={projectOptions}
          onOptionChange={onProjectOptionChange}
        />
        <Input placeholder="#" />
        <Button>{t('checkPanel.okButton')}</Button>
      </div>
    </CheckPanel>
  )
}

type SiteCheckPanelProps = {
  onSiteCheckPanelSubmit: (data: CheckSiteUrlFormData) => Promise<void>
}

function SiteCheckPanel(props: SiteCheckPanelProps) {
  const { onSiteCheckPanelSubmit } = props
  const { t } = useTranslation('home', {
    keyPrefix: 'home.sectionNFTCheck.siteCheckPanel.checkPanel',
  })
  const { register, handleSubmit } = useForm<CheckSiteUrlFormData>()

  const handleSiteCheckPanelSubmit = React.useCallback<
    SubmitHandler<CheckSiteUrlFormData>
  >(
    async (data) => {
      console.debug('handleSiteCheckPanelSubmit', data)
      await onSiteCheckPanelSubmit(data)
    },
    [onSiteCheckPanelSubmit]
  )

  const handleSiteCheckPanelError = React.useCallback<
    SubmitErrorHandler<CheckSiteUrlFormData>
  >(
    (errors) => {
      if (errors.siteUrl && errors.siteUrl.message)
        alert(t(errors.siteUrl.message))
    },
    [t]
  )

  return (
    <CheckPanel>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(
          handleSiteCheckPanelSubmit,
          handleSiteCheckPanelError
        )}
      >
        <label
          className="flex flex-col gap-5"
          htmlFor="check-site-url-textarea"
        >
          <h3 className="text-sm font-bold text-white">{t('heading')}</h3>
          <Textarea
            id="check-site-url-textarea"
            className="[resize:none]"
            {...register('siteUrl', {
              required: true,
              validate: validateCheckSiteUrlData,
            })}
          />
        </label>
        <Button type="submit">{t('okButton')}</Button>
      </form>
    </CheckPanel>
  )
}

type SectionNFTCheckProps = SiteCheckPanelProps & HolderCheckPanelProps

export function SectionNFTCheck(props: SectionNFTCheckProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'home.sectionNFTCheck.tabSwitchers',
  })

  return (
    <section className="mb-16 block flex-row flex-nowrap items-center md:mb-24 md:flex">
      <NeonBorder className="hidden md:flex" color="cyan" />
      <div className="iff-glass-cyan py-7 shadow-iff-base md:-mx-8 md:flex-1 md:py-20">
        <TabSwitchers
          className="mx-4 md:mx-auto"
          switcherText={{ left: t('left'), right: t('right') }}
        >
          <TabPanel>
            <HolderCheckPanel {...props} />
          </TabPanel>
          <TabPanel>
            <SiteCheckPanel {...props} />
          </TabPanel>
        </TabSwitchers>
      </div>
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </section>
  )
}
