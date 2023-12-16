/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type {
  CoreNodeViewSpec,
  CoreNodeViewUserOptions,
} from '@prosemirror-adapter/core'
import type { DefineComponent } from 'vue'

import type { VueNodeViewProps } from './vue-node-view-props'

export type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>

export type VueNodeViewSpec = CoreNodeViewSpec<VueNodeViewComponent>

export type VueNodeViewUserOptions =
  CoreNodeViewUserOptions<VueNodeViewComponent>
