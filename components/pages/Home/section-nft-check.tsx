import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
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
import { CheckModal, type CheckModalProperties } from '@/components/Modal'
import { TabPanel, TabSwitchers } from '@/components/Tabs'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
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
        className,
      )}
    >
      {children}
    </div>
  )
}

const holderCheckSchema = z.object({
  projectId: z.string().nonempty(),
  tokenId: z.number().int().positive(),
})
type HolderCheckFormData = z.infer<typeof holderCheckSchema>

interface HolderCheckPanelProperties {
  projectOptions: SelectMenuOption[]
}

function HolderCheckPanel(properties: HolderCheckPanelProperties) {
  const { projectOptions } = properties
  const t = useScopedI18n('home.sectionNFTCheck.holderCheckPanel')

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<HolderCheckFormData>({
    resolver: zodResolver(holderCheckSchema),
  })
  const router = useRouter()

  const tokenIdInputId = React.useId()
  const errorMessage = React.useMemo<string | undefined>(() => {
    if (!errors.projectId && !errors.tokenId) return
    if (errors.projectId) return 'Please select a project.'
    if (errors.tokenId) return 'Please enter a valid token ID.'
    return 'Unknown error.'
  }, [errors.projectId, errors.tokenId])
  const handleProjectOptionChange = React.useCallback(
    (option: SelectMenuOption) => {
      console.debug('handleProjectOptionChange', option)
      setValue('projectId', option.value)
    },
    [setValue],
  )
  const handleHolderCheckSubmit = React.useCallback<
    SubmitHandler<HolderCheckFormData>
  >((data) => {
    console.debug('handleHolderCheckSubmit', data.projectId, data.tokenId)
    setModalStatus('success')
    setModalOpen(true)
  }, [])

  const [modalStatus, setModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [modalOpen, setModalOpen] = React.useState(false)
  const handleModalClose = React.useCallback(() => {
    setModalOpen(false)
  }, [])
  const handleCheckItClick = React.useCallback(() => {
    const values = getValues()
    void router.push(`/nft/${values.tokenId}`)
  }, [getValues, router])

  return (
    <CheckPanel>
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(handleHolderCheckSubmit)(event)
        }}
      >
        <label
          className="flex flex-nowrap items-center justify-between"
          htmlFor={tokenIdInputId}
        >
          <h3 className="text-sm font-bold text-white">{t('heading')}</h3>
          {errorMessage && (
            <span className="text-xs text-red-500">{errorMessage}</span>
          )}
        </label>
        <SelectMenus
          placeholder={t('placeholder')}
          options={projectOptions}
          onOptionChange={handleProjectOptionChange}
        />
        <Input
          id={tokenIdInputId}
          placeholder="#"
          type="number"
          {...register('tokenId', {
            required: true,
            setValueAs: Number,
          })}
        />
        <Button type="submit">{t('okButton')}</Button>
      </form>
      <CheckModal
        status={modalStatus}
        isOpen={modalOpen}
        onModalClose={handleModalClose}
      >
        <div className="mt-10 text-center text-base font-bold text-iff-text">
          {modalStatus === 'success' && (
            <React.Fragment>
              <p>This NFT is yours.</p>
              <p>Now you can go to check it or go back.</p>
            </React.Fragment>
          )}
          {modalStatus === 'error' && (
            <React.Fragment>
              <p>Sorry! It is NOT belong you yet.</p>
              <p>Please wait for a moment or contact NFT holder.</p>
            </React.Fragment>
          )}
        </div>
        <div
          className={cn(
            'mt-10 flex flex-row items-center',
            modalStatus === 'success' && 'justify-between gap-2.5',
            modalStatus === 'error' && 'justify-center',
          )}
        >
          {modalStatus === 'success' && (
            <React.Fragment>
              <Button
                className="border-2 !bg-white"
                size="medium"
                shadow={false}
                onClick={handleModalClose}
              >
                Back
              </Button>
              <Button
                className="border-2 border-[#14D6D6]"
                size="medium"
                shadow={false}
                onClick={handleCheckItClick}
              >
                Check it
              </Button>
            </React.Fragment>
          )}
          {modalStatus === 'error' && (
            <Button
              className="max-w-[190px] border-2 border-[#14D6D6]"
              size="medium"
              shadow={false}
              onClick={handleModalClose}
            >
              Close
            </Button>
          )}
        </div>
      </CheckModal>
    </CheckPanel>
  )
}

