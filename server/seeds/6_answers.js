'use strict';

const answersList = [
  { id: 1,
    review_question_id: 1,
    user_id: 4,
    title: 'Not altogether indistinct',
    answer: 'As to Twentieth-first century web development, and the websites which I expect to see built during the next decade or so, it will, I think, move against poppy-cock, it will be harder and saner, it will be what Mr Hewlett calls \'nearer the bone\'. It will be as much like granite as it can be, its force will lie in its truth, its interpretative power (of course, digital force does always rest there); I mean it will not try to seem forcible by rhetorical din, and luxurious riot. We will have fewer painted adjectives impeding the shock and stroke of it. At least for myself, I want it so, austere, direct, free from emotional slither.',
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
    created_at: new Date('2017-09-26 14:26:16 UTC'),
    updated_at: new Date('2017-09-26 14:26:16 UTC'),
    deleted_at: null
  },
  { id: 4,
    review_question_id: 1,
    user_id: 4,
    title: 'Slither',
    answer: 'ditto. It\'s all been said.',
    created_at: new Date('2017-09-25 14:26:16 UTC'),
    updated_at: new Date('2017-09-25 14:26:16 UTC'),
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
