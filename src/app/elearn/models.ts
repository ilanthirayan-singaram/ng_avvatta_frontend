export interface Topic {
    id: number;
    chapters: Chapter[];
    grade: number;
    title: string;
}

export interface Chapter {
    id: number;
    number: number;
    sections: Section[];
    title: string;
}

export interface Section {
    id: number;
    number: number;
    title: string;
    mastery: number;
}


export interface ActivityResult {
    activity: Activity;
    response: Response;
    practice: Practice;
    meta?: any;
}

export interface Practice {
    chapter: Chapter;
    section: Chapter;
}

export interface Chapter {
    id: number;
    title: string;
    mastery: number;
}

export interface Response {
    id: string;
    complete: boolean;
    question_html: string;
    random_seed: number;
    template_id: number;
}

export interface Activity {
    id: string;
    sequence_id?: any;
    retry_url?: any;
    next_url?: any;
}
