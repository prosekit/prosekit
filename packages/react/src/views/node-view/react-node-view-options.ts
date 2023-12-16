/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type {
  CoreNodeViewSpec,
  CoreNodeViewUserOptions,
} from '@prosemirror-adapter/core'
import type { ComponentType } from 'react'

import type { ReactNodeViewProps } from './react-node-view-props'

/**
 * @public
 */
export type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>

export type ReactNodeViewSpec = CoreNodeViewSpec<ReactNodeViewComponent>

export type ReactNodeViewUserOptions =
  CoreNodeViewUserOptions<ReactNodeViewComponent>
