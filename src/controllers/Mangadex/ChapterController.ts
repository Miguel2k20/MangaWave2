import { Request, Response } from "express";
import { MangaDexService } from "../../services/MangaDexService";

export class ChapterController {
    public async handle(req: Request, res: Response) {
        try {
            const { mangaId, language }  = req.params;
            const mangaDexService = new MangaDexService();
            res.send(await mangaDexService.fetchChapterFiltred(mangaId, language));
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
}
