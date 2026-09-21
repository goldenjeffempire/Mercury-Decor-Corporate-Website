---
name: Project video compatibility
description: Why the public project-video player must retain dual WebM and MP4 sources.
---

Every project video must provide a VP9/Opus WebM source before its H.264/AAC MP4 fallback.

**Why:** The uploaded MP4s passed full FFmpeg decoding, used browser-compatible pixel formats, and served with the correct MIME and range responses, but Chromium still rejected them with `MEDIA_ERR_SRC_NOT_SUPPORTED`. WebM played reliably. MP4 remains necessary for Safari and other clients.

**How to apply:** When adding or replacing a project video, generate and verify both formats, list WebM first in the `<video>` sources, keep a poster image, and confirm that each source decodes completely before release.