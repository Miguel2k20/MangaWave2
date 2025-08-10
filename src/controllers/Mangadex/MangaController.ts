import { Request, Response } from "express"
import { MangaDexService } from "../../services/MangaDexService";

export class MangaController {
    public async handle(req:Request, res:Response) {
        try {
            const { title, language } : {title:string, language:number } = req.body

            const mangaDexService = new MangaDexService

            const resp = await mangaDexService.fetchMangaList(title,language)

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
