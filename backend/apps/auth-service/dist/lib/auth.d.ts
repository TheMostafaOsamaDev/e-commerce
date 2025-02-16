export declare const auth: {
    handler: (request: Request) => Promise<Response>;
    api: import("better-auth").InferAPI<{
        ok: {
            <C extends [(import("better-auth").Context<"/ok", {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            }> | undefined)?]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                ok: boolean;
            }>;
            path: "/ok";
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        error: {
            <C extends [(import("better-auth").Context<"/error", {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            }> | undefined)?]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : Response>;
            path: "/error";
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        signInSocial: {
            <C extends [import("better-auth").Context<"/sign-in/social", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit")[]]>;
                    disableRedirect: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    idToken: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        nonce: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        accessToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        refreshToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        expiresAt: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, "strip", import("better-auth").ZodTypeAny, {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    }, {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    }>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    idToken?: {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    idToken?: {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                };
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            path: "/sign-in/social";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit")[]]>;
                    disableRedirect: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    idToken: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        nonce: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        accessToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        refreshToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        expiresAt: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, "strip", import("better-auth").ZodTypeAny, {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    }, {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    }>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    idToken?: {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    idToken?: {
                        token: string;
                        expiresAt?: number | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                };
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        callbackOAuth: {
            <C extends [import("better-auth").Context<"/callback/:id", {
                method: ("GET" | "POST")[];
                body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }>>;
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }>>;
                metadata: {
                    isAction: false;
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : void>;
            path: "/callback/:id";
            options: {
                method: ("GET" | "POST")[];
                body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }>>;
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }, {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                }>>;
                metadata: {
                    isAction: false;
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        getSession: {
            <C extends [import("better-auth").Context<"/get-session", {
                method: "GET";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    disableCookieCache: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodBoolean, import("better-auth").ZodEffects<import("better-auth").ZodString, boolean, string>]>>;
                    disableRefresh: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    disableCookieCache?: boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }, {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                    properties: {
                                                        token: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        expiresAt: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                user: {
                                                    type: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                };
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    firstName: string;
                    lastName: string;
                };
            } | null>;
            path: "/get-session";
            options: {
                method: "GET";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    disableCookieCache: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodBoolean, import("better-auth").ZodEffects<import("better-auth").ZodString, boolean, string>]>>;
                    disableRefresh: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    disableCookieCache?: boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }, {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                    properties: {
                                                        token: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        expiresAt: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                user: {
                                                    type: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        signOut: {
            <C extends [import("better-auth").Context<"/sign-out", {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                success: boolean;
            }>;
            path: "/sign-out";
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        signUpEmail: {
            <C extends [import("better-auth").Context<"/sign-up/email", {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                        } & {
                            firstName: string;
                            lastName: string;
                        } & {
                            firstName?: string | null | undefined;
                            lastName?: string | null | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            path: "/sign-up/email";
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                        } & {
                            firstName: string;
                            lastName: string;
                        } & {
                            firstName?: string | null | undefined;
                            lastName?: string | null | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        signInEmail: {
            <C extends [import("better-auth").Context<"/sign-in/email", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodDefault<import("better-auth").ZodBoolean>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            path: "/sign-in/email";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodDefault<import("better-auth").ZodBoolean>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        forgetPassword: {
            <C extends [import("better-auth").Context<"/forget-password", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    redirectTo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    redirectTo?: string | undefined;
                }, {
                    email: string;
                    redirectTo?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/forget-password";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    redirectTo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    redirectTo?: string | undefined;
                }, {
                    email: string;
                    redirectTo?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        resetPassword: {
            <C extends [import("better-auth").Context<"/reset-password", {
                method: "POST";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token?: string | undefined;
                }, {
                    token?: string | undefined;
                }>>;
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    token?: string | undefined;
                }, {
                    newPassword: string;
                    token?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/reset-password";
            options: {
                method: "POST";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token?: string | undefined;
                }, {
                    token?: string | undefined;
                }>>;
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    token?: string | undefined;
                }, {
                    newPassword: string;
                    token?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        verifyEmail: {
            <C extends [import("better-auth").Context<"/verify-email", {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : void | {
                status: boolean;
                user: {
                    id: any;
                    email: any;
                    name: any;
                    image: any;
                    emailVerified: any;
                    createdAt: any;
                    updatedAt: any;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            path: "/verify-email";
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        sendVerificationEmail: {
            <C extends [import("better-auth").Context<"/send-verification-email", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    callbackURL?: string | undefined;
                }, {
                    email: string;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/send-verification-email";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    callbackURL?: string | undefined;
                }, {
                    email: string;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        changeEmail: {
            <C extends [import("better-auth").Context<"/change-email", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newEmail: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/change-email";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newEmail: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        changePassword: {
            <C extends [import("better-auth").Context<"/change-password", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    currentPassword: import("better-auth").ZodString;
                    revokeOtherSessions: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    description: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            path: "/change-password";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    currentPassword: import("better-auth").ZodString;
                    revokeOtherSessions: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    description: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        setPassword: {
            <C extends [import("better-auth").Context<"/set-password", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                }, {
                    newPassword: string;
                }>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/set-password";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                }, {
                    newPassword: string;
                }>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        updateUser: {
            <C extends [import("better-auth").Context<"/update-user", {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    $Infer: {
                        body: {
                            firstName: string;
                            lastName: string;
                        } & {
                            firstName?: string | null | undefined;
                            lastName?: string | null | undefined;
                        } & {
                            name?: string;
                            image?: string | null;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/update-user";
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    $Infer: {
                        body: {
                            firstName: string;
                            lastName: string;
                        } & {
                            firstName?: string | null | undefined;
                            lastName?: string | null | undefined;
                        } & {
                            name?: string;
                            image?: string | null;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        deleteUser: {
            <C extends [import("better-auth").Context<"/delete-user", {
                method: "POST";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    password: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                success: boolean;
                message: string;
            }>;
            path: "/delete-user";
            options: {
                method: "POST";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    password: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        forgetPasswordCallback: {
            <C extends [import("better-auth").Context<"/reset-password/:token", {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    callbackURL: string;
                }, {
                    callbackURL: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : never>;
            path: "/reset-password/:token";
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    callbackURL: string;
                }, {
                    callbackURL: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        listSessions: {
            <C extends [import("better-auth").Context<"/list-sessions", {
                method: "GET";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    token: {
                                                        type: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : import("better-auth").Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            }>[]>;
            path: "/list-sessions";
            options: {
                method: "GET";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    token: {
                                                        type: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        revokeSession: {
            <C extends [import("better-auth").Context<"/revoke-session", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/revoke-session";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        revokeSessions: {
            <C extends [import("better-auth").Context<"/revoke-sessions", {
                method: "POST";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/revoke-sessions";
            options: {
                method: "POST";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        revokeOtherSessions: {
            <C extends [import("better-auth").Context<"/revoke-other-sessions", {
                method: "POST";
                requireHeaders: true;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/revoke-other-sessions";
            options: {
                method: "POST";
                requireHeaders: true;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        linkSocialAccount: {
            <C extends [import("better-auth").Context<"/link-social", {
                method: "POST";
                requireHeaders: true;
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit")[]]>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    callbackURL?: string | undefined;
                }, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                url: string;
                redirect: boolean;
            }>;
            path: "/link-social";
            options: {
                method: "POST";
                requireHeaders: true;
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit")[]]>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    callbackURL?: string | undefined;
                }, {
                    provider: "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        listUserAccounts: {
            <C extends [(import("better-auth").Context<"/list-accounts", {
                method: "GET";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    provider: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }> | undefined)?]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                id: string;
                provider: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            path: "/list-accounts";
            options: {
                method: "GET";
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    provider: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        deleteUserCallback: {
            <C extends [import("better-auth").Context<"/delete-user/callback", {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                success: boolean;
                message: string;
            }>;
            path: "/delete-user/callback";
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, void>, import("better-auth").EndpointOptions>[];
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
        unlinkAccount: {
            <C extends [import("better-auth").Context<"/unlink-account", {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    providerId: string;
                }, {
                    providerId: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
            }>]>(...ctx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : {
                status: boolean;
            }>;
            path: "/unlink-account";
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    providerId: string;
                }, {
                    providerId: string;
                }>;
                use: import("better-auth").Endpoint<import("better-auth").Handler<string, import("better-auth").EndpointOptions, {
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>, import("better-auth").EndpointOptions>[];
            };
            method: import("better-auth").Method | import("better-auth").Method[];
            headers: Headers;
        };
    }>;
    options: {
        database: import("mysql2/promise").Pool;
        emailAndPassword: {
            enabled: true;
        };
        user: {
            additionalFields: {
                firstName: {
                    type: "string";
                    required: true;
                };
                lastName: {
                    type: "string";
                    required: true;
                };
            };
        };
    };
    $context: Promise<import("better-auth").AuthContext>;
    $Infer: {
        Session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                email: string;
                emailVerified: boolean;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                firstName: string;
                lastName: string;
            };
        };
    };
    $ERROR_CODES: {
        USER_NOT_FOUND: string;
        FAILED_TO_CREATE_USER: string;
        FAILED_TO_CREATE_SESSION: string;
        FAILED_TO_UPDATE_USER: string;
        FAILED_TO_GET_SESSION: string;
        INVALID_PASSWORD: string;
        INVALID_EMAIL: string;
        INVALID_EMAIL_OR_PASSWORD: string;
        SOCIAL_ACCOUNT_ALREADY_LINKED: string;
        PROVIDER_NOT_FOUND: string;
        INVALID_TOKEN: string;
        ID_TOKEN_NOT_SUPPORTED: string;
        FAILED_TO_GET_USER_INFO: string;
        USER_EMAIL_NOT_FOUND: string;
        EMAIL_NOT_VERIFIED: string;
        PASSWORD_TOO_SHORT: string;
        PASSWORD_TOO_LONG: string;
        USER_ALREADY_EXISTS: string;
        EMAIL_CAN_NOT_BE_UPDATED: string;
        CREDENTIAL_ACCOUNT_NOT_FOUND: string;
        SESSION_EXPIRED: string;
        FAILED_TO_UNLINK_LAST_ACCOUNT: string;
        ACCOUNT_NOT_FOUND: string;
    };
};
