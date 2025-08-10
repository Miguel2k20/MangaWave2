import { Request, Response } from "express";
import { MangaDexService } from "../../services/MangaDexService";

export class ChapterController {

    public async handle(req: Request, res: Response) {
        const { mangaId, language }  = req.params;

        const mangaDexService = new MangaDexService
        const resp = await mangaDexService.fetchChapter(mangaId, language)
        const originalResponse = resp.data
        const filtredData = this.filterRelevantData(originalResponse)

        res.json({
            ...originalResponse,
            data: filtredData
        })
    }

    private filterRelevantData(mangalist:ResponseChapterApi){
        const volumeList: Record<string, ChapterData[]> = {}

        mangalist.data.forEach((item) => {
            let volume = item.attributes.volume

            if(!volume) {
                volume = "Volume não definido"
            }

            if (!volumeList[volume]) {
                volumeList[volume] = []
            }

            volumeList[volume].push(item)

        })

        return volumeList
    }
}
