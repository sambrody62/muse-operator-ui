const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your ElevenLabs API key
const API_KEY = 'sk_34db8a8aae93d04396d8a6a65850141d46da9f1dcf6424d8';
const VOICE_ID = 'ashjVK50jp28G73AUTnb';

// New Scene 6 text
const newScene6Text = "Watch Sarah's transformation. What normally takes three full days just happened in fifteen minutes. Every document created, every strategy perfected, every task completed. Sarah isn't just meeting deadlines anymore - she's setting the pace. This is Sarah supercharged. This is the future of work where human creativity meets AI acceleration.";

const audioDir = path.join(__dirname, '..', 'public', 'audio');

async function generateScene6Audio() {
  try {
    console.log('🎙️ Generating new audio for Scene 6...\n');
    console.log('Text:', newScene6Text);
    console.log('\n');
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: newScene6Text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.25,
          similarity_boost: 0.85,
          style: 0.95,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        responseType: 'stream'
      }
    );

    const filePath = path.join(audioDir, 'scene-system-complete.mp3');
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('✅ Successfully generated new audio for Scene 6');
        console.log(`📁 Saved to: ${filePath}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('❌ Error generating audio:', error.message);
    throw error;
  }
}

// Run the script
generateScene6Audio().catch(console.error);