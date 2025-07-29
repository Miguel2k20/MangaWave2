import { Request, Response } from "express";
import axios from "axios";

export class ChapterController {
    
    public async handle(req: Request, res: Response) {
        const { mangaId, language }  = req.params;

        const resp = await axios({
            method: 'GET',
            url: `${process.env.MANGADEX_URL}/manga/${mangaId}/feed`,
            params: {
                "translatedLanguage[]": [language],
                "order[volume]": "asc",
                "order[chapter]": "asc",
                "limit": 50,
            }
        });

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