const siteCheckSchema = z.object({
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
type SiteCheckFormData = z.infer<typeof siteCheckSchema>

function SiteCheckPanel() {
  const t = useScopedI18n('home.sectionNFTCheck.siteCheckPanel')
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteCheckFormData>({
    resolver: zodResolver(siteCheckSchema),
  })

  const siteUrlTextareaId = React.useId()
  const errorMessage = React.useMemo<string | undefined>(() => {
    if (!errors.siteUrl) return
    const { type, message } = errors.siteUrl
    const invalidString = t('invalid_string')
    if (type === 'invalid_string') return invalidString
    // @ts-expect-error Custom error message
    if (type === 'custom' && message) return t(message)
    return invalidString
  }, [errors.siteUrl, t])
  const handleSiteCheckSubmit = React.useCallback<
    SubmitHandler<SiteCheckFormData>
  >(
    async (data) => {
      if (errors.siteUrl) return
      const url = parseUrl(data.siteUrl)
      console.debug('handleSiteCheckSubmit', data.siteUrl, url)

      const check = await checkSiteUriExists(url)
      if (typeof check === 'boolean' && !check) {
        setModalStatus('error')
        setModalOpen(true)
        return
      }

      if (typeof check === 'string') {
        const info = await checkBlocklistInfo(check)
        if (info) {
          setModalStatus('success')
          setModalOpen(true)
          return
        }
        setModalStatus('error')
        setModalOpen(true)
        return
      }
    },
    [errors.siteUrl],
  )

  const [modalStatus, setModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [modalOpen, setModalOpen] = React.useState(false)
  const handleModalClose = React.useCallback(() => {
    setModalOpen(false)
  }, [])
  const handleOpenUrl = React.useCallback(() => {
    const values = getValues()
    const url = parseUrl(values.siteUrl)
    window.open(url, '_blank')
  }, [getValues])

  return (
    <CheckPanel>
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(handleSiteCheckSubmit)(event)
        }}
      >
        <label className="flex flex-col gap-5" htmlFor={siteUrlTextareaId}>
          <div className="flex flex-nowrap items-center justify-between">
            <h3 className="text-sm font-bold text-white">{t('heading')}</h3>
            {errorMessage && (
              <span className="text-xs text-red-500">{errorMessage}</span>
            )}
          </div>
          <Textarea
            id={siteUrlTextareaId}
            className="[resize:none]"
            {...register('siteUrl', { required: true })}
          />
        </label>
        <Button type="submit" disabled={!!errors.siteUrl}>
          {t('okButton')}
        </Button>
      </form>
      <CheckModal
        status={modalStatus}
        isOpen={modalOpen}
        onModalClose={handleModalClose}
      >
        <div className="mt-10 text-center text-base font-bold text-iff-text">
          {modalStatus === 'success' && (
            <React.Fragment>
              <p>This website is trusted.</p>
              <p>Now you can go to open it or check another.</p>
            </React.Fragment>
          )}
          {modalStatus === 'error' && (
            <React.Fragment>
              <p>This website is untrusted or unknown.</p>
              <p>Highly recommended you should NOT open it.</p>
            </React.Fragment>
          )}
        </div>
        <div
          className={cn(
            'mt-10 flex flex-row items-center',
            modalStatus === 'success' && 'justify-between gap-2.5',
            modalStatus === 'error' && 'justify-center',
          )}
        >
          {modalStatus === 'success' && (
            <React.Fragment>
              <Button
                className="border-2 !bg-white"
                size="medium"
                shadow={false}
                onClick={handleModalClose}
              >
                Check another
              </Button>
              <Button
                className="border-2 border-[#14D6D6]"
                size="medium"
                shadow={false}
                onClick={handleOpenUrl}
              >
                Open it
              </Button>
            </React.Fragment>
          )}
          {modalStatus === 'error' && (
            <Button
              className="max-w-[190px] border-2 border-[#14D6D6]"
              size="medium"
              shadow={false}
              onClick={handleModalClose}
            >
              Close
            </Button>
          )}
        </div>
      </CheckModal>
    </CheckPanel>
  )
}

type SectionNFTCheckProperties = HolderCheckPanelProperties

export function SectionNFTCheck(properties: SectionNFTCheckProperties) {
  const t = useScopedI18n('home.sectionNFTCheck')

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
