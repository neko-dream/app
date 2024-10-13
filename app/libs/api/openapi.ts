/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/talksessions/{talkSessionID}/opinions/{opinionID}/votes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 意思表明API */
        post: operations["vote"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksession/{talkSessionID}/swipe_opinions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * スワイプ用のエンドポイント
         * @description セッションの中からまだ投票していない意見をランダムに取得する
         */
        get: operations["swipe_opinions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksessions/{talkSessionId}/opinion": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 🚧 分析に関する意見 */
        get: operations["getTopOpinions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksessions/{talkSessionID}/opinions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * セッションに対して意見投稿
         * @description parentOpinionIDがなければルートの意見として投稿される
         */
        post: operations["postOpinionPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksessions/{talkSessionID}/opinions/{opinionID}/replies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 意見に対するコメント一覧を返す */
        get: operations["opinionComments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksessions/{talkSessionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 🚧 トークセッションの詳細 */
        get: operations["getTalkSessionDetail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/talksessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** トークセッションコレクション */
        get: operations["getTalkSessionList"];
        put?: never;
        /** トークセッション作成 */
        post: operations["createTalkSession"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザー情報の取得 */
        get: operations["get_user_info"];
        /** ユーザー情報の変更 */
        put: operations["editUserProfile"];
        /** ユーザー作成 */
        post: operations["registerUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/token/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** JWTの内容を返してくれる */
        get: operations["oauth_token_info"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** OpenAPIテスト用 */
        get: operations["test"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        talkSession: {
            /** @description トークセッションID */
            id: string;
            /** @description テーマ */
            theme: string;
            /** @description 作成ユーザー */
            owner: components["schemas"]["user"];
            /** @description 作成日時 */
            createdAt: string;
            /** @description 終了予定日時 */
            scheduledEndTime: string;
            /** @description 位置情報 */
            location?: components["schemas"]["location"] | null;
        };
        validationErrorItem: {
            /** @description バリデーションエラーのフィールド */
            field: string;
            /** @description バリデーションエラーメッセージ */
            message: string;
        };
        error: {
            code: string;
            message: string;
        };
        user: {
            displayID: string;
            displayName: string;
            iconURL?: string | null;
        };
        opinion: {
            /** @description 意見ID */
            id: string;
            title?: string;
            /** @description 意見のテキスト */
            content: string;
            /** @description 親の意見ID。ルートならば無し */
            parentID?: string;
            /** @description 意見投稿主の意見。ルート意見の場合はここには何も入らない */
            voteType?: components["schemas"]["voteType"];
            /** @description 画像が返る場合もある */
            pictureURL?: string;
            /** @description 参考文献URL */
            referenceURL?: string;
        };
        /**
         * @description 意見の3種のステータス
         * @enum {string}
         */
        voteType: "agree" | "disagree" | "pass";
        location: {
            /** @description 緯度 */
            latitude: number;
            /** @description 経度 */
            longitude: number;
            /** @description 都道府県 */
            prefecture: string;
            /** @description 市区町村 */
            city: string;
        };
        tokenClaim: {
            /** @description Audience */
            aud: string;
            /** @description 有効期限 */
            exp: string;
            /** @description 発行日時 */
            iat: string;
            /** @description 発行者 */
            iss: string;
            /** @description ユーザID */
            sub: string;
            /** @description JWT ID */
            jti: string;
            /** @description ユーザーID */
            displayId?: string;
            /** @description ユーザー名 */
            displayName?: string;
            /** @description アイコンURL */
            iconURL?: string;
            /** @description ユーザ登録済みか */
            isVerify: boolean;
        };
        offsetPagination: {
            totalCount: number;
            offset: number;
            limit: number;
        };
        userDemographics: {
            /** @description 誕生年 */
            yearOfBirth?: number | null;
            /**
             * 職業
             * @description 職業
             */
            occupation: string;
            /**
             * 性別
             * @description 性別
             */
            gender: string;
            /**
             * 市区町村
             * @description 市区町村
             */
            municipality?: string | null;
            /**
             * 世帯人数
             * @description 世帯人数
             */
            householdSize?: number | null;
            /** @description 都道府県 */
            prefecture?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    vote: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description セッションのID */
                talkSessionID: string;
                /** @description 意見のID */
                opinionID: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/x-www-form-urlencoded": {
                    /**
                     * @example
                     * @enum {string|null}
                     */
                    voteStatus: "agree" | "disagree" | "pass" | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["opinion"][];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    swipe_opinions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                talkSessionID: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        opinion: components["schemas"]["opinion"];
                        /** @description 作成ユーザー */
                        user: components["schemas"]["user"];
                        replyCount: number;
                    }[];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    getTopOpinions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                talkSessionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    postOpinionPost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                talkSessionID: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": {
                    /** @example  */
                    parentOpinionID?: string | null;
                    /** @example  */
                    title?: string | null;
                    /** @example  */
                    opinionContent: string;
                    /** @example  */
                    referenceURL?: string | null;
                    /**
                     * Format: binary
                     * @example
                     */
                    picture?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    opinionComments: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                talkSessionID: string;
                /** @description 親意見のID */
                opinionID: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rootOpinion: {
                            /** @description 作成ユーザー */
                            user: components["schemas"]["user"];
                            opinion: components["schemas"]["opinion"];
                        };
                        myVoteType?: components["schemas"]["voteType"] | null;
                        opinions: {
                            opinion: components["schemas"]["opinion"];
                            /** @description 作成ユーザー */
                            user: components["schemas"]["user"];
                            myVoteType?: components["schemas"]["voteType"] | null;
                        }[];
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    getTalkSessionDetail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                talkSessionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["talkSession"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    getTalkSessionList: {
        parameters: {
            query?: {
                /**
                 * @description 1ページあたりの要素数
                 * @example 10
                 */
                limit?: number | null;
                /**
                 * @description どの要素から始めるか
                 * @example 0
                 */
                offset?: number | null;
                theme?: string | null;
                status?: "open" | "finished";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        talkSessions: {
                            talkSession: components["schemas"]["talkSession"];
                            opinionCount: number;
                        }[];
                        pagination: components["schemas"]["offsetPagination"];
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    createTalkSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/x-www-form-urlencoded": {
                    /** @example オブジェクト指向は悪 */
                    theme: string;
                    /**
                     * Format: date-time
                     * @example 2024-12-17T03:24:00Z
                     */
                    scheduledEndTime: string;
                    /**
                     * @description 緯度
                     * @example 0
                     */
                    latitude?: number | null;
                    /**
                     * @description 経度
                     * @example 0
                     */
                    longitude?: number | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description トークセッションID */
                        id: string;
                        /** @description テーマ */
                        theme: string;
                        /** @description 作成ユーザー */
                        owner: components["schemas"]["user"];
                        /** @description 作成日時 */
                        createdAt: string;
                        /** @description 終了予定日時 */
                        scheduledEndTime: string;
                        /** @description 位置情報 */
                        location?: components["schemas"]["location"] | null;
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    get_user_info: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 作成ユーザー */
                        user: components["schemas"]["user"];
                        demographics: components["schemas"]["userDemographics"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    editUserProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description ユーザー名
                     * @example
                     */
                    displayName?: string | null;
                    /**
                     * Format: binary
                     * @description ユーザーアイコン
                     * @example
                     */
                    icon?: string;
                    /**
                     * @description 生まれ年
                     * @example 0
                     */
                    yearOfBirth?: number | null;
                    /**
                     * @description 性別
                     * @example
                     * @enum {string|null}
                     */
                    gender?: "男性" | "女性" | "その他" | "回答しない" | null;
                    /**
                     * @description 市区町村
                     * @example
                     */
                    municipality?: string | null;
                    /**
                     * @description 職業
                     * @example
                     * @enum {string|null}
                     */
                    occupation?: "正社員" | "契約社員" | "公務員" | "自営業" | "会社役員" | "パート・アルバイト" | "家事従事者" | "学生" | "無職" | "その他" | "回答しない" | null;
                    /**
                     * @description 世帯人数
                     * @example 0
                     */
                    householdSize?: number | null;
                    /**
                     * @description 都道府県
                     * @example
                     */
                    prefectures?: string | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        displayID: string;
                        displayName: string;
                        iconURL?: string | null;
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    registerUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description ユーザー名。日本語なども設定可能。
                     * @example
                     */
                    displayName: string;
                    /**
                     * @description ユーザーID。プロフィールのパスなどで使用される。DBのIDとは別。
                     * @example
                     */
                    displayID: string;
                    /**
                     * Format: binary
                     * @description ユーザーアイコン
                     * @example
                     */
                    icon?: string;
                    /**
                     * @description 生まれ年
                     * @default 0
                     * @example 0
                     */
                    yearOfBirth?: number | null;
                    /**
                     * @description 性別
                     * @default preferNotToSay
                     * @example
                     * @enum {string|null}
                     */
                    gender?: "男性" | "女性" | "その他" | "回答しない";
                    /**
                     * @description 都道府県
                     * @example
                     */
                    prefectures?: string;
                    /**
                     * @description 市区町村
                     * @example
                     */
                    municipality?: string | null;
                    /**
                     * @description ユーザーの職業
                     * @default 無回答
                     * @example
                     * @enum {string|null}
                     */
                    occupation?: "正社員" | "契約社員" | "公務員" | "自営業" | "会社役員" | "パート・アルバイト" | "家事従事者" | "学生" | "無職" | "その他" | "回答しない";
                    /**
                     * @description 世帯人数
                     * @example 0
                     */
                    householdSize?: number | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        displayID: string;
                        displayName: string;
                        iconURL?: string | null;
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    oauth_token_info: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Audience */
                        aud: string;
                        /** @description 有効期限 */
                        exp: string;
                        /** @description 発行日時 */
                        iat: string;
                        /** @description 発行者 */
                        iss: string;
                        /** @description ユーザID */
                        sub: string;
                        /** @description JWT ID */
                        jti: string;
                        /** @description ユーザーID */
                        displayId?: string;
                        /** @description ユーザー名 */
                        displayName?: string;
                        /** @description アイコンURL */
                        iconURL?: string;
                        /** @description ユーザ登録済みか */
                        isVerify: boolean;
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        code: string;
                        message: string;
                    };
                };
            };
        };
    };
    test: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        optInt?: number | null;
                        optNilInt?: number;
                        optNilBool?: boolean | null;
                        optBool?: boolean;
                        /** Format: uri */
                        optUrl?: string;
                        /** Format: url */
                        optNilUrl?: string | null;
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
}
