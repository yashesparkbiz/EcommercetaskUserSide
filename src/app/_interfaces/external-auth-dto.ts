export interface ExternalAuthDto {
    in: {
        provider: string;
        idToken: string;
    }
}