export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
    id: string;
    company: string;
    role: string;
    status: Status;
    dateAdded: string;
    link?: string;
    salary?: string;
}

export const COLUMNS: { id: Status; title: string; color: string }[] = [
    { id: "Applied", title: "Applied", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "Interview", title: "Interview", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { id: "Offer", title: "Offer", color: "bg-green-500/10 text-green-500 border-green-500/20" },
    { id: "Rejected", title: "Rejected", color: "bg-red-500/10 text-red-500 border-red-500/20" },
];
