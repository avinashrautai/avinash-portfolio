insert into public.projects (slug,title,category,summary,body,status,year,published,sort_order,direction) values
('vx-walls','VX Walls','PROJECT / ANDROID','Android wallpaper app with fullscreen browsing, downloads, favourites, theme support, and options to set wallpapers on the home screen, lock screen, or both.','VX Walls is an Android wallpaper app with fullscreen browsing, wallpaper downloads, favourites, and theme support. Users can set a wallpaper on the home screen, lock screen, or both.\n\nThe catalog is remote, and the app is in active refinement.','Active refinement','—',true,1,'View project'),
('repo-runner','Repo Runner','PROJECT / WINDOWS TOOL','Windows-first utility that detects a local or cloned project stack, checks dependencies, helps install or fix them, and runs the project.','Repo Runner is a Windows-first utility for getting local or cloned projects running. It detects a project’s stack, checks dependencies, helps install or fix them, and runs the project.\n\nIt is at release-candidate stage, with final QA pending.','Final QA pending','—',true,2,'View project'),
('marathi-unicode-keyboard','Marathi Unicode Keyboard','PROJECT / WINDOWS · KEYMAN','Windows Keyman Marathi Unicode typewriter keyboard with a non-phonetic m17n-style layout.','Marathi Unicode Keyboard is a Windows Keyman Marathi Unicode typewriter keyboard with a non-phonetic m17n-style layout. It supports conjuncts, Devanagari digits, and the rupee symbol.\n\nCompilation succeeds; compatibility and release testing are pending.','Compile successful','—',true,3,'View project')
on conflict (slug) do update set title=excluded.title, category=excluded.category, summary=excluded.summary, body=excluded.body, status=excluded.status, year=excluded.year, published=excluded.published, sort_order=excluded.sort_order, direction=excluded.direction;

update public.articles set published=false where slug in ('making-room-for-the-useful','systems-are-made-of-people');

insert into public.site_settings (key,value) values
('contact_email',''),('location','India'),('availability','Open to thoughtful independent work'),
('about_intro','I’m Avinash Raut — a designer, developer, and writer. I pay attention to how people, technology, and everyday life meet, then make useful products, visual work, and writing from what I notice.')
on conflict (key) do nothing;
