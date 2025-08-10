import { Request, Response } from "express";
import { MangaDexService } from "../../services/MangaDexService";

export class PagesController {

    public async handle(req: Request, res: Response) {
        const { mangaId }  = req.params;
        
        const mangaDexService = new MangaDexService
        const resp = await mangaDexService.fetchPages(mangaId)
        
        if(!resp){
            throw res.status(400).send('Erro na api externa')
        }
        
        const origianlResponse = resp.data
        const finalResponse = this.buildUrlImages(origianlResponse.chapter.data, origianlResponse.chapter.hash)

        res.send(finalResponse)
    }

    private buildUrlImages(pageList:string[], hash:string) {
        const urlImages:string[] = []
       
        pageList.forEach(item => {
            urlImages.push(`${process.env.MANGADEX_IMAGE_URL}/data/${hash}/${item}`)
        });

        return urlImages
    }

}
