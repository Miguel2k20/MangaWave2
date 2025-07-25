interface ChapterData {
  id: string;
  type: "chapter";
  attributes: {
    volume: string | null;
    chapter: string | null;
    title: string | null;
    translatedLanguage: string;
    externalUrl: string | null;
    isUnavailable: boolean;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    pages: number;
    version: number;
  };
  relationships: Relationship[];
}

interface Relationship {
  id: string;
  type: "scanlation_group" | "manga" | "user" | string;
}

interface ResponseChapterApi {
    data: ChapterData[]
}
