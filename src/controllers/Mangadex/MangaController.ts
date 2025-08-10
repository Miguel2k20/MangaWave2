import { Request, Response } from "express"
import { MangaDexService } from "../../services/MangaDexService";

export class MangaController {
    public async handle(req:Request, res:Response) {
        try {
            const { title, language } : {title:string, language:number } = req.body
            const mangaDexService = new MangaDexService()
            res.send(await mangaDexService.getMangaListFiltered(title, language))
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
}
