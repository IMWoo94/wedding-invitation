# Wedding animation production plan

Created: 2026-05-09 KST
Updated: 2026-05-09 KST
Project: wedding invitation video
Current target: 10-second character/look test
Future targets: 30 seconds, 1 minute, then up to 2 minutes
Tool direction: Gemini / Flow

## Locked decisions

- Character likeness: 실제 얼굴과 꽤 닮게
- Aspect ratios: both 16:9 and 9:16
  - 16:9: 결혼식장 스크린 / 식전·식중 영상
  - 9:16: 인스타 릴스 / 모바일 공유용
- Clothing:
  - early story scenes: casual dating outfits
  - final frame only: wedding-inspired outfit
- Tool: Gemini / Flow
- Korean text: generate without text inside the AI video; add Korean captions later in editing software

## Direction

First create a 10-second version to test:

- character design and face resemblance
- fairytale animation mood
- casual-to-wedding outfit transition
- city/puzzle metaphor readability
- both 16:9 and 9:16 composition safety
- whether the generated style feels warm, elegant, and not too childish

If the 10-second output looks right, expand the same visual system into:

1. 30-second emotional wedding prelude
2. 1-minute story version
3. 2-minute full 식전/식중 영상 version

## Important style rule

Do not directly request "Disney style" or "Pixar style" in generation prompts.

Use safe wording:

- warm fairytale 3D animation
- original family animation film mood
- soft romantic wedding animation
- storybook-like cinematic animation
- whimsical original 3D characters
- gentle pastel fairytale world

Avoid:

- Disney style
- Pixar style
- exact Disney character
- specific Disney/Pixar movie names
- Mickey, princess, Elsa-like, etc.

## Reference photo requirements

Because the desired likeness is "실제 얼굴과 꽤 닮게", Gemini / Flow should receive reference photos before the character design step.

Recommended reference set:

- groom: 2-3 clear front-facing photos
- bride: 2-3 clear front-facing photos
- couple photo together: 1-2 photos if available
- optional: full-body or outfit reference photo for casual dating mood
- optional: preferred wedding outfit reference

Reference photo guidelines:

- bright, natural lighting
- face not covered by sunglasses/mask/heavy filter
- similar age/current appearance
- neutral or gentle smile
- avoid extreme angle selfies if possible

If only one photo per person is available, still proceed, but expect likeness to be less stable.

## Gemini / Flow recommended workflow

### Step 1: create character reference image

Goal:
Create one stable fairytale-style couple reference that resembles the real couple.

Input:
- reference photos of groom and bride
- character design prompt below

Output:
- one 16:9 composition with both characters visible
- if the tool supports it, also export a clean character reference / portrait version

Check:
- groom/bride are distinguishable
- faces resemble the couple without becoming uncanny
- style is elegant enough for wedding use
- clothing is casual, not wedding attire yet

### Step 2: create 4 keyframes

Create keyframes using the approved character reference:

1. chance meeting in Daegu
2. storybook Korea map with city movement
3. puzzle pieces fitting in Seoul
4. wedding arch final frame

Generate each keyframe in both framing-safe layouts:

- 16:9 master
- 9:16 mobile crop or native 9:16 version

### Step 3: generate 10-second video

Best approach:

- Generate each shot as 2-3 second clips instead of one continuous 10-second clip.
- Keep camera motion slow.
- Keep character movement minimal and graceful.
- Do not ask the model to create Korean text.
- Add Korean captions later in CapCut / Premiere / DaVinci.

### Step 4: edit and export

Create two exports:

- 16:9, 1920x1080, 10 seconds
- 9:16, 1080x1920, 10 seconds

Use the same music/caption timing where possible.

## 10-second test structure

Title: 10년의 퍼즐

Core idea:
Two people met by chance in Daegu. Over 10 years, work and life moved them through different city combinations: Daegu-Daegu, Seoul-Daegu, Daejeon/Sejong-Daegu, and finally Seoul-Seoul. Their story is visualized as two glowing puzzle pieces slowly finding their place.

### Shot 1: Chance meeting in Daegu

Duration: 0.0-2.0s

Visual:
A warm Daegu street at sunset. The couple appears in casual dating outfits. Two original Korean fairytale-style characters cross paths. Two small glowing puzzle pieces fall near their feet.

Text overlay:
우연히 만난 두 사람

Purpose:
Test character design, facial warmth, first-meeting tone.

### Shot 2: Distance across cities

Duration: 2.0-5.0s

Visual:
A magical storybook map of Korea opens. One puzzle piece moves to Seoul, then Daejeon/Sejong. The other stays in Daegu. A glowing train line and tiny phone lights connect them.

Text overlay:
대구, 서울, 대전과 세종을 지나

