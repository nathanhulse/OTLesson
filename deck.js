// ─────────────────────────────────────────────────────────────
//  "Dare to Be a Daniel" — Daniel 1–7 (Come, Follow Me, Nov 9–15)
//  Edit this file to change questions, art, or teaching notes.
//
//  Item types:
//    story  – a host-only slide (art + short story + discussion prompt).
//             Phones show "Eyes on the screen".
//    q      – a scored question. `correct` is the index (0–3) of the right answer.
//    poll   – no right answer, no points; shows how the class voted.
//
//  Art: images load straight from churchofjesuschrist.org (Gospel Library /
//  Come, Follow Me / Old Testament Stories). `art: "dura"` uses the built-in
//  illustration of the crowd on the plain of Dura.
// ─────────────────────────────────────────────────────────────

const IMG = (id) => `https://www.churchofjesuschrist.org/imgs/${id}/full/%21900%2C/0/default`;

module.exports = [
  // ── DANIEL 1 ────────────────────────────────────────────────
  {
    type: "story",
    eyebrow: "Daniel 1:1–4",
    title: "Welcome to Babylon",
    art: IMG("9eb4a5686225f316bd407e6ba1347b84bf0d4609"),
    caption: "Old Testament Stories: Daniel and His Friends",
    body: "About 600 years before Jesus was born, the armies of Babylon surrounded Jerusalem. King Nebuchadnezzar carried away treasures from the temple — and some of the best young men from Judah's noble families.",
    prompt: "Imagine being 13 or 14, taken hundreds of miles from home, with no family, no temple, and nobody who believes what you believe. What would be hardest?",
  },
  {
    type: "q",
    eyebrow: "Daniel 1:1–6",
    question: "How did Daniel and his friends end up in Babylon?",
    answers: [
      "They moved there to go to a famous school",
      "Nebuchadnezzar conquered Jerusalem and carried them away",
      "Their ship was blown off course",
      "They were sent there as missionaries",
    ],
    correct: 1,
    art: IMG("2c194416fdfd3eb21e80238d0083d643615ae2c8"),
    caption: "Old Testament Stories: young men in the king's court",
    explain: "The king chose young men who were smart, healthy and from royal families, to be trained for 3 years in the language and learning of the Chaldeans so they could serve in his palace.",
  },
  {
    type: "q",
    eyebrow: "Daniel 1:7",
    question: "The Babylonians gave Daniel a new name. What was it?",
    answers: ["Belshazzar", "Shadrach", "Belteshazzar", "Nebuchadnezzar"],
    correct: 2,
    art: IMG("65a83e79b3d7b2c09a0d698ca02d06f58f6eca5e"),
    caption: "Daniel in the King's Court, by Simon Vedder",
    explain: "Daniel → Belteshazzar  ·  Hananiah → Shadrach  ·  Mishael → Meshach  ·  Azariah → Abed-nego. (Careful: Belteshazzar was Daniel. Belshazzar was a king!)",
  },
  {
    type: "q",
    eyebrow: "Daniel 1:7; 4:8",
    question: "Why would the Babylonians change their names?",
    answers: [
      "Their Hebrew names were too hard to spell",
      "It was a reward for getting good grades",
      "To swap names that honored Israel's God for names honoring Babylon's gods",
      "To hide them from their families",
    ],
    correct: 2,
    art: IMG("b5670bb10b6a9b70e1ca8c3808ed79be022e23fd"),
    caption: "Old Testament Stories: Daniel and his friends studying",
    explain: "Daniel means \"God is my judge.\" Hananiah: \"the Lord is gracious.\" Azariah: \"the Lord has helped.\" Their new names pointed to Babylonian gods — Abed-nego likely means \"servant of Nebo.\" The king even said Daniel was named \"according to the name of my god\" (Daniel 4:8). Babylon could change their names — but not their hearts.",
  },
  {
    type: "story",
    eyebrow: "Think about it",
    title: "Who decides who you are?",
    art: IMG("e0f7931dc264a5907b4b9746a9071712b615b5df"),
    caption: "Old Testament Stories: Daniel talking to the king's servant",
    body: "Babylon tried to turn these boys into Babylonians: new names, new language, new food, new gods. At baptism, we take upon us a different name — the name of Jesus Christ.",
    prompt: "What are some ways the world tries to \"rename\" you — telling you who you are or what matters?",
  },
  {
    type: "q",
    eyebrow: "Daniel 1:8",
    question: "Daniel \"purposed in his heart\" not to eat the king's food. Why?",
    answers: [
      "He was a picky eater",
      "It may have been offered to idols and broke the Lord's laws",
      "He knew it was poisoned",
      "He was fasting for a mission call",
    ],
    correct: 1,
    art: IMG("13266947fbff11ed9c22eeeeac1ec0c26186e250"),
    caption: "Daniel Refusing the King's Meat and Wine, by Del Parson",
    explain: "He didn't want to \"defile himself.\" The king's meat and wine may have been offered to Babylonian gods first, and some of it broke the food laws the Lord gave Israel. It was his own \"Word of Wisdom\" moment — and he asked politely and respectfully.",
  },
  {
    type: "q",
    eyebrow: "Daniel 1:12–20",
    question: "Daniel asked for a 10-day test. What did they eat instead?",
    answers: ["Bread and honey", "Pulse (vegetables and grains) and water", "Fish and figs", "Nothing — they fasted"],
    correct: 1,
    art: IMG("2dfca7a23e32113c1f6415306a77f795c5c36da6"),
    caption: "Daniel and the King's Meat, by Brian Call",
    explain: "After 10 days they looked healthier than everyone eating the king's food. And God gave them \"knowledge and skill in all learning\" — the king found them TEN times better than all his wise men (Daniel 1:17–20).",
  },

  // ── DANIEL 2 ────────────────────────────────────────────────
  {
    type: "story",
    eyebrow: "Daniel 2",
    title: "The King's Dream",
    art: IMG("09a7b376130e11efa101eeeeac1e8344d5564be6"),
    caption: "Daniel Interprets Nebuchadnezzar's Dream, by Grant Romney Clawson",
    body: "The king dreamed of a giant statue: head of gold, chest of silver, belly of brass, legs of iron, feet of iron and clay. A stone \"cut out without hands\" smashed it. Daniel and his friends prayed, and God showed Daniel the dream and its meaning.",
    prompt: "Nebuchadnezzar said, \"Of a truth it is, that your God is a God of gods\" (Daniel 2:47). Remember that — it matters later.",
  },
  {
    type: "q",
    eyebrow: "Daniel 2:44–45",
    question: "The stone grew into a mountain and filled the whole earth. What does it represent?",
    answers: ["Babylon's army", "A volcano", "The kingdom of God — the Lord's Church in the last days", "The Tower of Babel"],
    correct: 2,
    art: IMG("envzrtojraz41rmizhx0baupn4b8uirpwse4sg0h"),
    caption: "Old Testament Stories: Daniel and the King's Dream",
    explain: "Kingdoms of gold, silver and iron all fall. The kingdom God sets up \"shall never be destroyed.\" Latter-day prophets teach this is The Church of Jesus Christ of Latter-day Saints rolling forth to fill the earth (D&C 65:2).",
  },

  // ── DANIEL 3 ────────────────────────────────────────────────
  {
    type: "story",
    eyebrow: "Daniel 3:1–7",
    title: "The Plain of Dura",
    art: "dura",
    caption: "Illustration: the crowd bowing on the plain of Dura",
    body: "Nebuchadnezzar set up a huge golden image on the plain of Dura and gathered every leader in the empire. When the music played, everyone had to fall down and worship it — or be thrown into a burning fiery furnace.",
    prompt: "Picture thousands of people bowing all at once… and three young men still standing.",
  },
  {
    type: "q",
    eyebrow: "Daniel 3:1",
    question: "About how tall was the golden image?",
    answers: ["About 6 feet — life size", "About 90 feet (60 cubits)", "About 9 inches", "About 1,000 feet"],
    correct: 1,
    art: IMG("7fdbd0635a48c0fb11201179904dd20269b700c8"),
    caption: "Old Testament Stories: King Nebuchadnezzar and the golden statue",
    explain: "60 cubits tall and 6 cubits wide — roughly a 9-story building, covered in gold, on a flat plain where everyone could see it.",
  },
  {
    type: "q",
    eyebrow: "Daniel 3:12–18",
    question: "Was the golden statue an image of Nebuchadnezzar himself?",
    answers: [
      "Yes — the Bible clearly says it was him",
      "No — it was a statue of Daniel",
      "The Bible doesn't say — it was tied to his gods, and maybe to himself",
      "It was a statue of a golden lion",
    ],
    correct: 2,
    art: IMG("h0uqwwb9ejx2v75281jf89s5d02ouws9d3epaaej"),
    caption: "Three Refuse to Bow, Review & Herald Publishing",
    explain: "The king's charge was that they \"serve not thy gods, nor worship the golden image\" (3:12, 14, 18) — so it was bound up with Babylon's gods. Many scholars think it honored his god (Nabu or Marduk) or the king himself. Some think he was copying his dream — but making the WHOLE statue gold, as if his kingdom would never fall. Either way: bowing meant putting the king above God.",
  },
  {
    type: "poll",
    eyebrow: "Be honest",
    question: "If you were on that plain, what would make it hardest to stay standing?",
    answers: [
      "Everyone else is doing it",
      "Being scared of getting in trouble",
      "Not wanting to stand out",
      "Thinking \"it's just one time\"",
    ],
    art: "dura",
    caption: "Illustration: the plain of Dura",
    explain: "Each of these is a real kind of pressure. Spiritual courage isn't not feeling afraid — it's choosing God while you're afraid.",
  },
  {
    type: "q",
    eyebrow: "Daniel 3:16–18",
    question: "What did Shadrach, Meshach and Abed-nego tell the king?",
    answers: [
      "\"Give us a day to think about it.\"",
      "\"Our God is able to deliver us… but if not, we will not serve thy gods.\"",
      "\"We'll bow, but we won't really mean it.\"",
      "\"Please don't tell our parents.\"",
    ],
    correct: 1,
    art: IMG("7e687216b3d134c4a7bf72f979028f5fa220ce8e"),
    caption: "Old Testament Stories: the three friends talking to the king",
    explain: "\"But if not.\" They trusted God could save them — and they decided to obey even if He didn't. Their faith didn't depend on the outcome.",
  },
  {
    type: "q",
    eyebrow: "Daniel 3:19–22",
    question: "The king was so angry he had the furnace heated how much hotter than usual?",
    answers: ["2 times", "7 times", "10 times", "100 times"],
    correct: 1,
    art: IMG("c8c52f0837f254d72ed575e09b82486f9c6d3323"),
    caption: "Three Men in the Fiery Furnace, by William Maughan",
    explain: "Seven times hotter — so hot that the soldiers who threw them in were killed by the flames.",
  },
  {
    type: "q",
    eyebrow: "Daniel 3:24–27",
    question: "When the king looked into the furnace, who did he see?",
    answers: [
      "Only the three friends",
      "Daniel, who had jumped in to help",
      "Four men walking in the fire — the fourth \"like the Son of God\"",
      "Nobody — they had escaped",
    ],
    correct: 2,
    art: IMG("09995b92130e11efb6bbeeeeac1efc1e3ef08cdf"),
    caption: "Shadrach, Meshach, and Abed-nego in the Fiery Furnace, by William Maughan",
    explain: "They weren't alone in the fire. Not a hair was singed, their coats weren't burned, and they didn't even smell like smoke! \"When thou walkest through the fire, thou shalt not be burned\" (Isaiah 43:2).",
  },

  // ── DANIEL 4 ────────────────────────────────────────────────
  {
    type: "q",
    eyebrow: "Daniel 4:29–33",
    question: "Nebuchadnezzar praised God in chapter 2 AND chapter 3. What happened in chapter 4?",
    answers: [
      "He became a prophet",
      "He bragged \"Is not this great Babylon, that I have built?\" and lost his mind",
      "He moved to Jerusalem",
      "He gave his throne to Daniel",
    ],
    correct: 1,
    art: IMG("b3d5029087ebb18a0988002ff74853bfc3b3d315"),
    caption: "Old Testament Stories: the king dreaming",
    explain: "Pride took over. He was driven out, \"did eat grass as oxen,\" and his hair grew like eagles' feathers — until he finally admitted \"the most High ruleth\" and praised God (4:34–37).",
  },
  {
    type: "q",
    eyebrow: "Discussion",
    question: "Why didn't Nebuchadnezzar \"stick with\" the lessons God kept giving him?",
    answers: [
      "God stopped trying to teach him",
      "Miracles impressed him, but pride kept him from really changing",
      "Daniel moved away",
      "He never actually saw any miracles",
    ],
    correct: 1,
    art: IMG("0d4139e935a3a02d90b7e1559b3784ec490ae50a"),
    caption: "Old Testament Stories: the king thinking",
    explain: "Seeing a miracle isn't the same as being converted. He felt something each time — then went right back to his old ways. A testimony grows when we ACT on what we feel: pray, read, repent, obey. What \"spiritual moments\" have you had that you need to keep acting on?",
  },

  // ── DANIEL 5 ────────────────────────────────────────────────
  {
    type: "story",
    eyebrow: "Daniel 5",
    title: "The Writing on the Wall",
    art: IMG("bf3da1678d445e6928111ff4a367a4b8cfafc661"),
    caption: "Belshazzar Sees the Finger Writing on the Wall, by Robert T. Barrett",
    body: "Years later, King Belshazzar threw a huge party for a thousand lords. In the middle of it, the fingers of a man's hand appeared and wrote on the palace wall. The king's knees literally knocked together! None of his wise men could read it — so they sent for Daniel, now an old man.",
    prompt: "Daniel refused the king's rewards: \"Let thy gifts be to thyself\" (5:17). Why might that matter?",
  },
  {
    type: "q",
    eyebrow: "Daniel 5:2–4, 23",
    question: "What did Belshazzar do at his party that offended God?",
    answers: [
      "Forgot to invite Daniel",
      "Drank from the sacred cups taken from the Lord's temple while praising idols",
      "Played the music too loud",
      "Was rude to the queen",
    ],
    correct: 1,
    art: IMG("88cf6953ee6296727f129067c942f861b41c9f28"),
    caption: "Daniel Interpreting the Writing on the Wall, by Gustave Doré",
    explain: "He mocked holy things. Daniel told him: \"thou… hast not humbled thine heart, though thou knewest all this\" (5:22). He KNEW what happened to Nebuchadnezzar — and did it anyway.",
  },
  {
    type: "q",
    eyebrow: "Daniel 5:25–28",
    question: "MENE, MENE, TEKEL, UPHARSIN. What did TEKEL mean?",
    answers: [
      "\"The party is over\"",
      "\"Your kingdom will last forever\"",
      "\"Thou art weighed in the balances, and art found wanting\"",
      "\"Daniel is the new king\"",
    ],
    correct: 2,
    art: IMG("bf3da1678d445e6928111ff4a367a4b8cfafc661"),
    caption: "Belshazzar Sees the Finger Writing on the Wall, by Robert T. Barrett",
    explain: "MENE: God has numbered your kingdom and finished it. TEKEL: weighed and found too light. PERES: your kingdom is divided and given to the Medes and Persians. That very night Belshazzar was killed, and Darius the Mede took the kingdom (5:30–31).",
  },

  // ── DANIEL 6 ────────────────────────────────────────────────
  {
    type: "q",
    eyebrow: "Daniel 6",
    question: "Which king had Daniel thrown into the lions' den?",
    answers: ["Nebuchadnezzar", "Belshazzar", "Darius", "Pharaoh"],
    correct: 2,
    art: IMG("162a9d68612111edb5d5eeeeac1e9c0a052e950d"),
    caption: "Daniel and the Lion's Den, by Clark Kelley Price",
    explain: "Darius the Mede actually loved Daniel and wanted to promote him over the whole kingdom! Jealous leaders tricked Darius into signing a law that couldn't be changed. Darius worked until sundown trying to save him, then fasted all night.",
  },
  {
    type: "q",
    eyebrow: "Daniel 6:7–10",
    question: "What was Daniel's \"crime\"?",
    answers: [
      "Stealing from the king's treasury",
      "Refusing to bow to the golden statue",
      "Praying to God three times a day, windows open, just as he always had",
      "Reading the writing on the wall wrong",
    ],
    correct: 2,
    art: IMG("2ml5hmtj7c8jwtdidkyzu045hm8q5df2vx60vzrv"),
    caption: "As He Did Aforetime, by Eva Timothy",
    explain: "He didn't hide and he didn't show off — he simply kept praying \"as he did aforetime\" (6:10). In the morning: \"My God hath sent his angel, and hath shut the lions' mouths\" (6:22).",
  },

  // ── WRAP-UP ─────────────────────────────────────────────────
  {
    type: "poll",
    eyebrow: "Spiritual courage",
    question: "Whose courage do you most want this week?",
    answers: [
      "Daniel at the king's table — saying no politely",
      "The three friends — standing when everyone bows",
      "Daniel before Belshazzar — telling the truth",
      "Daniel in Darius's court — praying no matter what",
    ],
    art: IMG("0fd22fb00e5efab8ae1860b08a8e65666f2fbbe6"),
    caption: "Daniel in the Lions' Den, by Briton Rivière",
    explain: "\"Be strong and of a good courage… for the Lord thy God is with thee whithersoever thou goest\" (Joshua 1:9). Where is YOUR plain of Dura this week?",
  },
];
