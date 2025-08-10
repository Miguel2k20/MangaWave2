import { promises } from "dns";
import { MangaDexClient } from "../clients/MangaDexClient";

export class MangaDexService {

    private client = new MangaDexClient()

    public async fetchChapterFiltred(mangaId:string, language:string): Promise<Record<string, any>> {
        const { data } = await this.client.fetchChapter(mangaId, language)

        const volumeList: Record<string, any[]> = {}

        data.data.forEach((item: any) => {
            let volume = item.attributes.volume || "Volume não definido"
            if (!volumeList[volume]) {
                volumeList[volume] = []
            }
            volumeList[volume].push(item)
        })

        return {
            ...data,
            data: volumeList
        }
    }
    
    public async getMangaListFiltered(title: string, language: number): Promise<Record<string, any>> {
        const { data } = await this.client.fetchMangaList(title, language)

        const filteredData: Record<string, any> = {}
        data.data.forEach((item: any) => {
            const mangaId = item.id
            const coverArt = item.relationships.find((rel: any) => rel.type === "cover_art")?.attributes?.fileName

            filteredData[mangaId] = {
                type: item.type,
                title: item.attributes.title.en ?? item.attributes.title.ja,
                status: item.attributes.status,
                lenguangesEnsabled: item.attributes.availableTranslatedLanguages,
                coverArt: coverArt ? `${process.env.MANGADEX_IMAGE_URL}/covers/${mangaId}/${coverArt}` : ""
            }
        })

        return {
            ...data,
            data: filteredData
        }
    }

    public async fetchPagesFiltred(mangaId:string):Promise<string[]> {
        const { data } = await this.client.fetchPages(mangaId)
        const urlImages:string[] = []
        const hash = data.chapter.hash

        data.chapter.data.forEach((item:string) => {
            urlImages.push(`${process.env.MANGADEX_IMAGE_URL}/data/${hash}/${item}`)
        });

        return urlImages
    }
}