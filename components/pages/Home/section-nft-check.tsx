import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { checkBlocklistInfo, checkSiteUriExists } from '@/backend'
import { Button } from '@/components/Buttons'
import { NeonBorder } from '@/components/Decorate'
import {
  Input,
  type SelectMenuOption,
  SelectMenus,
  Textarea,
} from '@/components/Forms'
import { CheckModal } from '@/components/Modal'
import { TabPanel, TabSwitchers } from '@/components/Tabs'
import type { BaseComponent, CheckSiteUrlFormData } from '@/types'
import {
  cn,
  parseUrl,
  validateStringIsUrl,
  validateUrlIsHttp,
  validateUrlNotContainUserInfo,
} from '@/utils'

function CheckPanel(properties: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = properties
  return (
    <div
      className={cn(
        'mx-0.5 min-h-[294px] rounded-b-xl bg-[#00183C]/50 px-5 py-10 backdrop-blur-[54px] md:min-h-[324px] md:px-32 md:py-12',
        className
      )}
    >
      {children}
    </div>
  )
}

type HolderCheckPanelProperties = {
  projectOptions: SelectMenuOption[]
  onProjectOptionChange: (option: SelectMenuOption) => void
}

function HolderCheckPanel(properties: HolderCheckPanelProperties) {
  const { projectOptions, onProjectOptionChange } = properties
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

const schema = z.object({
  siteUrl: z
    .string()
    .url()
    .refine(validateStringIsUrl, 'invalid_string')
    // TODO: optimize below validation
    .refine((value) => {
      const isUrl = validateStringIsUrl(value)
      if (!isUrl) return false
      const url = new URL('/', value)
      return validateUrlIsHttp(url)
    }, 'notHttp')
    .refine((value) => {
      const isUrl = validateStringIsUrl(value)
      if (!isUrl) return false
      const url = new URL('/', value)
      return validateUrlNotContainUserInfo(url)
    }, 'containUserinfo'),
})

function SiteCheckPanel() {
  const { t } = useTranslation('home', {
    keyPrefix: 'home.sectionNFTCheck.siteCheckPanel.checkPanel',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckSiteUrlFormData>({
    resolver: zodResolver(schema),
  })

  const textAreaId = React.useId()
  const errorMessage = React.useMemo<string | undefined>(() => {
    if (!errors.siteUrl) return
    if (errors.siteUrl.type === 'invalid_string') return 'invalid_string'
    if (errors.siteUrl.type === 'custom') return errors.siteUrl.message
    return 'invalid_string'
  }, [errors.siteUrl])

  const handleSiteCheckPanelSubmit = React.useCallback<
    SubmitHandler<CheckSiteUrlFormData>
  >(
    async (data) => {
      if (errors.siteUrl) return
      const url = parseUrl(data.siteUrl)
      console.debug('handleSiteCheckPanelSubmit', data.siteUrl, url)

      const check = await checkSiteUriExists(url)
      if (typeof check === 'boolean' && !check) {
        return alert(t('notExists'))
      }

      if (typeof check === 'string') {
        const info = await checkBlocklistInfo(check)
        if (info) return alert(t('isVerified'))
        return alert(t('isUnsafe'))
      }
    },
    [errors.siteUrl, t]
  )

  return (
    <CheckPanel>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleSiteCheckPanelSubmit)}
      >
        <label className="flex flex-col gap-5" htmlFor={textAreaId}>
          <div className="flex flex-nowrap items-center justify-between">
            <h3 className="text-sm font-bold text-white">{t('heading')}</h3>
            {errorMessage && (
              <span className="text-xs text-red-500">{t(errorMessage)}</span>
            )}
          </div>
          <Textarea
            id={textAreaId}
            className="[resize:none]"
            {...register('siteUrl', { required: true })}
          />
        </label>
        <Button type="submit" disabled={!!errors.siteUrl}>
          {t('okButton')}
        </Button>
      </form>
      <CheckModal status="success" isOpen={true} />
    </CheckPanel>
  )
}

type SectionNFTCheckProperties = HolderCheckPanelProperties

export function SectionNFTCheck(properties: SectionNFTCheckProperties) {
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
            <HolderCheckPanel {...properties} />
          </TabPanel>
          <TabPanel>
            <SiteCheckPanel />
          </TabPanel>
        </TabSwitchers>
      </div>
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </section>
  )
}
