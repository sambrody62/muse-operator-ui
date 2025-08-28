const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your ElevenLabs API key
const API_KEY = 'sk_34db8a8aae93d04396d8a6a65850141d46da9f1dcf6424d8';
const VOICE_ID = 'ashjVK50jp28G73AUTnb';

// Scene explainer texts
const scenes = [
  {
    id: 'scout-research',
    description: 'Meet Sarah, a marketing manager drowning in deadlines. She needs competitive research that usually takes her entire morning. Watch as Scout instantly analyzes thousands of social posts, finding exactly what competitors are doing right now.'
  },
  {
    id: 'muse-strategy',
    description: 'Sarah just saved six hours on research, but now she faces another challenge. She needs a complete campaign strategy by lunch. Her boss expects a detailed roadmap that would normally take two full days to develop. Enter Muse, the strategic mastermind.'
  },
  {
    id: 'echo-scout-collab',
    description: 'Something amazing happens next. Sarah needs personalized influencer outreach, but Echo realizes she needs specific research first. Watch as Echo asks Scout for help, and they collaborate in real time. This is where AI teamwork becomes magical.'
  },
  {
    id: 'echo-content',
    description: 'The clock is ticking. Sarah has strategy and influencer outreach ready, but she still needs launch content. Writing the perfect brand message usually means three hours of drafts, revisions, and second guessing. Echo is about to change everything.'
  },
  {
    id: 'atlas-compliance',
    description: 'Sarah has everything ready, but there is one final hurdle. Legal compliance. Usually this means sending everything to legal and waiting two weeks for approval. One wrong claim could mean starting over. Atlas, the guardian of compliance, steps in for the final check.'
  },
  {
    id: 'system-complete',
    description: 'Look at what just happened. Sarah completed a three day project in fifteen minutes. Every task in ClickUp has been updated automatically. The entire Nucleus system now has her campaign ready to deploy. This is not about replacing Sarah. This is about making her unstoppable.'
  }
];

// Create audio directory in public folder
const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

async function generateAudio(text, filename) {
  try {
    console.log(`Generating audio for: ${filename}`);
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: text,
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

    const filePath = path.join(audioDir, filename);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Saved: ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    throw error;
  }
}

async function downloadAllAudio() {
  console.log('🎙️ Starting audio generation...\n');

  for (const scene of scenes) {
    const filename = `scene-${scene.id}.mp3`;
    
    try {
      await generateAudio(scene.description, filename);
      // Wait 1 second between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate audio for scene ${scene.id}`);
    }
  }

  console.log('\n✨ Audio generation complete!');
  console.log(`📁 Audio files saved to: ${audioDir}`);
}

// Run the script
downloadAllAudio().catch(console.error);