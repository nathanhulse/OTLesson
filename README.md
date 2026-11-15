# Dare to Be a Daniel — Daniel 1–7 phone game

Kahoot-style class game for Come, Follow Me (Nov 9–15, Daniel 1–7).
17 scored questions + 2 polls + 5 story/discussion slides, with art from the
Gospel Library, Come, Follow Me, Scripture Helps and Old Testament Stories.

## Run it on Render (same as OTLesson)
1. Make a new GitHub repo (e.g. `daniel-lesson`) and upload these files — all flat, no folders:
   `server.js`, `deck.js`, `dura.js`, `host.html`, `index.html`, `review.html`, `package.json`, `package-lock.json`
2. Render → New → Web Service → pick the repo. Build `npm install`, Start `npm start`, Free tier.
3. Projector: `https://YOUR-APP.onrender.com/host`  ·  Phones: scan the QR on that screen.
   Review of every question: `https://YOUR-APP.onrender.com/review` (also a button on the host screen).

Free Render instances sleep — open the /host page 2 minutes before class.

(Or replace the files in your existing OTLesson repo with these; Render will redeploy
otlesson.onrender.com automatically. The NBA draft game stays in the repo's history.)

## In class
- Click **Sound on** once (browsers need a click before audio).
- **Next ▶** / Space / → advances; ← goes back. Questions auto-reveal when time runs out
  or everyone has answered. A leaderboard pops up every 3 questions.
- Phones that drop out can reload and tap Join — they keep their score.

## Editing
Everything (questions, answers, art, teaching notes, discussion prompts) is in `deck.js`.
Time per question: `QUESTION_SECONDS` at the top of `server.js` (default 25).
