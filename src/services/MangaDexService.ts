import axios from "axios";

export class MangaDexService {

    public async fetchChapter(mangaId:string, language:string) {

        return axios({
            method: 'GET',
            url: `${process.env.MANGADEX_URL}/manga/${mangaId}/feed`,
            params: {
                "translatedLanguage[]": [language],
                "order[volume]": "asc",
                "order[chapter]": "asc",
                "limit": 50,
                // "includeUnavailable": 1
            } 
        });
        
    }

    public async fetchMangaList(title:string, language:number) {
        
        let languageList:Record<number, string> = {
            1:'pt-br',
            2:'en'
        }
        
        return axios({
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
    }

    public async fetchPages(mangaId:string) {
        return axios({
            method: 'GET',
            url: `${process.env.MANGADEX_URL}/at-home/server/${mangaId}`,
        });
    }

}