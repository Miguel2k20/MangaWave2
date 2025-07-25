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

        res.send(resp.data);
    }
}
