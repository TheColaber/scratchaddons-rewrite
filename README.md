# Scratch Addons Rewrite

Scratch Addons if it was from the year 2050. The goal of this project was to see what scratch addons could potentially be at some point in the future.

Because of Chrome's requirement for MV3 coming soon, instead of just trying to take SA's current state and support MV3, I thought it might be a good idea to attempt a full rewrite of its code, from the ground up.

My current setup uses Rollup for bundling all the code. Rollup gets all the plugins to support/change different files, for example, supporting vue files.

The idea of including a build step to run the code is for the benefit of the developer. Creating addons and editing the popups or settings page should now be much easier than previously.

Dev Features:

- Vue 3 Webpages (Popup/Settings Page)
- Typescript
- Auto Refresh
- Nested CSS
- Scoped CSS
- Nested CSS
- Easy and Fast Icon Access
- Improved folder structure for addons
- Typed Addon APIS (Planned)

I also wanted to add features that made this rewrite unique from the user's perspective. That includes faster loading of addons and webpages, but also much more setting page features.

User Features:

- Faster addon loading
- Faster popup loading

Planned:

- Theming
- Superpresets
- Onboarding
- Hotkeys

There are many things I plan to fix, and your help and support is appreciated while I dive through this list.

Todo:

- Allow auto import of helpers to addons and popups directory
- Create two different manifests for chrome and firefox
- Add more addon apis

This project is most definitely a Work In Progress, and if you can contribute in anyway, I would love that. I plan to explain the folder structure and how everything works at some point so that it becomes easier to contribute.
