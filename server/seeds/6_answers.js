'use strict';

const answersList = [
  { id: 1,
    review_question_id: 1,
    user_id: 4,
    title: 'Not altogether indistinct',
    answer: 'As to Twentieth-first century web development, and the websites which I expect to see built during the next decade or so, it will, I think, move against poppy-cock, it will be harder and saner, it will be what Mr Hewlett calls \'nearer the bone\'. It will be as much like granite as it can be, its force will lie in its truth, its interpretative power (of course, digital force does always rest there); I mean it will not try to seem forcible by rhetorical din, and luxurious riot. We will have fewer painted adjectives impeding the shock and stroke of it. At least for myself, I want it so, austere, direct, free from emotional slither.',
    watson_analysis: '{ "document_tone":{"tones":[{"score": 0.790686,"tone_id":"sadness","tone_name": "Sadness"},{"score": 0.607828,"tone_id": "analytical","tone_name": "Analytical"}]}}',
    contact_okay: true,
    created_at: new Date('2017-09-25 14:26:16 UTC'),
    updated_at: new Date('2017-09-25 14:26:16 UTC'),
    deleted_at: null
  },
  {
    id: 2,
    review_question_id: 2,
    user_id: 3,
    title: 'Soapbox',
    answer: 'The site\'s fine. But while we\'er talking politics, blast first (from politeness) England. . . . Luxury, sport, the famous English "Humour," the thrilling ascendancy and idée fixe of Class, producing the most Intense snobbery in the World; heavy stagnant pools of Saxon blood, incapable of any thing but the song of a frog, in home-counties: — these phenomena give England a peculiar distinction in the wrong sense, among the nations.',
    watson_analysis: '{"document_tone": {"tones": [{"score": 0.664175,"tone_id": "tentative","tone_name":"Tentative"}]}}',
    contact_okay: true,
    created_at: new Date('2017-09-26 14:26:16 UTC'),
    updated_at: new Date('2017-09-26 14:26:16 UTC'),
    deleted_at: null
  },
  {
    id: 3,
    review_question_id: 2,
    user_id: 3,
    title: 'Plagiarized from someplace',
    answer: 'The site\'s fine. But while we\'er talking politics, blast first (from politeness) England. . . . Luxury, sport, the famous English "Humour," the thrilling ascendancy and idée fixe of Class, producing the most Intense snobbery in the World; heavy stagnant pools of Saxon blood, incapable of any thing but the song of a frog, in home-counties: — these phenomena give England a peculiar distinction in the wrong sense, among the nations.',
    watson_analysis: '{"document_tone": {"tones": [{"score": 0.653201,"tone_id": "tentative","tone_name":"Tentative"}]}}',
    contact_okay: true,
    created_at: new Date('2017-09-26 14:26:16 UTC'),
    updated_at: new Date('2017-09-26 14:26:16 UTC'),
    deleted_at: null
  },
  { id: 4,
    review_question_id: 1,
    user_id: 1,
    title: 'Smart stuff',
    answer: 'ditto. It\'s all been said.',
    watson_analysis: '{"document_tone": {"tones": [{"score": 0.989922,"tone_id": "confident","tone_name":"Confident"}]}}',
    contact_okay: false,
    created_at: new Date('2017-09-25 14:26:16 UTC'),
    updated_at: new Date('2017-09-25 14:26:16 UTC'),
    deleted_at: null
  },
  { id: 5,
    review_question_id: 1,
    user_id: 1,
    title: 'Jolly good stuff for a puppet',
    answer: 'But that\'s no kind of problem for me. Puppets made today are often much more real than live people. And to be sure, the site\'s pretty good, showing none of that aversion to directness that is a hall-mark of to-day. Now that I\'m writing I realized how excited I actually am about this project. If I could come out of this screen at you, you would find me in a manner of a man such as you did not expect I think, you would burst your eyes in your effort to absorb the sheer delight I feel at your app.',
    watson_analysis: '{"document_tone": {"tones": [{"score": 0.989922,"tone_id": "confident","tone_name":"Confident"}]}}',
    contact_okay: true,
    created_at: new Date('2017-10-15 14:26:16 UTC'),
    updated_at: new Date('2017-10-15 14:26:16 UTC'),
    deleted_at: null
  },
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert(
        answersList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));")
    });
};
