export interface Project {
    id: string;
    links: {
        live?: `${string}.${string}`;
        figma?: string;
        github?: `/${string}` | `${string}/${string}`
    };
    techs: string[];
    images?: string[];
    hasImage?: boolean;
    isSmall?: boolean;
    isInProgress?: boolean
}