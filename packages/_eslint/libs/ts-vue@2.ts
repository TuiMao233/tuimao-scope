import { mergeWith } from 'lodash'
import { basic } from './configs/basic'
import { typescript } from './configs/typescript'
import { vue2, vueBasic } from './configs/vue'
import { mergeCustomizer } from './utils'

export = mergeWith(basic, typescript, vueBasic, vue2, mergeCustomizer)
