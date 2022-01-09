import { withInstall } from '../../utils/core'
import Loading from './src/CLoading.vue'
import {createLoading} from './src/createLoading'
import {useLoading} from './src/useLoading'


export {createLoading,useLoading}

export const CLoading = withInstall<typeof Loading>(Loading)