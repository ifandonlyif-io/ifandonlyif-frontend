import type React from 'react'

export declare type BaseComponent<T = unknown> = Pick<
  React.HTMLAttributes<T>,
  'className'
>
