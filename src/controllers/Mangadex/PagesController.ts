import { Request, Response } from "express";
import axios from "axios";
import { send } from "process";

export class PagesController {

    public async handle(req: Request, res: Response) {
        const { mangaId }  = req.params;

        const resp = await axios({
            method: 'GET',
            url: `${process.env.MANGADEX_URL}/at-home/server/${mangaId}`,
        });

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
