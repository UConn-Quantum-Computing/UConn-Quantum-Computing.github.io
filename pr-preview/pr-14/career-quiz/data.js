/*
  Everything the quiz says lives in this file. Edit it freely; app.js only reads it.

  Each answer option adds points to two hidden scores:
    r  Holland interest types: R realistic (hands-on), I investigative, A artistic,
       S social, E enterprising, C conventional (organized)
    t  topics: code, math, physics, chem, electronics, handson, data, people,
       business, security
  A role's match blends how its O*NET interest scores line up with r, and how its
  topics line up with t. See README.md for where every number comes from.
*/
window.QUIZ = {
  questions: [
    {
      q: 'You get a new gadget. What do you do first?',
      options: [
        { label: 'Take it apart to see what is inside', r: { R: 2 }, t: { handson: 2, electronics: 1 } },
        { label: 'Look up how it actually works', r: { I: 2 }, t: { physics: 1, math: 1 } },
        { label: 'Find a clever use nobody thought of', r: { A: 1, E: 1 }, t: { business: 1, code: 1 } },
        { label: 'Show it off and explain it to friends', r: { S: 2, E: 1 }, t: { people: 2 } }
      ]
    },
    {
      q: 'Which class do you actually look forward to?',
      options: [
        { label: 'Math', r: { I: 1, C: 1 }, t: { math: 3 } },
        { label: 'Physics', r: { I: 2, R: 1 }, t: { physics: 3 } },
        { label: 'Programming', r: { I: 1, C: 1 }, t: { code: 3 } },
        { label: 'Chemistry or biology', r: { I: 2, R: 1 }, t: { chem: 3 } }
      ]
    },
    {
      q: 'If you had to pick one of these instead?',
      options: [
        { label: 'Economics or business', r: { E: 2, C: 1 }, t: { business: 3 } },
        { label: 'Writing, art or design', r: { A: 2, S: 1 }, t: { people: 1 } },
        { label: 'Statistics', r: { I: 1, C: 2 }, t: { data: 3 } },
        { label: 'Engineering or shop class', r: { R: 2 }, t: { electronics: 2, handson: 2 } }
      ]
    },
    {
      q: 'Your ideal workday is mostly spent…',
      options: [
        { label: 'In a lab, with real equipment', r: { R: 2, I: 1 }, t: { handson: 2, physics: 1 } },
        { label: 'At a desk, writing code', r: { C: 1, I: 1 }, t: { code: 2 } },
        { label: 'At a whiteboard, working through ideas', r: { I: 2, A: 1 }, t: { math: 2, physics: 1 } },
        { label: 'Talking with people and teams', r: { S: 1, E: 2 }, t: { people: 2, business: 1 } }
      ]
    },
    {
      q: 'Which puzzle sounds most fun?',
      options: [
        { label: 'Sudoku or a logic puzzle', r: { I: 1, C: 1 }, t: { math: 2 } },
        { label: 'Fixing a broken bike', r: { R: 2 }, t: { handson: 2, electronics: 1 } },
        { label: 'Planning the fastest road trip with ten stops', r: { I: 1, C: 1 }, t: { data: 1, code: 1, business: 1 } },
        { label: 'Cracking a secret code', r: { I: 2 }, t: { security: 3 } }
      ]
    },
    {
      q: 'A group project lands on your desk. You would rather…',
      options: [
        { label: 'Build the thing', r: { R: 2 }, t: { handson: 1, electronics: 1 } },
        { label: 'Write the code', r: { C: 1, I: 1 }, t: { code: 2 } },
        { label: 'Do the research', r: { I: 2 }, t: { physics: 1, math: 1 } },
        { label: 'Lead it and present it', r: { E: 2, S: 1 }, t: { people: 2, business: 1 } }
      ]
    },
    {
      q: 'Your phone battery dies too fast. What bugs you most?',
      options: [
        { label: 'Why the battery chemistry wears out', r: { I: 2 }, t: { chem: 3 } },
        { label: 'Which part of the circuit is draining it', r: { R: 1, I: 1 }, t: { electronics: 3 } },
        { label: 'Which apps are wasting it, so you can fix them', r: { C: 1, I: 1 }, t: { code: 2, data: 1 } },
        { label: 'Whether someone could sell a better one', r: { E: 2 }, t: { business: 2 } }
      ]
    },
    {
      q: 'Which headline would you click first?',
      options: [
        { label: 'New medicine designed with a computer simulation', r: { I: 2 }, t: { chem: 3 } },
        { label: 'Hackers steal millions of passwords', r: { I: 1, C: 1 }, t: { security: 3 } },
        { label: 'Scientists cool atoms colder than outer space', r: { I: 1, R: 1 }, t: { physics: 2, handson: 1 } },
        { label: 'Student startup raises $100 million', r: { E: 2 }, t: { business: 3 } }
      ]
    },
    {
      q: 'When something you made does not work, you…',
      options: [
        { label: 'Check every part, step by step, until you find it', r: { C: 2, R: 1 }, t: { handson: 1, electronics: 1 } },
        { label: 'Go back to first principles and rethink it', r: { I: 2 }, t: { math: 2, physics: 1 } },
        { label: 'Look at the numbers for a pattern', r: { I: 1, C: 1 }, t: { data: 3 } },
        { label: 'Ask someone how they would see it', r: { S: 2 }, t: { people: 2 } }
      ]
    },
    {
      q: 'Pick a superpower for one day.',
      options: [
        { label: 'See electricity flowing through wires', r: { R: 1, I: 1 }, t: { electronics: 3 } },
        { label: 'Read any hidden message', r: { I: 1 }, t: { security: 3 } },
        { label: 'Spot the pattern in any pile of numbers', r: { I: 1, C: 1 }, t: { data: 3 } },
        { label: 'Talk anyone into anything', r: { E: 2, S: 1 }, t: { people: 2, business: 2 } }
      ]
    },
    {
      q: 'Which would you be proudest to make?',
      options: [
        { label: 'A tiny circuit board that works first time', r: { R: 2 }, t: { electronics: 3 } },
        { label: 'An app thousands of people use', r: { C: 1, A: 1 }, t: { code: 3 } },
        { label: 'A proof nobody has found before', r: { I: 2, A: 1 }, t: { math: 3 } },
        { label: 'A pitch that wins over a room', r: { E: 2, S: 1 }, t: { people: 2, business: 2 } }
      ]
    },
    {
      q: 'What kind of problem do you like best?',
      options: [
        { label: 'Hands-on: make the machine run', r: { R: 2 }, t: { handson: 2, electronics: 1 } },
        { label: 'Big picture: understand why it works', r: { I: 2 }, t: { physics: 2, math: 1 } },
        { label: 'Practical: use it to fix something real', r: { E: 1, C: 1 }, t: { business: 1, chem: 1, data: 1 } },
        { label: 'Protective: keep things safe from attackers', r: { C: 1, I: 1 }, t: { security: 3 } }
      ]
    },
    {
      q: 'Hours of careful, precise work, like tuning an instrument. That sounds…',
      options: [
        { label: 'Like my kind of day', r: { R: 2, C: 1 }, t: { handson: 3, physics: 1 } },
        { label: 'Fine, if the results are interesting', r: { I: 1 }, t: { physics: 1 } },
        { label: 'Fine, if I can automate it with code', r: { C: 1 }, t: { code: 2 } },
        { label: 'Not for me, I would rather be with people', r: { S: 1, E: 1 }, t: { people: 2 } }
      ]
    },
    {
      q: 'A friend needs help. You are the one who…',
      options: [
        { label: 'Fixes their laptop', r: { R: 1, C: 1 }, t: { handson: 1, electronics: 1, code: 1 } },
        { label: 'Explains their math homework', r: { S: 1, I: 1 }, t: { math: 2, people: 1 } },
        { label: 'Builds them a spreadsheet or a script', r: { C: 2 }, t: { data: 2, code: 1 } },
        { label: 'Helps them plan their business idea', r: { E: 2 }, t: { business: 2, people: 1 } }
      ]
    },
    {
      q: 'After graduation, where would you rather work?',
      options: [
        { label: 'A research lab or a university', r: { I: 2 }, t: { physics: 1, math: 1 } },
        { label: 'A tech company', r: { C: 1, I: 1 }, t: { code: 2 } },
        { label: 'A hospital, bank or car company using new tech', r: { E: 1, S: 1 }, t: { chem: 1, business: 1, data: 1 } },
        { label: 'My own startup', r: { E: 2, A: 1 }, t: { business: 2, people: 1 } }
      ]
    },
    {
      // Not scored. Only adds a note when a match usually needs more school than planned.
      q: 'How long do you see yourself in school?',
      degree: true,
      options: [
        { label: 'A Bachelor’s is enough', level: 'B' },
        { label: 'Probably a Master’s', level: 'M' },
        { label: 'I might do a PhD', level: 'P' },
        { label: 'Not sure yet', level: null }
      ]
    }
  ],

  /*
    onet: interest scores (1 to 7) for the nearest ordinary O*NET occupation,
          in R I A S E C order, from O*NET 30.0 Interests.txt.
    topics: how much each topic matters in the role (0 to 3). Club judgment.
    lean:   Understand it / Build it / Use it, summing to 1. Club judgment, after the
            three proficiency areas of the European Competence Framework for QT.
    levels: degrees the survey's Table I lists for the role (A associate, B, M, P).
            Empty when the survey gives none.
  */
  roles: [
    {
      id: 'software',
      name: 'Quantum software engineer',
      oneLine: 'You would write the code and tools that let people run programs on quantum computers.',
      workOn: 'The software behind every quantum computer, from the programs people write to the systems that run them.',
      ask: 'A Bachelor’s or Master’s in computer science. Main skill: software development.',
      askFrom: 'Survey roles: Software Programmer, DevOps/Database Engineer',
      firstStep: 'Start IBM’s free course Basics of Quantum Information, and write your first Qiskit circuit.',
      onet: { code: '15-1252.00', name: 'Software Developers', v: [3.93, 5.86, 2.26, 1.88, 1.87, 5.46] },
      topics: { code: 3, data: 1 },
      lean: [0.1, 0.7, 0.2],
      levels: ['B', 'M']
    },
    {
      id: 'algorithms',
      name: 'Quantum algorithm developer',
      oneLine: 'You would invent the step-by-step recipes that let a quantum computer beat a normal one.',
      workOn: 'New methods for search, simulation, optimization and cryptography.',
      ask: 'A PhD in physics or computer science, or a Master’s in computer science. Skills: algorithm development, including AI and machine learning.',
      askFrom: 'Survey role: Quantum Algorithm Developer',
      firstStep: 'Take Basics of Quantum Information, then Fundamentals of Quantum Algorithms, both free from IBM.',
      onet: { code: '15-1221.00', name: 'Computer and Information Research Scientists', v: [3.94, 7.00, 2.86, 2.04, 2.42, 4.80] },
      topics: { math: 3, code: 2, physics: 1, data: 1 },
      lean: [0.5, 0.3, 0.2],
      levels: ['M', 'P']
    },
    {
      id: 'apps',
      name: 'Quantum solutions architect',
      oneLine: 'You would take a company’s real problem and work out how quantum computing could help solve it.',
      workOn: 'Delivery routes, investment portfolios, factory schedules: problems with too many options to check one by one.',
      ask: 'A Master’s in computer science or engineering. Skills: application design, AI and machine learning, quantum algorithms.',
      askFrom: 'Survey role: Applications/Solutions Architect',
      firstStep: 'Enter a quantum hackathon, like Qiskit Fall Fest. Applying quantum to a real problem is the whole job.',
      onet: { code: '15-1299.08', name: 'Computer Systems Engineers/Architects', v: [4.33, 5.77, 1.97, 2.04, 2.81, 5.42] },
      topics: { business: 2, code: 2, data: 1, people: 1 },
      lean: [0.1, 0.3, 0.6],
      levels: ['M']
    },
    {
      id: 'chemist',
      name: 'Quantum computational chemist',
      oneLine: 'You would use quantum computers to simulate molecules, to design new medicines, batteries and materials.',
      workOn: 'Drug discovery, better batteries and cleaner catalysts.',
      ask: 'A PhD in chemistry or biochemistry. Skills: quantum algorithms, quantum science, software development.',
      askFrom: 'Survey role: Computational Chemist',
      firstStep: 'Keep chemistry and linear algebra together in your schedule. Then look up VQE, the method IBM used to simulate lithium hydride on a real quantum computer.',
      onet: { code: '19-2031.00', name: 'Chemists', v: [5.66, 6.66, 1.50, 1.15, 1.60, 4.95] },
      topics: { chem: 3, physics: 1, code: 1, math: 1 },
      lean: [0.4, 0.1, 0.5],
      levels: ['P']
    },
    {
      id: 'theory',
      name: 'Quantum theorist',
      oneLine: 'You would work out the math that keeps fragile quantum information from falling apart.',
      workOn: 'Error correction: turning thousands of noisy qubits into a few reliable ones.',
      ask: 'A PhD in physics or math. Skills: error correction, theoretical math and statistics.',
      askFrom: 'Survey roles: Error Correction Scientist, Theoretical Physicist',
      firstStep: 'Load up on linear algebra and probability. They are the language everything else is written in.',
      onet: { code: '15-2021.00', name: 'Mathematicians', v: [3.00, 7.00, 3.23, 1.97, 1.16, 5.27] },
      topics: { math: 3, physics: 3 },
      lean: [0.8, 0.1, 0.1],
      levels: ['P']
    },
    {
      id: 'experimental',
      name: 'Experimental quantum physicist',
      oneLine: 'You would run experiments with lasers, light and single atoms to make new quantum hardware work.',
      workOn: 'The machines themselves, and quantum sensors that measure the world more precisely than anything else.',
      ask: 'A PhD in physics. Skills: laser and photonics physics, quantum sensors.',
      askFrom: 'Survey roles: Experimental Physicist, Photonics/Optics Engineer/Scientist',
      firstStep: 'Ask a physics professor about undergraduate research, or apply for a summer REU in a quantum lab.',
      onet: { code: '19-2012.00', name: 'Physicists', v: [4.95, 7.00, 2.76, 2.11, 1.82, 4.86] },
      topics: { physics: 3, handson: 2, math: 1 },
      lean: [0.6, 0.4, 0.0],
      levels: ['P']
    },
    {
      id: 'electrical',
      name: 'Quantum control and circuit engineer',
      oneLine: 'You would design the electronics that send signals to a quantum chip and read its answers back.',
      workOn: 'The control electronics that turn a program into microwave pulses and back into ones and zeros.',
      ask: 'A Bachelor’s, Master’s or PhD in electrical engineering. Skills: control theory, circuit design, measuring noise.',
      askFrom: 'Survey roles: Control Systems Engineer, Circuit Designer',
      firstStep: 'Take circuits and signals seriously, and look for summer internships in quantum hardware labs.',
      onet: { code: '17-2072.00', name: 'Electronics Engineers, Except Computer', v: [6.23, 5.80, 2.03, 1.59, 1.62, 4.68] },
      topics: { electronics: 3, math: 1, physics: 1, code: 1 },
      lean: [0.2, 0.8, 0.0],
      levels: ['B', 'M', 'P']
    },
    {
      id: 'testing',
      name: 'Quantum test and systems engineer',
      oneLine: 'You would build the machine, cool it down, keep it running, and find out why when it does not.',
      workOn: 'The refrigerators, wiring and test benches that every quantum computer depends on.',
      ask: 'A Bachelor’s in electrical or mechanical engineering, or an associate degree. Skills: testing devices, mechanical assembly.',
      askFrom: 'Survey roles: Test/Measurement Engineer, System Assembly/Maintenance Technician',
      firstStep: 'Get your hands dirty: lab courses, a maker space, and hardware internships.',
      onet: { code: '17-3023.00', name: 'Electrical and Electronic Engineering Technologists and Technicians', v: [6.24, 5.20, 1.76, 1.79, 1.32, 5.00] },
      topics: { handson: 3, electronics: 1, physics: 1 },
      lean: [0.1, 0.9, 0.0],
      levels: ['A', 'B']
    },
    {
      id: 'data',
      name: 'Quantum data scientist',
      oneLine: 'You would find patterns in data, and test whether quantum methods can find them better.',
      workOn: 'Machine learning, finance and fraud detection, and making sense of what quantum experiments measure.',
      ask: 'A Master’s or PhD in computer science, math or statistics. Skill: AI and machine learning.',
      askFrom: 'Survey role: Data Scientist',
      firstStep: 'Learn Python and statistics, then try a quantum machine learning tutorial in Qiskit.',
      onet: { code: '15-2051.00', name: 'Data Scientists', v: [2.16, 6.99, 2.59, 1.66, 1.71, 5.40] },
      topics: { data: 3, code: 1, math: 2 },
      lean: [0.2, 0.3, 0.5],
      levels: ['M', 'P']
    },
    {
      id: 'business',
      name: 'Quantum product and business lead',
      oneLine: 'You would explain quantum to customers, decide what gets built, and bring it to market.',
      workOn: 'A market McKinsey puts at up to $100 billion within a decade, and the banks, drugmakers and carmakers already exploring it.',
      ask: 'The survey counted sales and marketing roles but did not list a preferred degree for them.',
      askFrom: 'Survey roles: Product Sales/Marketing, Technical Support/Marketing',
      firstStep: 'Follow the industry. McKinsey’s Quantum Technology Monitor is a good start.',
      onet: { code: '41-9031.00', name: 'Sales Engineers', v: [3.16, 3.66, 1.79, 2.87, 5.81, 4.49] },
      topics: { business: 3, people: 3 },
      lean: [0.0, 0.1, 0.9],
      levels: []
    },
    {
      id: 'security',
      name: 'Post-quantum security engineer',
      oneLine: 'You would protect today’s data from tomorrow’s quantum computers by moving it to quantum-safe encryption.',
      workOn: 'Replacing the encryption behind banking, messaging and the web before a quantum computer can break it.',
      ask: 'Not part of the 57-company survey, so there is no survey data on the degree companies want.',
      askFrom: 'Added by UConn Quantum Computing, not a survey role',
      firstStep: 'Look up post-quantum cryptography and NIST’s new standards, ML-KEM and ML-DSA.',
      onet: { code: '15-1299.05', name: 'Information Security Engineers', v: [4.24, 5.51, 1.31, 1.85, 2.66, 6.04] },
      topics: { security: 3, code: 2, math: 2 },
      lean: [0.3, 0.3, 0.4],
      levels: []
    }
  ]
};
