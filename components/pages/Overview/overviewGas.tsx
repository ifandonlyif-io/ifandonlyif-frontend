import { Card } from 'components/Card'
import Highcharts from 'highcharts'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames, formatDatetime } from 'utils'

export type OverviewGasProps = BaseComponent & {
  priceData: [number, number][]
}

type GasTimeSeriesProps = BaseComponent & {
  data: [number, number][]
}

type GasPriceListItemProps = BaseComponent & {
  epotch: number
  price: number
}

type GasPriceListProps = BaseComponent & {
  data: [number, number][]
}

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HighchartsAccessibility(Highcharts)
}

const defaultChartOptions: Highcharts.Options = {
  chart: { zooming: { type: 'x' } },
  title: { text: 'Avg gas price last 24 hour' },
  xAxis: { type: 'datetime' },
  yAxis: { title: { text: 'Avg Gas Price (Gwei)' } },
  legend: { enabled: false },
  plotOptions: {
    area: {
      lineColor: '#FFB267',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#FBE2A4'],
          [1, '#FFE5BE00'],
        ],
      },
      marker: { radius: 2 },
      lineWidth: 1,
      states: { hover: { lineWidth: 1 } },
      threshold: null,
    },
  },
}

function GasTimeSeries(props: GasTimeSeriesProps) {
  const { className, data } = props
  const [options, setOptions] =
    React.useState<Highcharts.Options>(defaultChartOptions)

  React.useEffect(() => {
    const seriesOption: Highcharts.SeriesOptionsType = {
      type: 'area',
      name: 'Gas Price',
      data,
    }
    setOptions((o) => ({ ...o, series: [seriesOption] }))
  }, [data])

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

function GasPriceListItem(props: GasPriceListItemProps) {
  const { epotch, price } = props
  const date = formatDatetime(epotch / 1000, 'yyyy/L/dd T')
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap justify-between',
        'text-base font-normal text-iff-grey-3 first:text-2xl first:font-bold first:text-iff-text'
      )}
    >
      <div className="flex-1">{date}</div>
      <div>{price}</div>
    </div>
  )
}

function GasPriceList(props: GasPriceListProps) {
  const { data } = props
  return (
    <div className="flex max-h-[200px] flex-col md:max-h-[400px] md:px-7">
      <div
        className={classNames(
          'flex flex-row flex-nowrap justify-between mb-3',
          'text-base font-bold text-iff-text'
        )}
      >
        <div className="flex-1">Date</div>
        <div>Value</div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {data.map(([epotch, price]) => (
          <GasPriceListItem key={epotch} epotch={epotch} price={price} />
        ))}
      </div>
    </div>
  )
}

export function OverviewGas({ className, priceData }: OverviewGasProps) {
  const listData = React.useMemo(
    () => priceData.slice(0, 20).reverse(),
    [priceData]
  )
  return (
    <section className={classNames('w-full', className)}>
      <Card title="GAS PRICE">
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:gap-0 md:py-6">
          <GasTimeSeries className="xl:col-span-2" data={priceData} />
          <GasPriceList data={listData} />
        </div>
      </Card>
    </section>
  )
}
