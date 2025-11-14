import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Using LibreTranslate - Free and open-source translation API
// You can use the public instance or host your own: https://github.com/LibreTranslate/LibreTranslate
const LIBRETRANSLATE_API_URL = "https://libretranslate.com/translate";

// Fallback translation services (you can add more)
const MYMEMORY_API_URL = "https://api.mymemory.translated.net/get";

async function translateWithLibreTranslate(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  try {
    const response = await axios.post(
      LIBRETRANSLATE_API_URL,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error("LibreTranslate API error:", error);
    throw error;
  }
}

async function translateWithMyMemory(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  try {
    const langPair = `${sourceLang}|${targetLang}`;
    const response = await axios.get(MYMEMORY_API_URL, {
      params: {
        q: text,
        langpair: langPair,
      },
      timeout: 10000,
    });

    if (response.data?.responseData?.translatedText) {
      return response.data.responseData.translatedText;
    }

    throw new Error("Invalid response from MyMemory API");
  } catch (error) {
    console.error("MyMemory API error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // If source and target are the same, return the original text
    if (sourceLang === targetLang) {
      return NextResponse.json({
        translatedText: text,
        sourceLang,
        targetLang,
      });
    }

    let translatedText = "";

    // Try LibreTranslate first
    try {
      translatedText = await translateWithLibreTranslate(
        text,
        sourceLang,
        targetLang
      );
    } catch (libreError) {
      console.log("LibreTranslate failed, trying fallback...", libreError);

      // Fallback to MyMemory API
      try {
        translatedText = await translateWithMyMemory(
          text,
          sourceLang,
          targetLang
        );
      } catch (fallbackError) {
        console.error("All translation APIs failed:", fallbackError);
        return NextResponse.json(
          {
            error: "Translation services unavailable. Please try again later.",
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({
      translatedText,
      sourceLang,
      targetLang,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
