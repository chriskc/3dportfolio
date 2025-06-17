export interface CardData {
    id: number;
    color: string;
    hoverColor: string;
    title: string;
    description: string;
}

export const cards: CardData[] = [
    {
        id: 1,
        color: "#FF2D91",
        hoverColor: "#FF6BB5",
        title: "Project One",
        description:
            "A cutting-edge web application built with modern technologies to solve real-world problems.",
    },
    {
        id: 2,
        color: "#9D4EDD",
        hoverColor: "#B77DFF",
        title: "Project Two",
        description:
            "An interactive data visualization platform that makes complex data easy to understand.",
    },
    {
        id: 3,
        color: "#7D26CD",
        hoverColor: "#9B51E0",
        title: "Project Three",
        description:
            "Mobile-first responsive design that works seamlessly across all devices and screen sizes.",
    },
    {
        id: 4,
        color: "#1E90FF",
        hoverColor: "#4DABFF",
        title: "Project Four",
        description:
            "A full-stack application with real-time updates and modern authentication.",
    },
    {
        id: 5,
        color: "#FF2D91",
        hoverColor: "#FF6BB5",
        title: "Project Five",
        description:
            "An e-commerce platform with secure payment processing and inventory management.",
    },
    {
        id: 6,
        color: "#9D4EDD",
        hoverColor: "#B77DFF",
        title: "Project Six",
        description: "A social media dashboard with analytics and user engagement metrics.",
    },
];
