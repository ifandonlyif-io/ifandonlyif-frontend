import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  checkBlocklistInfo,
  checkSiteUriExists,
  checkSpamContract,
} from '@/backend'
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
import { useFakeNFTCheckOptions } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import {
  cn,
  parseUrl,
  validateStringIsAddress,
  validateStringIsUrl,
  validateUrlIsHttp,
  validateUrlNotContainUserInfo,
} from '@/utils'

function CheckPanel(properties: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = properties
  return (
    <div
      className={cn(
        'mx-0.5 max-h-[330px] min-h-[294px] rounded-b-xl bg-[#00183C]/50 px-5 py-10 backdrop-blur-[54px] md:px-32 md:py-12',
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
        onSubmit={handleSubmit(handleHolderCheckSubmit)}
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
        <div className="text-center text-base font-bold text-iff-text">
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
            'flex flex-row items-center',
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
                className="border-2 border-iff-cyan-dark"
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
              className="max-w-[190px] border-2 border-iff-cyan-dark"
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

interface FakeCheckResultModalProperties
  extends Omit<CheckModalProperties, 'title'> {
  onOpenUrl?: () => void
}

function FakeCheckResultModal(properties: FakeCheckResultModalProperties) {
  const { status, isOpen, onModalClose, onOpenUrl } = properties
  return (
    <CheckModal status={status} isOpen={isOpen} onModalClose={onModalClose}>
      <div className="text-center text-base font-bold text-iff-text">
        {status === 'success' && (
          <React.Fragment>
            <p>This website is trusted.</p>
            <p>Now you can go to open it or check another.</p>
          </React.Fragment>
        )}
        {status === 'error' && (
          <React.Fragment>
            <p>This website is untrusted or unknown.</p>
            <p>Highly recommended you should NOT open it.</p>
          </React.Fragment>
        )}
      </div>
      <div
        className={cn(
          'flex flex-row items-center',
          status === 'success' && 'justify-between gap-2.5',
          status === 'error' && 'justify-center',
        )}
      >
        {status === 'success' && (
          <React.Fragment>
            <Button
              className="border-2 !bg-white"
              size="medium"
              shadow={false}
              onClick={onModalClose}
            >
              Check another
            </Button>
            <Button
              className="border-2 border-iff-cyan-dark"
              size="medium"
              shadow={false}
              onClick={onOpenUrl}
            >
              Open it
            </Button>
          </React.Fragment>
        )}
        {status === 'error' && (
          <Button
            className="max-w-[190px] border-2 border-iff-cyan-dark"
            size="medium"
            shadow={false}
            onClick={onModalClose}
          >
            Close
          </Button>
        )}
      </div>
    </CheckModal>
  )
}

const fakeSiteCheckSchema = z.object({
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
type FakeSiteCheckFormData = z.infer<typeof fakeSiteCheckSchema>
interface FakeSiteCheckFormProperties {
  onSiteCheckSubmit?: (data: FakeSiteCheckFormData) => Promise<void>
}
function FakeSiteCheckForm({ onSiteCheckSubmit }: FakeSiteCheckFormProperties) {
  const t = useScopedI18n('home.sectionNFTCheck.fakeSiteCheckForm')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FakeSiteCheckFormData>({
    resolver: zodResolver(fakeSiteCheckSchema),
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
  const handleSiteCheckSubmit = React.useCallback(
    async (data: FakeSiteCheckFormData) => {
      if (!!errors.siteUrl || !onSiteCheckSubmit) return
      await onSiteCheckSubmit(data)
    },
    [errors.siteUrl, onSiteCheckSubmit],
  )

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleSiteCheckSubmit)}
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
          className="h-16 [resize:none]"
          {...register('siteUrl', { required: true })}
        />
      </label>
      <Button type="submit" disabled={!!errors.siteUrl}>
        {t('okButton')}
      </Button>
    </form>
  )
}

const fakeContractCheckSchema = z.object({
  address: z
    .string()
    .nonempty()
    .refine(validateStringIsAddress, 'invalidAddress'),
})
type FakeContractCheckFormData = z.infer<typeof fakeContractCheckSchema>
interface FakeContractCheckFormProperties {
  onContractCheckSubmit?: (data: FakeContractCheckFormData) => Promise<void>
}
function FakeContractCheckForm({
  onContractCheckSubmit,
}: FakeContractCheckFormProperties) {
  const t = useScopedI18n('home.sectionNFTCheck.fakeContractCheckForm')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FakeContractCheckFormData>({
    resolver: zodResolver(fakeContractCheckSchema),
  })
  const addressInputId = React.useId()
  const errorMessage = React.useMemo<string | undefined>(() => {
    if (!errors.address) return
    const { message } = errors.address
    return t(message as 'required' | 'invalidAddress')
  }, [errors.address, t])
  const handleContractCheckSubmit = React.useCallback(
    async (data: FakeContractCheckFormData) => {
      if (!!errors.address || !onContractCheckSubmit) return
      await onContractCheckSubmit(data)
    },
    [errors.address, onContractCheckSubmit],
  )

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleContractCheckSubmit)}
    >
      <label className="flex flex-col gap-5" htmlFor={addressInputId}>
        <div className="flex flex-nowrap items-center justify-between">
          <h3 className="text-sm font-bold text-white">{t('heading')}</h3>
          {errorMessage && (
            <span className="text-xs text-red-500">{errorMessage}</span>
          )}
        </div>
        <Input
          id={addressInputId}
          placeholder={t('placeholder')}
          {...register('address', { required: true })}
        />
      </label>
      <Button type="submit" disabled={!!errors.address}>
        {t('okButton')}
      </Button>
    </form>
  )
}

function FakeNFTCheckPanel() {
  const t = useScopedI18n('home.sectionNFTCheck.fakeNFTCheckPanel')
  const [checkOptions, selectedCheckOption, handleCheckOptionChange] =
    useFakeNFTCheckOptions()

  const [siteUrl, setSiteUrl] = React.useState<string>()
  const handleSiteCheckSubmit = React.useCallback(
    async (data: FakeSiteCheckFormData) => {
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
        if (!info) {
          setModalStatus('error')
          setModalOpen(true)
          return
        }
        setSiteUrl(url)
        setModalStatus('success')
        setModalOpen(true)
        return
      }
    },
    [],
  )
  const handleContractCheckSubmit = React.useCallback(
    async (data: FakeContractCheckFormData) => {
      console.debug('handleContractCheckSubmit', data.address)
      const check = await checkSpamContract(data.address)
      if (!check) {
        setModalStatus('error')
        setModalOpen(true)
        return
      }
      const url = `https://etherscan.io/address/${data.address}#code`
      setSiteUrl(url)
      setModalStatus('success')
      setModalOpen(true)
      return
    },
    [],
  )

  const [modalStatus, setModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [modalOpen, setModalOpen] = React.useState(false)
  const handleModalClose = React.useCallback(() => {
    setModalOpen(false)
  }, [])
  const handleOpenUrl = React.useCallback(() => {
    if (!siteUrl) return
    window.open(siteUrl, '_blank')
  }, [siteUrl])

  return (
    <CheckPanel>
      <SelectMenus
        className="mb-5"
        placeholder={t('checkOptions.placeholder')}
        options={checkOptions}
        defaultValue={selectedCheckOption}
        onOptionChange={handleCheckOptionChange}
      />
      {selectedCheckOption?.value === 'site' && (
        <FakeSiteCheckForm onSiteCheckSubmit={handleSiteCheckSubmit} />
      )}
      {selectedCheckOption?.value === 'contract' && (
        <FakeContractCheckForm
          onContractCheckSubmit={handleContractCheckSubmit}
        />
      )}
      <FakeCheckResultModal
        status={modalStatus}
        isOpen={modalOpen}
        onModalClose={handleModalClose}
        onOpenUrl={handleOpenUrl}
      />
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
            <FakeNFTCheckPanel />
          </TabPanel>
        </TabSwitchers>
      </div>
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </section>
  )
}
