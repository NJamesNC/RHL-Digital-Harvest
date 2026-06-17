# SEO Strategy

## In scope
- Public marketing landing page (`/`)
- Public legal pages (`/privacy-policy`, `/terms`)
- Public audit landing page (`/audit`)

## Out of scope
- Authenticated or admin pages (none found in this repo)
- API endpoints under `/api/**`

## Target audience
- Small business owners evaluating AI voice receptionist and smart website services
- Likely local-service businesses such as HVAC, plumbing, lawn care, legal, medical, and home services

## Primary keywords
- AI voice receptionist
- smart websites for small businesses
- AI receptionist for small businesses
- missed call lead capture
- AI answering service

## Rendering model
- Public landing page and legal routes are served by a Vite + React SPA shell (`client/index.html`) with client-side routing in `client/src/App.tsx`
- Public audit page (`/audit`) is a standalone static HTML file served from `public/audit.html`
- No SSR or prerendering for public marketing/legal routes was found

## Dismissed categories
- (None yet)
