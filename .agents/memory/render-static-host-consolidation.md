---
name: Render static host consolidation
description: Redirect limitations when consolidating a Render static site's default hostname with a custom domain.
---

For a Render static site, redirects configured in `render.yaml` match request paths and cannot safely redirect only the default `onrender.com` hostname while leaving a custom hostname untouched. Render's option to disable the default subdomain makes it return 404; it is not a migration redirect.

**Why:** Search engines and visitors may still use URLs indexed on the default hostname, and a 404 discards the direct path to the corresponding custom-domain page.

**How to apply:** Prefer a host-aware permanent redirect at a capable edge or server. If unavailable, preserve canonical tags and use a host-specific client redirect as a temporary bridge; explain that it is weaker than a server-side 301 and do not disable the old hostname without an intentional cutover plan.