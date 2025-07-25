import { Request, Response } from "express"
import axios from "axios";

export class MangaController {
    public async handle(req:Request, res:Response) {
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
                throw res.status(400).send('Erro na api externa')
            }

            const originalResponse = resp.data;
            const filteredData = this.filterRelevantData(originalResponse);

            res.json({
                ...originalResponse,
                data: filteredData
            });
            
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }

    // public async fetchChapters(req:Request, res:Response){
    //     const { mangaId, language }  = req.params;

    //         const resp = await axios({
    //             method: 'GET',
    //             url: `${process.env.MANGADEX_URL}/manga/${mangaId}/feed`,
    //             params: {
    //                 "translatedLanguage[]": [language],
    //                 "order[volume]": "asc",
    //                 "order[chapter]": "asc",
    //                 "limit": 50,
    //             }
    //         })

    //     res.send(resp.data)
    // }

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
