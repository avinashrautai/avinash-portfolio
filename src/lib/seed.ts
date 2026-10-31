import type { Project, SiteSettings } from "@/types/content";

export const seedProjects: Project[] = [
  {
    id: "seed-vx-walls", slug: "vx-walls", title: "VX Walls", category: "PROJECT / ANDROID",
    summary: "Android wallpaper app with fullscreen browsing, downloads, favourites, theme support, and options to set wallpapers on the home screen, lock screen, or both.",
    body: "VX Walls is an Android wallpaper app with fullscreen browsing, wallpaper downloads, favourites, and theme support. Users can set a wallpaper on the home screen, lock screen, or both.\n\nThe catalog is remote, and the app is in active refinement.",
    status: "Active refinement", year: "—", direction: "View project", published: true, sort_order: 1,
  },
  {
    id: "seed-repo-runner", slug: "repo-runner", title: "Repo Runner", category: "PROJECT / WINDOWS TOOL",
    summary: "Windows-first utility that detects a local or cloned project stack, checks dependencies, helps install or fix them, and runs the project.",
    body: "Repo Runner is a Windows-first utility for getting local or cloned projects running. It detects a project’s stack, checks dependencies, helps install or fix them, and runs the project.\n\nIt is at release-candidate stage, with final QA pending.",
    status: "Final QA pending", year: "—", direction: "View project", published: true, sort_order: 2,
  },
  {
    id: "seed-marathi-keyboard", slug: "marathi-unicode-keyboard", title: "Marathi Unicode Keyboard", category: "PROJECT / WINDOWS · KEYMAN",
    summary: "Windows Keyman Marathi Unicode typewriter keyboard with a non-phonetic m17n-style layout.",
    body: "Marathi Unicode Keyboard is a Windows Keyman Marathi Unicode typewriter keyboard with a non-phonetic m17n-style layout. It supports conjuncts, Devanagari digits, and the rupee symbol.\n\nCompilation succeeds; compatibility and release testing are pending.",
    status: "Compile successful", year: "—", direction: "View project", published: true, sort_order: 3,
  },
];

export const seedSettings: SiteSettings = {
  contact_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: "India",
  availability: "Open to thoughtful independent work",
  about_intro: "I’m Avinash Raut — a designer, developer, and writer. I pay attention to how people, technology, and everyday life meet, then make useful products, visual work, and writing from what I notice.",
};
