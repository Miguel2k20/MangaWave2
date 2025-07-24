import { Request, Response } from "express"
import axios from "axios";

export class MangadexApi {
    public async fetchMangasByName(req:Request, res:Response):Promise<Response> {
        try {
            const { title, language } : {title:string, language:number } = req.body
            
            let languageList:Record<number, string> = {
                1:'pt-br',
                2:'en'
            }

            const resp = await axios({
                method: 'GET',
                url: `${process.env.MANGADEX_URL}/manga`,
                params: {
                    title: title ?? '',
                    "limit": 25,
                    // "offset": offset,
                    "includes[]" : "cover_art",
                    "availableTranslatedLanguage[]" : [languageList[language] ?? 'pt-br']
                }
            })

            if(!resp){
                return res.status(400).send('Erro na api externa')
            }

            const originalResponse = resp.data;
            const filteredData = this.filterRelevantData(originalResponse);

            return res.json({
                ...originalResponse,
                data: filteredData
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
    private filterRelevantData(data:ResponseApi) {

        const filteredData: { [key: string]: any } = {}

        data.data.forEach((item:ResponseApiData) => {
            let mangaId = item.id
            const coverArt = item.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName

            filteredData[mangaId] = {
                "type": item.type,
                "title": item.attributes.title.en ?? item.attributes.title.ja,
                "status": item.attributes.status,
                "lenguangesEnsabled": item.attributes.availableTranslatedLanguages,
                "coverArt": coverArt ?  this.buildUrlImage(mangaId, coverArt, '256') : ""
            }
            
        });

        return filteredData
    }
    private buildUrlImage(mangaId:string, coverArtJpg:string, size: "512"|'256'):string {
        return `${process.env.MANGADEX_IMAGE_URL}/covers/${mangaId}/${coverArtJpg}`
    }
}
