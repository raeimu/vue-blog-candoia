import Color from "color"

export  class GlobalColorDARK {
    //app 背景颜色
    static APP_BACKGROUND_COLOR = Color('#fff')
    //primary color
    static PRIMARY_COLOR = Color('#EA4961')

    //字体颜色
    static PRIMARY_TEXT_COLOR = Color("#303133")
}

export class GlobalColorLIGHT {
    //app 背景颜色
    static APP_BACKGROUND_COLOR = Color('#303030')
    //primary color
    static PRIMARY_COLOR = Color('#EA4961')

    //字体颜色
    static PRIMARY_TEXT_COLOR = Color("#c0c1c2")
}

export const BACKEND_URL = "http://10.153.161.194" 

export const BACKEND_PORT = 8080

export const ARTICLE_API_SERVER = "/article" 

export const ARTICLE_FILTER_BY_LABELS_SERVER = "/articles/byLabel"

export const ARTICLE_CONTENT_SERVER = "/content"

export const CAROUSEL_IMG_SERVER = "/images"
