import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    // MyMemory API 
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Translation API request failed');
    }

    const data = await response.json();
    
    if (data.responseStatus !== 200) {
      throw new Error('Translation failed');
    }

    return NextResponse.json({
      translatedText: data.responseData.translatedText,
      sourceLanguage: 'en',
      targetLanguage: targetLang,
      matches: data.matches?.length || 0
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed. Please try again.' },
      { status: 500 }
    );
  }
}
