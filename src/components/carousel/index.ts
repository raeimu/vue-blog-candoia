import { withInstall } from '../../utils/core'
import carousel from './src/CCarousel.vue'
import carouselItem from './src/CCarouselItem.vue'

export const CCarousel = withInstall<typeof carousel>(carousel)

export const CCarouselItem = withInstall<typeof carouselItem>(carouselItem)
