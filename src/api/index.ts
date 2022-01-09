import { reactive } from "vue"
import { ARTICLE_API_SERVER, ARTICLE_CONTENT_SERVER, ARTICLE_FILTER_BY_LABELS_SERVER, BACKEND_PORT, BACKEND_URL, CAROUSEL_IMG_SERVER } from "../pro-config"
import { withFunctionalStore } from "../utils/core"

/**
 * @description 文章对象
 */
export class Article {
    id: number = 0
    title: string = ''
    createDate: string = ''
    author: string = ''
    summary: string = ''
    fileType: string = ''
    category: string = ''
    uri: string = ''
    imageUri: string = ''
    labels: { id: number, name: string }[] = []
}

/**
 * @description 简单扩展的文章数组
 */
export class ArticleList extends Array<Article>{
    public page
    private api
    constructor(_api: (page: number, labels?: string[]) => Promise<Article[]>) {
        super()
        this.page = 1
        _api(1).then(e => {
            super.concat(e)
        })
        this.api = _api
    }
    /**
     * @description 使整个数组空
     */
    clear() {
        super.splice(0, super.length - 1)
    }
    /**
     * 改变当前页数
     * @param page 
     */
    async pageChange(page: number) {
        this.page = page
        this.clear()
        super.concat(await this.api(page))
    }
    /**
     * 通过标签过滤
     */
    async LabelsFilter(labels:string[]) {
        this.clear()
        super.concat(await this.api(this.page,labels))
    }
}

/**
 * 后端的url
 */
export const ApiUrl = {
    GET_ARTICLE_LIST: BACKEND_URL + ':' + BACKEND_PORT + ARTICLE_API_SERVER,
    GET_ARTICLE_FILTER_BY_LABELS: BACKEND_URL + ':' + BACKEND_PORT + ARTICLE_FILTER_BY_LABELS_SERVER,
    GET_ARTICLE_CONTENT: BACKEND_URL + ':' + BACKEND_PORT + ARTICLE_CONTENT_SERVER,
    GET_CAROUSEL_IMG: BACKEND_URL + ':' + BACKEND_PORT + CAROUSEL_IMG_SERVER
}

/**
 * @description 根据页数和标签获取资源
 * @param page 页数根据标签获取资源
 * @param labels 
 * @returns 文章列表
 */

export const getArticleList = async (page: number, labels?: string[]) => {

    const url = new URL(ApiUrl.GET_ARTICLE_LIST)

    url.searchParams.append("page", page.toString())
    
    if (labels != null)
        appendAllParams(url, labels, "labels")
    try {
        const resp = await fetch(url.toString())
        if (resp.status != 200)
            throw new Error("服务请求失败！")
        const json = await resp.json()
        return json as Article[]
    } catch (err) {
        throw err
    }
}

/**
 * @description 将数组添加到查询
 * @param url 添加查询的RUL实例
 * @param ps 统一添加的值
 * @param name 统一添加的名称
 */

function appendAllParams(url: URL, ps: string[], name: string) {
    for (const p of ps) {
        url.searchParams.append(name, p)
    }
}


/**
 * 
 * @returns 新的文章数组对象
 */
 function _useArticleList() {
    return reactive(new ArticleList(getArticleList))
}

export const useArticleList =  withFunctionalStore(_useArticleList)
