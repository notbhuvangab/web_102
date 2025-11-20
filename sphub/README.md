# Music Forum - Vite + React + Supabase

A modern music sharing forum built with Vite, React, TypeScript, and Supabase.

## Features

### Required Features ✅
- ✅ Create posts with title (required), optional content, and optional image URL
- ✅ Home feed displaying posts with creation time, title, and upvotes count
- ✅ Click post to view detail page
- ✅ Sort posts by creation time or upvotes count
- ✅ Search posts by title
- ✅ Post detail page with content, image, and comments
- ✅ Leave comments on posts
- ✅ Upvote button (users can upvote any number of times)
- ✅ Edit and delete own posts

### Stretch Features ✅
- ✅ **Pseudo-authentication**: Random user ID assigned on launch
- ✅ **Repost/Reference**: Reference previous posts by ID to create threads
- ✅ **Post Flags**: Set flags (Question/Opinion) when creating posts
- ✅ **Filter by Flags**: Filter posts by Question or Opinion on home feed
- ✅ **Video Support**: Share and view web videos (YouTube, Vimeo, etc.)
- ✅ **Interface Customization**: Show/hide content and images on home feed
- ✅ **Feed Display Options**: Control what appears on the home feed

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account and project

### Installation

1. Install dependencies:
```bash
pnpm install
# or
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run database migrations:
Execute the SQL files in the `scripts/` directory in order:
- `001_create_tables.sql`
- `002_disable_rls.sql` (if needed)
- `005_update_schema_for_features.sql`

4. Start development server:
```bash
pnpm dev
# or
npm run dev
```

5. Build for production:
```bash
pnpm build
# or
npm run build
```

## Deployment to Netlify

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `npm run build` or `pnpm build`
   - Publish directory: `dist`
3. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The `netlify.toml` file is already configured for SPA routing.

## Project Structure

```
sphub/
├── src/
│   ├── pages/          # Page components
│   ├── app/            # Layout and global styles
│   └── App.tsx         # Main app with routes
├── components/         # Reusable components
├── lib/                # Utilities and Supabase client
├── scripts/            # Database migration scripts
├── public/             # Static assets
└── netlify.toml        # Netlify configuration
```

## Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **React Router** - Client-side routing
- **TypeScript** - Type safety
- **Supabase** - Backend and database
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives

## Pseudo-Authentication

Users are automatically assigned a random user ID on first visit. This ID is stored in localStorage and associated with all posts and comments. Users can optionally set a display name.

## License

MIT

