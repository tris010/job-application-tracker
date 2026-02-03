"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Job, Status, COLUMNS } from "@/types";
import { JobCard } from "@/components/JobCard";
import { Plus, Search, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [jobs, setJobs] = useLocalStorage<Job[]>("job-tracker-data", []);
  const [isAdding, setIsAdding] = useState(false);

  // New Job State
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const job: Job = {
      id: crypto.randomUUID(),
      company: newCompany,
      role: newRole,
      status: "Applied",
      dateAdded: new Date().toISOString(),
    };

    setJobs((prev) => [...prev, job]);
    setNewCompany("");
    setNewRole("");
    setIsAdding(false);
  };

  const deleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const updateStatus = (id: string, newStatus: Status) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans text-zinc-900 dark:text-zinc-100">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Briefcase size={24} />
            </div>
            Job Tracker
          </h1>
          <p className="text-zinc-500 mt-1">Manage your applications efficiently.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Application
        </button>
      </div>

      {/* Add Job Form */}
      {isAdding && (
        <form onSubmit={addJob} className="max-w-xl mx-auto mb-12 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-semibold mb-4">Add New Application</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-600 dark:text-zinc-400">Company</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="e.g. Google, Vercel"
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-600 dark:text-zinc-400">Role</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newCompany || !newRole}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save Application
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-10">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter(j => j.status === col.id);
          return (
            <div key={col.id} className="min-w-[280px]">
              <div className={cn("flex items-center justify-between p-3 rounded-lg border mb-4", col.color)}>
                <span className="font-semibold">{col.title}</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-white/50 rounded-full">{colJobs.length}</span>
              </div>

              <div className="space-y-3">
                {colJobs.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400 dark:text-zinc-600 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-sm">
                    No jobs
                  </div>
                ) : (
                  colJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onDelete={deleteJob}
                      onStatusChange={updateStatus}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
