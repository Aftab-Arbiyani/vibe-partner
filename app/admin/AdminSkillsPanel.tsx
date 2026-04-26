"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Skill } from "@/lib/skills-data";

interface Props {
  skills: Skill[];
}

export default function AdminSkillsPanel({ skills }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState("");
  const [type, setType] = useState<"skill" | "agent">("skill");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select a file to upload."); return; }
    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("isPremium", String(isPremium));
      formData.append("price", price);
      formData.append("type", type);

      const res = await fetch("/api/admin/skills/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Upload failed. Please try again.");
        return;
      }

      setSuccess("Skill uploaded successfully.");
      setTitle(""); setDescription(""); setTags(""); setIsPremium(false);
      setPrice(""); setFile(null); setType("skill");
      const input = document.getElementById("skill-file") as HTMLInputElement;
      if (input) input.value = "";
      router.refresh();
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    setDeletingId(null);
    router.refresh();
  }

  const freeSkills = skills.filter((s) => !s.isPremium);
  const premiumSkills = skills.filter((s) => s.isPremium);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Upload form */}
      <div className="lg:col-span-1">
        <h2 className="text-lg font-semibold mb-4">Upload New Skill</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4"
        >
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Git Auto-Commit Skill"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this skill do?"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Tags <span className="text-gray-600">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="claude, git, automation"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Type</label>
            <div className="flex rounded-lg overflow-hidden border border-white/10 text-sm">
              {(["skill", "agent"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 capitalize font-medium transition-colors ${
                    type === t
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-gray-500">Premium?</label>
            <button
              type="button"
              onClick={() => setIsPremium(!isPremium)}
              className={`relative w-10 h-5 rounded-full transition-colors ${isPremium ? "bg-indigo-600" : "bg-white/20"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${isPremium ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {isPremium && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Price (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 mb-1">File</label>
            <input
              id="skill-file"
              type="file"
              required
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-indigo-600/20 file:text-indigo-400 file:cursor-pointer hover:file:bg-indigo-600/30 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}
          {success && <p className="text-emerald-400 text-xs">{success}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            {uploading ? "Uploading…" : "Upload Skill"}
          </button>
        </form>
      </div>

      {/* Existing skills */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">
          Existing Skills
          <span className="ml-2 text-sm font-normal text-gray-500">({skills.length})</span>
        </h2>

        {skills.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
            No skills yet. Upload your first one.
          </div>
        ) : (
          <div className="space-y-6">
            {[
              { label: "Free", list: freeSkills, color: "text-emerald-400" },
              { label: "Premium", list: premiumSkills, color: "text-indigo-400" },
            ].map(({ label, list, color }) =>
              list.length === 0 ? null : (
                <div key={label}>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${color}`}>
                    {label}
                  </p>
                  <div className="space-y-2">
                    {list.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-white text-sm font-medium truncate">{skill.title}</p>
                            <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full border capitalize ${
                              skill.type === "agent"
                                ? "bg-violet-600/20 border-violet-500/30 text-violet-400"
                                : "bg-sky-600/20 border-sky-500/30 text-sky-400"
                            }`}>
                              {skill.type ?? "skill"}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{skill.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-white/5 border border-white/10 text-gray-500 text-xs px-1.5 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {skill.isPremium && (
                            <span className="text-white text-sm font-bold">
                              ${(skill.price / 100).toFixed(0)}
                            </span>
                          )}
                          <button
                            onClick={() => handleDelete(skill.id)}
                            disabled={deletingId === skill.id}
                            className="text-red-400 hover:text-red-300 text-xs transition-colors disabled:opacity-50"
                          >
                            {deletingId === skill.id ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
