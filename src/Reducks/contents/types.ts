export type ContentItem = {
    componentId: string
    key: string
    link: string
}

export type ComponentMap = {
    [key: string]: React.ComponentType<{ label: string }>;
};
