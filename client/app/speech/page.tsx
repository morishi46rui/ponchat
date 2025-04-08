'use client';

import dynamic from 'next/dynamic';

const DynamicSpeechInput = dynamic(() => import('./SpeechInput').then((mod) => mod.SpeechInput), {
  ssr: false,
});

export default function SpeechPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>🎙 PonChat 音声入力</h1>
      <DynamicSpeechInput />
    </main>
  );
}
