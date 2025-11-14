# Translation API Configuration

## Current Setup

The application now uses **real translation APIs** instead of hardcoded values!

### Primary API: LibreTranslate (Free & Open Source)
- **URL**: https://libretranslate.com
- **Cost**: FREE
- **Features**: 
  - Open-source translation service
  - No API key required for public instance
  - Supports 20+ languages
  - Can translate entire sentences, paragraphs, and documents
  - Privacy-focused (no data logging)

### Fallback API: MyMemory Translation API
- **URL**: https://mymemory.translated.net
- **Cost**: FREE
- **Features**:
  - Free tier: 1000 words/day
  - No registration required
  - Automatic fallback if LibreTranslate is down

## How It Works

1. **Primary Translation**: LibreTranslate API is called first
2. **Automatic Fallback**: If LibreTranslate fails, MyMemory API is used
3. **Error Handling**: If both APIs fail, user gets a friendly error message
4. **Debouncing**: Translations are debounced (500ms) to avoid excessive API calls

## Supported Languages

Both APIs support:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)
- Arabic (ar)
- Hindi (hi)
- Turkish (tr)
- Dutch (nl)
- Polish (pl)
- Swedish (sv)
- Danish (da)
- Finnish (fi)
- Norwegian (no)
- Czech (cs)

## Self-Hosting LibreTranslate (Optional)

If you want unlimited translations and more control:

### Using Docker:
```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

### Then update the API URL in `app/api/translate/route.ts`:
```typescript
const LIBRETRANSLATE_API_URL = 'http://localhost:5000/translate';
```

## Alternative APIs (If Needed)

### Google Cloud Translation API (Paid)
```bash
npm install @google-cloud/translate
```
- **Cost**: $20 per 1M characters
- **Pros**: Best quality, 100+ languages
- **Cons**: Requires API key and billing

### DeepL API (Paid/Free Tier)
```bash
npm install deepl-node
```
- **Cost**: Free tier: 500,000 characters/month
- **Pros**: Excellent quality, especially for European languages
- **Cons**: Requires API key

### Microsoft Translator (Paid/Free Tier)
- **Cost**: Free tier: 2M characters/month
- **Pros**: Good quality, many languages
- **Cons**: Requires Azure account and API key

## Rate Limits

### Current Setup (Free Tier):
- **LibreTranslate Public Instance**: Fair use policy, no hard limit
- **MyMemory**: 1000 words/day per IP

### If you need more:
1. Host your own LibreTranslate instance (unlimited)
2. Use DeepL free tier (500K chars/month)
3. Use Google Cloud Translation (paid)

## Testing

Try translating:
- Single words: "hello", "thank you"
- Sentences: "How are you today?"
- Paragraphs: "This is a beautiful day. The sun is shining and birds are singing."
- Multiple languages: Switch between any language pair

All translations now work for complete sentences and paragraphs, not just hardcoded words!
