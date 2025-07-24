interface MangaRelationship {
    id: string;
    type: string;
    attributes?: {
        fileName?: string;
        [key: string]: any;
    };
}

interface MangaAttributes {
    title: {
        [lang: string]: string;
    };
    description?: {
        [lang: string]: string;
    };
    status?: string;
    availableTranslatedLanguages?: string[];
    [key: string]: any;
}

interface ResponseApiData {
    id: string;
    type: string;
    attributes: MangaAttributes;
    relationships: MangaRelationship[];
}

interface ResponseApi {
    data: ResponseApiData[]
}
