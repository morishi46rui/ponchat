'use client';

import { Button, Space, Typography } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const { Text, Paragraph } = Typography;

export const SpeechInput: React.FC = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Text type="danger">ブラウザが音声認識に対応していません。</Text>;
  }

  return (
    <div id="react-speech-recognition" style={{ marginTop: '1rem' }}>
      <Paragraph>
        <Text strong>入力状態：</Text>
        <Text type={listening ? 'success' : 'secondary'}>{listening ? '🎧 on' : 'off'}</Text>
      </Paragraph>

      <Space direction="horizontal" size="middle" wrap>
        <Button
          type="primary"
          onClick={() => SpeechRecognition.startListening({ language: 'ja-JP' })}
        >
          入力開始
        </Button>
        <Button danger onClick={() => SpeechRecognition.stopListening()}>
          停止
        </Button>
        <Button onClick={() => resetTranscript()}>リセット</Button>
      </Space>

      <Paragraph style={{ marginTop: '1rem' }}>
        <Text strong>認識結果：</Text>
        <Text>{transcript}</Text>
      </Paragraph>
    </div>
  );
};
