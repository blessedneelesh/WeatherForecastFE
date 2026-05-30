# Weather Forecast

React + TypeScript SPA that performs CRUD against the Weather Forecast REST API.
Uses classic Redux (`combineReducers`), Redux-Saga for async, Axios for HTTP,
Reselect for memoization, and Microsoft Fluent UI v9 for components.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Folder tree

```
.
├── .env.development               # REACT_APP_WEATHER_API_BASE_URL → staging
├── .env.production                # REACT_APP_WEATHER_API_BASE_URL → prod
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx                   # bootstraps <Root/>
    ├── Root.tsx                   # Provider → BrowserRouter → FluentProvider → App
    ├── config/
    │   └── env.ts                 # typed env accessor; throws at startup
    ├── services/
    │   ├── ApiService.ts          # axios instance + interceptors
    │   └── weatherForecast/
    │       ├── weatherForecast.dto.ts
    │       └── weatherForecast.service.ts
    ├── redux/
    │   ├── root-reducer.ts        # ← Step 1: register new reducer here
    │   ├── root-saga.ts           # ← Step 2: fork new saga here
    │   ├── store.ts
    │   └── weatherForecast/
    │       ├── weatherForecast.types.ts
    │       ├── weatherForecast.actions.ts
    │       ├── weatherForecast.reducer.ts
    │       ├── weatherForecast.sagas.ts
    │       └── weatherForecast.selectors.ts
    ├── dashboard/
    │   └── App.tsx                # <Routes> table
    ├── components/
    │   └── WeatherForecastView/
    │       ├── WeatherForecastView.tsx
    │       └── ForecastCreateForm.tsx
    └── shared/
        └── common/
            ├── WelcomeMessage.tsx
            └── layout/
                └── LayoutBase.tsx
```

## Navigation flow

```
URL change (browser address bar or in-app navigation)
        │
        ▼
BrowserRouter parses URL path
        │
        ▼
<Routes> in src/dashboard/App.tsx matches path
        │
        ▼
Page component renders (e.g. <WeatherForecastView/>)
        │
        └──►  useDispatch() → feature actions → Redux store
```

There is no global navbar — navigation lives inside each route.

## Data flow

```
 ┌───────────────┐  dispatch(*_REQUEST)   ┌──────────────────┐
 │  Component    │ ─────────────────────► │   Redux store    │
 │ useDispatch() │                        │ (initial reducer │
 └───────────────┘                        │  hits LOADING)   │
       ▲                                  └────────┬─────────┘
       │                                           │ takeLatest
       │ useSelector(memoized reselect)            ▼
       │                                  ┌──────────────────┐
       │                                  │   Saga watcher   │
       │                                  └────────┬─────────┘
       │                                           │ call(service.fn)
       │                                           ▼
       │                                  ┌──────────────────┐
       │                                  │   ApiService     │
       │                                  │  axios + interc. │
       │                                  └────────┬─────────┘
       │                                           │ HTTPS
       │                                           ▼
       │                                  ┌──────────────────┐
       │                                  │  Weather API     │
       │                                  └────────┬─────────┘
       │                                           │ 2xx / error
       │                                           ▼
       │                                  ┌──────────────────┐
       │      put(*_SUCCESS / *_FAILURE)  │   Saga handler   │
       │ ◄────────────────────────────────┤  (normalized)    │
       │                                  └────────┬─────────┘
       │                                           ▼
       │                                  ┌──────────────────┐
       └────── selector ◄─────────────────│    Reducer       │
                                          └──────────────────┘
```

## API endpoints

| Method | Path                       | Saga action                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/WeatherForecast`         | `fetchAllRequest()`        |
| GET    | `/WeatherForecast/{id}`    | `fetchByIdRequest(id)`     |
| POST   | `/WeatherForecast`         | `createRequest(payload)`   |
| PUT    | `/WeatherForecast/{id}`    | `updateRequest(payload)`   |
| DELETE | `/WeatherForecast/{id}`    | `deleteRequest(id)`        |

## Adding a new feature slice

Two registration steps. Each is flagged with a `Registration Step N of 2`
comment in the file it lives in.

1. **`src/redux/root-reducer.ts`** — import the new reducer and add it to
   `combineReducers({ ... })`. This expands `RootState` so selectors get
   typed automatically.
2. **`src/redux/root-saga.ts`** — import the new watcher saga and add it
   to the `all([ fork(...) ])` array so its `*_REQUEST` actions are observed.

If you forget either step, the slice will type-check but be silently inert —
either the store will lack the field, or the request actions will hang.

## Adding a new route

1. **`src/dashboard/App.tsx`** — add a `<Route path="/your-path" element={…} />`
   inside `<Routes>`. The catch-all (`*`) intentionally renders `<WelcomeMessage/>`
   so any unmapped deep-link still lands somewhere friendly.
2. **(If the destination has sub-pages)** add a new in-route nav component
   (toolbar or sidebar) under the destination's folder.

## Environment & secrets

`.env.development` and `.env.production` hold the public API base URL only.
Any real credentials (auth client secrets, signing keys, third-party API keys)
must come from a runtime secret store — never commit them. `src/config/env.ts`
throws at startup if the required variable is missing, so the app fails fast
when misconfigured.
