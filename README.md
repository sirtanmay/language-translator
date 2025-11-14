# LinguaFlow - Real-time Language Translator

A beautiful, dynamic, and aesthetic real-time language translator built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

✨ **Real-time Translation** - Instant text translation as you type with debouncing
🎨 **Beautiful UI** - Modern, aesthetic design with smooth animations
🌓 **Dark/Light Theme** - Toggle between dark and light modes with smooth transitions
🌍 **20+ Languages** - Support for major world languages
📱 **Responsive Design** - Works seamlessly on desktop and mobile
⚡ **Fast & Smooth** - Optimized performance with Framer Motion animations
🎯 **Type-Safe** - Built with TypeScript for reliability
🔄 **State Management** - Efficient state management with Zustand
🎤 **Text-to-Speech** - Listen to translations
📋 **Copy to Clipboard** - Easy copy functionality

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

## Project Structure

```
language-translator/
├── app/
│   ├── api/
│   │   └── translate/
│   │       └── route.ts          # Translation API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── components/
│   ├── LanguageSelector.tsx       # Language dropdown component
│   ├── TextArea.tsx               # Text input/output component
│   ├── ThemeToggle.tsx            # Theme switcher button
│   └── Translator.tsx             # Main translator component
├── lib/
│   └── languages.ts               # Language definitions
└── store/
    └── useStore.ts                # Zustand state management
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

### State Management (Zustand)
The app uses Zustand for lightweight, efficient state management:
- Theme state (dark/light)
- Source and target languages
- Input and output text
- Translation status
- Language swap functionality

### Real-time Translation
- Debounced input (500ms) to avoid excessive API calls
- Mock translation API with extensible structure
- Easy to integrate with real translation services (Google Translate, DeepL, LibreTranslate)

### Theme System
- Persistent theme toggle
- Smooth transitions between themes
- Animated background gradients
- Theme-aware components

## Customization

### Adding More Languages
Edit `lib/languages.ts` to add more language options.

### Integrating Real Translation API
Replace the mock API in `app/api/translate/route.ts` with a real service like LibreTranslate, Google Cloud Translate, or DeepL API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