Purpose:
Test map/puzzle metaphor and whether the 10-year distance is understandable quickly.

### Shot 3: Puzzle fits in Seoul

Duration: 5.0-8.0s

Visual:
All city lights move toward Seoul. Two puzzle pieces finally fit together. The completed puzzle softly transforms into a floral wedding arch.

Text overlay:
십 년의 시간이 맞춰지고

Purpose:
Test emotional payoff and transition into wedding imagery.

### Shot 4: Wedding final frame

Duration: 8.0-10.0s

Visual:
The couple now appears in wedding-inspired outfits. They stand under the floral wedding arch, holding hands and facing the guests. Flower petals and tiny stars fall slowly. Leave clean center space for title text.

Text overlay:
누리 ❤ 상민
2027.01.31

Purpose:
Test final title composition for actual wedding playback.

## Character design prompt for Gemini / Flow

Use this first with the couple's reference photos.

Prompt:

Using the provided reference photos, create an original warm fairytale 3D animated character design of this Korean couple for a wedding video. Preserve recognizable facial features from the references: face shape, hairstyle impression, eye shape, smile, and overall warmth, while transforming them into elegant original fairytale animation characters. The groom should look like the man in the reference photos: kind expression, gentle smile, neat black hair, clean casual dating outfit with soft modern details. The bride should look like the woman in the reference photos: warm smile, soft natural hair, elegant casual dating outfit with subtle romantic details. Make them resemble the real couple clearly, but keep the result tasteful, soft, and not uncanny. Original family animation film mood, pastel color palette, cinematic soft lighting, expressive eyes, romantic but not childish, clean character reference composition, no copyrighted characters, no specific studio style, no text.

Negative prompt:

Disney, Pixar, Mickey, princess, Elsa, Frozen, exact copyrighted character, existing animated movie character, exaggerated cartoon, plastic toy look, uncanny face, distorted hands, extra fingers, wrong ethnicity, different person, face mismatch, text, logo, watermark, harsh lighting, overly flashy colors.

## 10-second video master prompt for Gemini / Flow

Use after character direction is approved.

Prompt:

Using the approved character reference of the Korean couple, create a 10-second warm fairytale 3D animated wedding prelude about their chance meeting and 10-year relationship. Keep the groom and bride consistent with the reference faces throughout the video. The story begins on a soft sunset street in Daegu where they accidentally meet in casual dating outfits and two glowing puzzle pieces appear. A storybook map of Korea opens, showing their long-distance journey through Daegu, Seoul, Daejeon and Sejong with glowing train lines and phone lights connecting them. The two puzzle pieces finally come together in Seoul and transform into a beautiful floral wedding arch. In the final scene, the couple appears in elegant wedding-inspired outfits and stands hand in hand under the arch as soft petals and tiny stars fall. Original family animation film mood, romantic, elegant, pastel tones, cinematic lighting, gentle camera movement, soft depth of field, no copyrighted characters, no text inside the video, leave clean space for Korean title overlay at the end.

Negative prompt:

Disney, Pixar, copyrighted characters, existing animated movie style, logos, watermarks, readable text, misspelled text, distorted faces, face inconsistency, different people between shots, extra fingers, scary eyes, childish slapstick, over-saturated colors, fast chaotic motion, flickering characters, inconsistent clothing.

## Shot prompts

Use these if generating clip by clip.

### Shot 1 prompt: chance meeting in Daegu

Using the approved character reference of the Korean couple, create a warm fairytale-like 3D animated Daegu street at sunset. The groom and bride resemble the reference photos and wear casual dating outfits. They accidentally meet on a small glowing path and smile shyly and naturally. Two small glowing puzzle pieces fall near their feet. Cherry blossom petals drift slowly. Original romantic family animation mood, pastel tones, soft cinematic lighting, gentle camera push-in, no text, no copyrighted characters.

### Shot 2 prompt: city distance

Using the approved character reference of the Korean couple, create a magical storybook map of Korea in a warm 3D animated style. Show their long-distance relationship visually: one glowing puzzle piece moves from Daegu to Seoul, then toward Daejeon and Sejong, while another puzzle piece remains connected to Daegu. Sparkling train lines and tiny phone lights connect the cities. Include small soft silhouettes or tiny portrait-like symbols of the couple at each end, consistent with the reference characters. Tender long-distance love story mood, soft golden light, subtle stars, elegant wedding prelude feeling, no text, no copyrighted characters.

### Shot 3 prompt: puzzle fits in Seoul

