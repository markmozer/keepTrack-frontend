# keepTrack Frontend

De frontend van de keepTrack applicatie, gebouwd met React en Vite.

## Stack

- React
- React Router
- Vite

## Routingmodel

De frontend gebruikt path-based tenant routing.

Voorbeelden:

- `/t/:tenantSlug/login`
- `/t/:tenantSlug/accept-invite`
- `/t/:tenantSlug/forgot-password`
- `/t/:tenantSlug/reset-password`
- `/t/:tenantSlug/app`
- `/t/:tenantSlug/app/admin/users`

De frontend leest de tenant uit het pad en roept de backend tenant-aware aan via:

- `/api/t/:tenantSlug/auth/...`
- `/api/t/:tenantSlug/users/...`
- `/api/t/:tenantSlug/roles`
- `/api/t/:tenantSlug/role-assignments`

## Lokale ontwikkeling

### Installeren

```bash
npm install
```

### Development server starten

```bash
npm run dev
```

Vite draait standaard op `http://localhost:5173`.

### Lokale backend-koppeling

Lokaal mag `VITE_API_BASE_URL` leeg zijn:

```env
VITE_API_BASE_URL=
```

Dan gebruikt de frontend dezelfde origin en proxiet Vite `/api` door naar de backend op `http://localhost:3000`.

De Vite proxy zit in [vite.config.js](./vite.config.js).

Voorbeeld lokaal:

- frontend: `http://localhost:5173/t/mozer-consulting/login`
- backend: `http://localhost:3000`

## Productie / Render

De productie-opzet is:

- frontend: `https://keeptrackonline.nl`
- backend: `https://api.keeptrackonline.nl`

### Frontend env var

In Render voor de frontend:

```env
VITE_API_BASE_URL=https://api.keeptrackonline.nl
```

Dat zorgt ervoor dat alle API-calls direct naar je eigen API-subdomein gaan.

## Build

```bash
npm run build
```

## Belangrijke notities

- De frontend gebruikt geen subdomains of `X-Tenant-Slug` meer
- De tenant komt volledig uit het URL-pad
- Redirects en navigatie behouden automatisch de actieve tenant
- Auth werkt met cookies en `credentials: "include"`
