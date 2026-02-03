"use client";

import { Job, Status } from "@/types";
import { Trash2, ExternalLink, Calendar, Building2, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
    job: Job;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, newStatus: Status) => void;
}

const statusOrder: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

export function JobCard({ job, onDelete, onStatusChange }: JobCardProps) {
    const nextStatus = statusOrder[statusOrder.indexOf(job.status) + 1];
    const prevStatus = statusOrder[statusOrder.indexOf(job.status) - 1];

    return (
        <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{job.role}</h3>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 gap-1 mt-0.5">
                        <Building2 size={12} />
                        <span>{job.company}</span>
                    </div>
                </div>
                <button
                    onClick={() => onDelete(job.id)}
                    className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                <Calendar size={12} />
                <span>{new Date(job.dateAdded).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex gap-1">
                    {prevStatus && (
                        <button
                            onClick={() => onStatusChange(job.id, prevStatus)}
                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 transition-colors"
                            title={`Move back to ${prevStatus}`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                    )}
                </div>

                <div className="flex gap-1">
                    {nextStatus && (
                        <button
                            onClick={() => onStatusChange(job.id, nextStatus)}
                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 transition-colors"
                            title={`Move forward to ${nextStatus}`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