Using the approved character reference of the Korean couple, create a glowing storybook map where city lights from Daegu, Seoul, Daejeon and Sejong gently flow toward Seoul. Two puzzle pieces slowly come closer and fit perfectly together. The completed puzzle begins transforming into a floral wedding arch. The couple appears nearby in casual outfits, watching the puzzle complete with a warm smile. Warm emotional 3D fairytale animation, soft petals, cinematic lighting, gentle camera movement, no text, no copyrighted characters.

### Shot 4 prompt: wedding final frame

Using the approved character reference of the Korean couple, create a warm fairytale 3D animated wedding final frame. The couple now wears elegant wedding-inspired outfits, not overly formal but clearly bridal and groom-like. They stand hand in hand under a beautiful floral wedding arch and gently turn toward the viewer as if greeting wedding guests. Soft golden light, flower petals and tiny stars fall slowly. Keep their faces consistent with the reference photos. Elegant romantic final frame, clean center or lower-third space for Korean title overlay, pastel colors, soft depth of field, no text, no copyrighted characters.

## Aspect ratio notes

### 16:9 version

Use for wedding venue screen.

Composition:

- Keep faces near the center third.
- Leave lower third or center-right negative space for Korean captions.
- Map shots can use horizontal city movement.
- Final title can sit center or lower third.

Prompt add-on:

16:9 horizontal cinematic composition, wedding venue screen safe framing, faces centered, clean lower-third space for Korean caption overlay.

### 9:16 version

Use for reels/mobile.

Composition:

- Keep characters stacked vertically or centered.
- Avoid placing important city labels/objects at far left/right.
- Map should be simplified vertically.
- Final title should sit below the couple or in the upper empty space.

Prompt add-on:

9:16 vertical mobile composition, reels-friendly framing, couple centered, important objects inside the center safe area, clean upper or lower space for Korean caption overlay.

## Korean text overlay

Recommended to add in editing software rather than AI generation.

Option A: simple

1. 우연히 만난 두 사람
2. 대구, 서울, 대전과 세종을 지나
3. 십 년의 시간이 맞춰지고
4. 누리 ❤ 상민
   2027.01.31

Option B: more emotional

1. 우연히 시작된 인연
2. 서로 다른 도시에서 서로를 기다린 시간
3. 십 년 동안 우리는 같은 그림이 되었고
4. 이제 부부라는 이름으로 시작합니다

Option C: minimal wedding-screen version

1. 우연히 시작된 우리
2. 10년의 시간
3. 하나의 그림이 되어
4. 누리 ❤ 상민
   2027.01.31

## 10-second acceptance criteria

The 10-second test is successful if:

- Characters resemble the real couple enough to feel personal.
- Resemblance is warm and flattering, not uncanny.
- Characters look consistent across all 4 shots.
- Casual outfits work in the story scenes.
- Wedding-inspired final outfit feels natural and not abrupt.
- The animation does not look like a children's gag cartoon.
- City movement and puzzle metaphor are understandable without explanation.
- Both 16:9 and 9:16 versions preserve faces and important objects.
- The final wedding arch frame feels suitable for a real ceremony screen.
- Text can be overlaid cleanly without covering faces.
- The look can plausibly be extended to 30 seconds or longer.

If not successful, adjust in this order:

1. Character reference and likeness
2. Face consistency across shots
3. Color/mood
4. Camera movement speed
5. Puzzle/map clarity
6. Final frame composition

## Expansion plan

### 30-second version

Best for first emotional wedding version.

Structure:

- 0-5s: Chance meeting in Daegu
- 5-10s: Early dating in Daegu
- 10-15s: Seoul-Daegu long distance
- 15-20s: Daejeon/Sejong-Daegu long distance
- 20-25s: Seoul-Seoul, puzzle fits
- 25-30s: Wedding invitation final message

### 1-minute version

Best for a complete short story.

Adds:

- more dating memories
- seasons changing over 10 years
- trains, calls, waiting, reunions
- families/friends appearing near the final wedding scene

### 2-minute version

Best for full 식전/식중 영상.

Potential structure:

- 0:00-0:15: Opening fairytale book / Daegu
- 0:15-0:35: Chance meeting and early dating
- 0:35-0:55: First long distance, Seoul-Daegu
- 0:55-1:15: Daejeon/Sejong-Daegu chapter
- 1:15-1:35: Reunion in Seoul
- 1:35-1:50: 10 years of memories become puzzle pieces
- 1:50-2:00: Wedding arch and invitation message

## Next needed from user

To create the first Gemini / Flow character test, collect:

1. groom reference photos, preferably 2-3
2. bride reference photos, preferably 2-3
3. optional couple photo together
4. whether to make the first test 16:9 first or 9:16 first

Default next action:

Start with the 16:9 character reference and first 10-second storyboard stills, then adapt to 9:16 once the look is approved.
