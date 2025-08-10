import { Request, Response } from "express";
import { MangaDexService } from "../../services/MangaDexService";

export class PagesController {
    public async handle(req: Request, res: Response) {
        const { mangaId }  = req.params;
        const mangaDexService = new MangaDexService()
        res.send(await mangaDexService.fetchPagesFiltred(mangaId))
    }
}
