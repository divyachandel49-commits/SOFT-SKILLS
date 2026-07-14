import { ModuleItem, RolePlayScenario, AssessmentQuestion, PhrasePair, TeleprompterScript } from '../types';

export const modules: ModuleItem[] = [
  {
    id: 'vocalics',
    title: 'Vocalics & Public Speaking',
    subtitle: 'Master the elements of vocal delivery to hold attention and project confidence.',
    category: 'Vocal',
    icon: 'Mic',
    description: 'Vocalics is the study of how we use our voice to communicate meaning. In public speaking and soft skills, how you speak is often more important than what you speak.',
    benefits: [
      'Increases visual authority and executive presence',
      'Minimizes filler words and nervous pacing',
      'Keeps listeners engaged through dynamic modulation'
    ],
    principles: [
      {
        title: 'Pitch & Modulation',
        description: 'Varying your voice pitch prevents a monotonous drone and signals excitement, seriousness, or curiosity.',
        exampleGood: 'Raising pitch slightly on "exciting opportunity" and lowering on "fundamental safety rule".',
        exampleBad: 'Speaking in an unvarying tone, making critical updates sound identical to routine remarks.'
      },
      {
        title: 'Pacing & Strategic Pausing',
        description: 'The optimal speaking rate is 130–150 words per minute. Pausing before and after a key point creates dramatic emphasis and allows digestion.',
        exampleGood: '"This quarterly result... (2 second pause) ...is a record high for our company."',
        exampleBad: 'Rushing through slides without stopping, letting sentences bleed together with "and-um".'
      },
      {
        title: 'Volume & Vocal Projection',
        description: 'Projecting from your diaphragm ensures clarity even in large rooms, and shows certainty without shouting.',
        exampleGood: 'Directing your voice to the farthest corner of the room with open, relaxed throat muscles.',
        exampleBad: 'Mumbling downwards toward your notebook or podium, causing people to lean forward.'
      }
    ],
    quickTips: [
      'Record yourself reading a paragraph and measure your Words Per Minute (WPM). Aim for 140.',
      'Use the "Breath Pause" rule: at every period, completely inhale and exhale once before speaking.',
      'Slightly lower your pitch at the end of statements to avoid sounding like you are asking for permission (the "uptalk" trap).'
    ]
  },
  {
    id: 'listening',
    title: 'Active Listening & Mirroring',
    subtitle: 'Hear beyond words to build empathy, trust, and flawless understanding.',
    category: 'Listening',
    icon: 'Ear',
    description: 'Active listening is a structured way of listening and responding to others. It focuses attention entirely on the speaker, ensuring you comprehend, synthesize, and validate their message.',
    benefits: [
      'Reduces costly project misunderstandings',
      'De-escalates interpersonal tension instantly',
      'Builds deep professional rapport and loyalty'
    ],
    principles: [
      {
        title: 'Reflective Summarizing',
        description: 'Paraphrasing what you heard in your own words before responding ensures alignment and shows respect.',
        exampleGood: '"So, if I understand correctly, your primary concern is the timeline, not the budget. Is that correct?"',
        exampleBad: '"Okay, but we still need to finish it. Let me explain why..." (immediate defensive response)'
      },
      {
        title: 'Empathetic Mirroring',
        description: 'Repeating the last 2-3 critical words a speaker said encourages them to expand, without you having to probe aggressively.',
        exampleGood: 'Speaker: "I feel like we are constantly hitting roadblocks." You: "Hitting roadblocks?"',
        exampleBad: 'Speaker: "I feel like we are constantly hitting roadblocks." You: "Well, we all have roadblocks. Let\'s move on."'
      },
      {
        title: 'Clarifying Questions',
        description: 'Asking open-ended, non-judgmental questions to dig deeper into the root cause of an issue.',
        exampleGood: '"What specific aspects of the new workflow are causing the friction?"',
        exampleBad: '"Why didn\'t you tell me about this during the planning meeting?" (creates immediate defensiveness)'
      }
    ],
    quickTips: [
      'Follow the 80/20 Rule: Listen 80% of the time, speak only 20% of the time in diagnostic meetings.',
      'Wait a full second after the speaker finishes before formulating your answer, to ensure they are actually done.',
      'Take light notes to maintain attention, but maintain consistent, relaxed eye contact.'
    ]
  },
  {
    id: 'body-language',
    title: 'Body Language & Gestures',
    subtitle: 'Align your physical presence with your verbal message for maximum impact.',
    category: 'Body Language',
    icon: 'Sparkles',
    description: 'Over 55% of human communication is non-verbal. Your posture, hand gestures, and eye patterns dictate how trustworthy, capable, and assertive you appear to peers and leaders.',
    benefits: [
      'Projects calmness even under high-stress conditions',
      'Reinforces abstract spoken concepts visually',
      'Encourages peer collaboration and openness'
    ],
    principles: [
      {
        title: 'The Open Posture',
        description: 'Uncrossed arms, uncrossed legs, and torso turned slightly towards the speaker signal attentiveness and security.',
        exampleGood: 'Sitting tall with hands placed calmly on the desk or loosely in your lap.',
        exampleBad: 'Crossing arms tightly across chest and leaning back, signaling defensiveness or boredom.'
      },
      {
        title: 'Intentional Hand Gestures',
        description: 'Using hands within the "strike zone" (chest-to-waist area) to describe scale, categorize items, or emphasize numbers.',
        exampleGood: 'Holding palms facing slightly up to invite participation, or showing numbers on your fingers when listing points.',
        exampleBad: 'Hiding hands in pockets, behind your back, or constantly fiddling with a pen/ring (signals anxiety).'
      },
      {
        title: 'Eye Gaze & Focus',
        description: 'Using the "Triangle Method" (alternating focus between left eye, right eye, and bridge of nose) to show high warmth and professional interest.',
        exampleGood: 'Maintaining soft contact for 3-4 seconds before shifting briefly, then returning focus.',
        exampleBad: 'Staring intensely without blinking (aggressive) or constantly looking at the door/phone (dismissive).'
      }
    ],
    quickTips: [
      'The Steeple Gesture: Touch fingertips lightly together to form a tent shape. This is a universally recognized sign of intellectual confidence.',
      'Check your shoulders: Under stress, shoulders raise. Consciously drop them and roll them back to instantly look relaxed.',
      'Nod in clusters of three: Doing three small, slow nods while listening signals deep comprehension and encourages the speaker.'
    ]
  },
  {
    id: 'etiquette',
    title: 'Assertive Professional Writing',
    subtitle: 'Write clear, concise, and respectful English to drive action and respect.',
    category: 'Writing',
    icon: 'FileText',
    description: 'In a digital workplace, your writing is your identity. Assertive writing stands up for your boundaries and shares clear needs, without sounding rude (aggressive) or weak (passive).',
    benefits: [
      'Reduces long, frustrating back-and-forth emails',
      'Establishes firm, highly respected professional boundaries',
      'Secures prompt action and approval on requested tasks'
    ],
    principles: [
      {
        title: 'Eliminating Weak Modifiers',
        description: 'Removing words that apologize for your presence or signal doubt about your own expertise.',
        exampleGood: '"I recommend we proceed with Option A to hit our July target."',
        exampleBad: '"I just wanted to say that maybe we should think about Option A, if that\'s okay with everyone?"'
      },
      {
        title: 'Action-Oriented Request Framing',
        description: 'Clearly stating the exact deliverable, owner, and due date in a polite but direct structure.',
        exampleGood: '"Could you please share the design draft by Friday at 4 PM to keep us on track?"',
        exampleBad: '"Let me know whenever you get around to looking at those designs. No rush!"'
      },
      {
        title: 'Empathy + Boundaries',
        description: 'Pairing a sincere acknowledgement of their situation with a firm boundary, preventing scope creep.',
        exampleGood: '"I appreciate the tight deadline you are under. However, I am fully committed this week and can pick this up next Monday."',
        exampleBad: '"Sure, I guess I can stay up late again and do it. It\'s fine, don\'t worry about it." (passive resentful)'
      }
    ],
    quickTips: [
      'Search your drafts for the word "just" (e.g. "just checking", "just wanted to"). 90% of the time, deleting it makes you sound twice as professional.',
      'Never write "Sorry for the delay." Write "Thank you for your patience," which shifts the focus to their generosity.',
      'Format emails with bullet points for actions and bold deadlines so they are instantly scannable.'
    ]
  },
  {
    id: 'collaboration',
    title: 'Negotiation & Collaboration',
    subtitle: 'Turn disagreements into creative breakthroughs and unified progress.',
    category: 'Collaboration',
    icon: 'Users',
    description: 'Soft skills culminate in group dynamics. Effective negotiation isn\'t about "winning" an argument; it is about finding a win-win integration that achieves project goals while strengthening relationships.',
    benefits: [
      'Transforms team conflicts into source of creative ideas',
      'Aligns diverse stakeholders around a shared objective',
      'Saves critical time spent on internal political friction'
    ],
    principles: [
      {
        title: 'Interests vs. Positions',
        description: 'Looking past what a person demands (their position) to understand what they actually need (their underlying interest).',
        exampleGood: 'Position: "I want this report tonight." Interest: "I need to review this before my 9 AM board meeting." Solution: Send a bulleted summary tonight, full report by 8:30 AM.',
        exampleBad: 'Refusing flatly because of your working hours, causing a complete deadlock.'
      },
      {
        title: 'Constructive Disagreement',
        description: 'Challenging an idea, never the person. Frame critiques as collaborative problem-solving exercises.',
        exampleGood: '"That is an interesting angle. My main concern is how we scale it. How do you propose we handle the server load?"',
        exampleBad: '"That idea won\'t work. It\'s way too expensive and you clearly haven\'t thought about the server limits."'
      },
      {
        title: 'The Pivot to Consensus',
        description: 'Using summarizing techniques to bridge two opposing viewpoints and direct the group forward.',
        exampleGood: '"It sounds like Maria wants speed, while John wants absolute accuracy. What if we do a phased rollout to meet both?"',
        exampleBad: '"Okay, let\'s just vote and whoever loses has to deal with it."'
      }
    ],
    quickTips: [
      'In a conflict, use "I-statements" (e.g. "I feel rushed when...") instead of "You-statements" (e.g. "You always rush me...").',
      'The "Yes, and..." technique: Acknowledge the value in their point before adding your constraint (e.g., "Yes, that is a great feature, and if we pair it with...").',
      'Maintain an "Equity of Voice": In group discussions, actively invite silent members to speak ("I would love to hear your thoughts on this, Maya").'
    ]
  }
];

export const rolePlayScenarios: RolePlayScenario[] = [
  {
    id: 'mock-interview',
    title: 'The High-Stakes Job Interview',
    description: 'Sit down with Sarah, the Head of Talent Acquisition at a top global tech firm. Practice balancing confidence with humility, answering tough behavioral questions in polished English, and demonstrating strong verbal executive presence.',
    topic: 'Professional English & Behavioral Articulation',
    difficulty: 'Intermediate',
    character: {
      name: 'Sarah Jenkins',
      role: 'Talent Acquisition Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
      bio: 'Known for her warm but highly analytical interview style. She values structured answers, clear English expression, and strong self-awareness.'
    },
    startNodeId: 'intro',
    expectedOutcome: 'Demonstrate structural answer formatting (STAR method) and confident, articulate English under pressure.',
    nodes: {
      intro: {
        id: 'intro',
        characterResponse: "Thank you for coming in today. I've reviewed your credentials, and they look impressive. Let's start with a foundational question: Why do you want this specific role at our company, and what sets you apart from other highly qualified candidates?",
        choices: [
          {
            id: 'intro_c1',
            text: "Honestly, I just really need a job right now, and your company pays very well. Plus, I have the exact degree required, so I'm a perfect fit.",
            nextNodeId: 'feedback_unprofessional',
            scoreChange: { empathy: -5, clarity: 10, professionalism: -15 },
            feedback: "Sarah frowns slightly, writing a quick note on her tablet.",
            analysis: "This response is overly direct, transactional, and lacks enthusiasm for the actual role and company mission. It shows low emotional intelligence (EQ) and professionalism."
          },
          {
            id: 'intro_c2',
            text: "I admire your focus on global sustainability. In my last role, I drove a digital shift that cut paper use by 40%. I want to bring that same resourcefulness here to help scale your eco-initiatives.",
            nextNodeId: 'strength_question',
            scoreChange: { empathy: 15, clarity: 15, professionalism: 20 },
            feedback: "Sarah smiles and nods, leaning forward in her chair.",
            analysis: "Outstanding. You connected your personal values to the company mission, backed up your capability with a concrete metric, and kept the tone confident and respectful."
          },
          {
            id: 'intro_c3',
            text: "Well, I think I'm a good worker. I've always liked technology and I really think your company is cool. I would be happy to do whatever you need me to do.",
            nextNodeId: 'soft_question',
            scoreChange: { empathy: 5, clarity: -10, professionalism: 5 },
            feedback: "Sarah nods politely but her eyes glance briefly at your resume.",
            analysis: "This response is too passive and vague. Using words like 'cool' and 'good worker' lacks professional polish, and doesn't communicate any specific value or initiative."
          }
        ]
      },
      feedback_unprofessional: {
        id: 'feedback_unprofessional',
        characterResponse: "I appreciate your honesty. However, we look for people who are deeply passionate about our core vision. Let's shift gears. Tell me about a time you made a significant mistake at work or university. How did you handle it and what did you learn?",
        choices: [
          {
            id: 'unprof_c1',
            text: "Actually, I rarely make mistakes. I am extremely thorough. Usually when things go wrong, it is because other team members didn't do their part properly, but I always step in and fix it.",
            nextNodeId: 'fail_node',
            scoreChange: { empathy: -20, clarity: 5, professionalism: -20 },
            feedback: "Sarah raises an eyebrow, making a bold mark on her assessment sheet.",
            analysis: "A catastrophic interview mistake. This shows a complete lack of accountability, low self-awareness, and a blaming attitude that destroys trust in any collaborative lab environment."
          },
          {
            id: 'unprof_c2',
            text: "Last year, I miscalculated a project timeline, causing a 2-day delay. I immediately notified my advisor, presented a revised plan with weekend hours, and completed it on time. Since then, I always add a 15% buffer.",
            nextNodeId: 'final_node',
            scoreChange: { empathy: 10, clarity: 20, professionalism: 20 },
            feedback: "Sarah nods in approval. 'Accountability is rare and highly valued here,' she says.",
            analysis: "Excellent. You used the STAR method (Situation, Task, Action, Result). You took ownership, explained your corrective action, and showed structural learning that prevents future issues."
          }
        ]
      },
      strength_question: {
        id: 'strength_question',
        characterResponse: "That is a great example. Connecting your background directly to our sustainability goal is exactly what we like to see. Now, let's talk about pressure. In this role, you'll manage competing priorities from multiple directors. How do you handle that without burning out?",
        choices: [
          {
            id: 'strength_c1',
            text: "I just say 'yes' to everyone and work 80 hours a week if I have to. I never complain, because my main goal is to please my superiors at any personal cost.",
            nextNodeId: 'burnout_feedback',
            scoreChange: { empathy: 5, clarity: 10, professionalism: -5 },
            feedback: "Sarah sighs gently. 'While dedication is admirable, sustainability applies to our people too,' she notes.",
            analysis: "Though meant to sound dedicated, this shows a lack of boundary-setting, prioritization skills, and communication. High-performing soft skills require proactive alignment, not silent martyrdom."
          },
          {
            id: 'strength_c2',
            text: "I use a priority matrix. If conflicts arise, I schedule a brief 5-minute alignment with both directors, lay out the current commitments, and ask them to help prioritize based on overall business impact.",
            nextNodeId: 'final_node',
            scoreChange: { empathy: 15, clarity: 20, professionalism: 20 },
            feedback: "Sarah beams. 'Proactive alignment is precisely the level of maturity we are seeking.'",
            analysis: "Perfection. You demonstrated structural thinking, absolute assertiveness, excellent conflict resolution, and the ability to negotiate professional boundaries gracefully."
          }
        ]
      },
      soft_question: {
        id: 'soft_question',
        characterResponse: "I see. We definitely want our team members to feel comfortable. Let\'s try a behavioral scenario: Imagine a team member disagrees with your design during a major presentation in front of clients. How would you respond in that moment?",
        choices: [
          {
            id: 'soft_c1',
            text: "I would tell them that we can discuss it after the meeting, but right now we need to stick to the plan so we don't look uncoordinated in front of the client.",
            nextNodeId: 'final_node',
            scoreChange: { empathy: 10, clarity: 15, professionalism: 15 },
            feedback: "Sarah nods. 'A sensible way to protect the client relationship while managing team boundaries.'",
            analysis: "Good. This response protects the team's professional presentation integrity while offering a constructive pathway to resolve the dispute offline."
          },
          {
            id: 'soft_c2',
            text: "I would probably get embarrassed and just let them take over the presentation. I hate conflict, so I'd rather just agree with them to keep the client happy.",
            nextNodeId: 'fail_node',
            scoreChange: { empathy: 5, clarity: -15, professionalism: -15 },
            feedback: "Sarah's face shows concern. 'We value collaboration, but also conviction and confidence,' she explains.",
            analysis: "Too passive. Giving up your authority and expertise immediately to avoid conflict shows low assertiveness and vocal confidence, which is vital for an English lab leader."
          }
        ]
      },
      burnout_feedback: {
        id: 'burnout_feedback',
        characterResponse: "I understand. But let's look at the long term. If we notice you are falling behind due to overload, how will you communicate that to me as your manager? What would your email or meeting sound like?",
        choices: [
          {
            id: 'burn_c1',
            text: "I would write: 'Hi Sarah, I am completely swamped and this workload is unfair. I need you to take some tasks off my plate immediately before I lose my mind.'",
            nextNodeId: 'fail_node',
            scoreChange: { empathy: -10, clarity: 15, professionalism: -20 },
            feedback: "Sarah winces slightly. 'That sounds quite aggressive and emotionally charged,' she notes.",
            analysis: "This is aggressive communication. It blames the manager, uses unprofessional emotional language ('lose my mind'), and demands action rather than proposing a collaborative solution."
          },
          {
            id: 'burn_c2',
            text: "I would schedule a 1-on-1 and say: 'Sarah, I want to ensure my work stays at a high standard. Currently, with Project X and Y, I am at capacity. Can we review the list together and see which items we can deprioritize?'",
            nextNodeId: 'final_node',
            scoreChange: { empathy: 20, clarity: 20, professionalism: 20 },
            feedback: "Sarah writes down a very positive score. 'That is exactly how a mature, professional communicator handles scale and capacity.'",
            analysis: "Excellent. You framed the conversation around maintaining high-quality work, used non-confrontational phrasing, and invited collaboration on solutions. Highly assertive and polished."
          }
        ]
      },
      fail_node: {
        id: 'fail_node',
        characterResponse: "Thank you for your time today. This has been a very illuminating conversation about your communication style. We will be in touch with our final decision next week.",
        choices: [] // Terminal node
      },
      final_node: {
        id: 'final_node',
        characterResponse: "Thank you so much. It's been an absolute pleasure talking with you today. Your structured communication, emotional maturity, and professional English articulation make you an exceptionally strong candidate. We'll send over the next steps by tomorrow morning!",
        choices: [] // Terminal node
      }
    }
  },
  {
    id: 'team-conflict',
    title: 'Resolving Team Friction',
    description: 'David, a talented senior engineer in your project group, is acting highly defensive. He feels his ideas are being ignored and has started missing milestones. Use empathy, active listening, and interest-based negotiation to align him and save the project.',
    topic: 'Conflict Resolution & Active Listening',
    difficulty: 'Advanced',
    character: {
      name: 'David Vance',
      role: 'Senior Project Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      bio: 'Highly competent but defensive. He is proud of his technical capability and withdraws or becomes sarcastic if he feels undervalued.'
    },
    startNodeId: 'intro',
    expectedOutcome: 'De-escalate emotional defense, identify David\'s interest in technical ownership, and co-create an accountability pact.',
    nodes: {
      intro: {
        id: 'intro',
        characterResponse: "Listen, I know why we are meeting. You want to talk about the missed deadlines. Frankly, I'm tired of having my technical proposals completely ignored while the group just rushes to code whatever looks easiest.",
        choices: [
          {
            id: 'conflict_c1',
            text: "David, your deadlines are critical. I don't care about your feelings being hurt; we have a client review on Friday and your delay is putting the entire project at risk. Can we focus on the work?",
            nextNodeId: 'david_angry',
            scoreChange: { empathy: -20, clarity: 15, professionalism: -5 },
            feedback: "David crosses his arms, leans back, and scowls. 'Then write the code yourself,' he mutters.",
            analysis: "Highly aggressive. You dismissed his concerns, prioritized metrics over human relationship, and issued an ultimatum. This triggers biological threat responses and leads to total deadlock."
          },
          {
            id: 'conflict_c2',
            text: "David, I hear that you feel your technical expertise isn't being utilized. That must be incredibly frustrating. Can you tell me which specific proposal you felt was dismissed too quickly?",
            nextNodeId: 'david_opens',
            scoreChange: { empathy: 20, clarity: 15, professionalism: 20 },
            feedback: "David's shoulders drop slightly. He uncrosses his arms. 'Well... the database architecture proposal. I spent three days drafting a scalable schema, and it was barely discussed.'",
            analysis: "Perfect active listening. You validated his emotional state, mirrored his concern, and opened an objective, safe pathway for him to share details without being defensive."
          }
        ]
      },
      david_angry: {
        id: 'david_angry',
        characterResponse: "If the group doesn't value my engineering input, then I am just a keyboard monkey here. I'm doing the bare minimum because my expertise clearly doesn't matter to this team.",
        choices: [
          {
            id: 'angry_c1',
            text: "That is a very childish attitude, David. We are a team and we have to compromise. If you don't complete your tasks by tomorrow, I will have to report this to our supervisor.",
            nextNodeId: 'fail_node',
            scoreChange: { empathy: -25, clarity: 5, professionalism: -15 },
            feedback: "David stands up. 'Go ahead and report it. I'm off this project anyway.'",
            analysis: "Escalating a conflict by calling names ('childish') and threatening administrative action destroys any remaining trust. The collaboration has completely collapsed."
          },
          {
            id: 'angry_c2',
            text: "I apologize, David. I was overly harsh because I am stressed about Friday. I don't want you to feel like just a keyboard monkey; your expertise is why we wanted you in this group. Let\'s look at your database architecture proposal together right now.",
            nextNodeId: 'david_opens',
            scoreChange: { empathy: 20, clarity: 10, professionalism: 15 },
            feedback: "David sighs, his expression softening. 'Okay... I appreciate the apology. Look, here is why this database setup is critical...'",
            analysis: "Excellent conflict recovery. You showed extreme emotional intelligence by apologizing, taking responsibility for your stress, validating his worth, and immediately backing it up with action."
          }
        ]
      },
      david_opens: {
        id: 'david_opens',
        characterResponse: "Look, my schema handles concurrent queries 5 times better. But the team went with the simple setup because it was faster. If we launch with that, we will crash the moment 500 users log in. I couldn't in good conscience build on a broken foundation.",
        choices: [
          {
            id: 'open_c1',
            text: "I see. You were holding back because you wanted to protect the project quality. That is a very valid concern. How can we integrate your scalable schema without completely blowing our Friday client demo deadline?",
            nextNodeId: 'final_node',
            scoreChange: { empathy: 20, clarity: 20, professionalism: 20 },
            feedback: "David pulls his laptop over and opens his IDE. 'Actually, if we use my migration script, we can hot-swap the DB in about two hours. I can pair-program it with Maya tonight.'",
            analysis: "Outstanding. You recognized his intent (protecting project quality) and pivoted to collaborative problem-solving. This turned a defensive engineer into an active, motivated partner."
          },
          {
            id: 'open_c2',
            text: "Ah, that makes sense. But David, the team made a democratic decision. Even if it crashes later, we need to pass Friday's demo first. Can you just build the simple one for now and we will fix it later?",
            nextNodeId: 'fail_node',
            scoreChange: { empathy: 5, clarity: 15, professionalism: -10 },
            feedback: "David sighs. 'Fine. I'll write the sloppy code. Just don't blame me when the server dies on launch day.'",
            analysis: "While pragmatic, this passive-aggressive capitulation leaves David disengaged and resentful. You missed the opportunity to leverage his expertise to actually make the product better."
          }
        ]
      },
      fail_node: {
        id: 'fail_node',
        characterResponse: "David turns away, packing his laptop. The project meeting ends in silence, and the team atmosphere remains deeply toxic and unproductive.",
        choices: []
      },
      final_node: {
        id: 'final_node',
        characterResponse: "David smiles genuinely, shaking your hand. 'Thanks for actually listening. Let's get Maya and knock this DB migration out tonight. We are going to crush this Friday demo.'",
        choices: []
      }
    }
  }
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    context: "Group Discussion Dynamics",
    scenario: "During a fast-paced team brainstorm, you notice that a soft-spoken team member, Rohan, has tried to speak twice but was cut off by louder colleagues both times. What is your action?",
    options: [
      {
        id: 'q1_a',
        text: "Keep quiet and let the loud team members finish, as interrupting them would disrupt the flow of ideas.",
        style: "Passive",
        points: 5,
        feedback: "Passive. By staying silent, you allow Rohan's ideas to be lost and encourage a loud, non-inclusive team culture."
      },
      {
        id: 'q1_b',
        text: "Raise your hand and say, 'Hey! Stop shouting and let Rohan speak for once, you guys are being incredibly rude!'",
        style: "Aggressive",
        points: 10,
        feedback: "Aggressive. While Rohan gets to speak, your confrontational tone creates defensiveness and raises team tension."
      },
      {
        id: 'q1_c',
        text: "Wait for the next natural pause and say, 'That is a great point, Maya. I also noticed Rohan was starting to share something a moment ago. Rohan, what were you about to say?'",
        style: "Assertive",
        points: 25,
        feedback: "Assertive. This is textbook facilitation. You validate the current speaker, firmly but politely pivot to include Rohan, and establish voice equity."
      },
      {
        id: 'q1_d',
        text: "Roll your eyes dramatically, sigh loudly, and write Rohan a private chat message: 'Wow, this team is so obnoxious, no one listens.'",
        style: "Passive-Aggressive",
        points: 2,
        feedback: "Passive-Aggressive. This creates silent division and fosters a toxic atmosphere without solving the immediate communication problem."
      }
    ]
  },
  {
    id: 2,
    context: "Receiving Harsh Criticism",
    scenario: "Your English lab tutor hands back your written proposal covered in red ink, saying: 'This is highly disorganized and doesn't meet the professional standards we discussed.' how do you respond?",
    options: [
      {
        id: 'q2_a',
        text: "Take a deep breath and say, 'I want to make sure I align with your standards. Could you point out 2 specific sections where the structure falls short so I can focus my rewrite?'",
        style: "Assertive",
        points: 25,
        feedback: "Assertive. Excellent. You detach your ego from the criticism, validate their standard, and ask for actionable, specific feedback."
      },
      {
        id: 'q2_b',
        text: "Frown, grab the paper, and mutter: 'Well, you never explained the standards clearly in the first place, but whatever, I\'ll change it.'",
        style: "Passive-Aggressive",
        points: 5,
        feedback: "Passive-Aggressive. Defending yourself by blaming the instructor's teaching style destroys your feedback receptiveness score."
      },
      {
        id: 'q2_c',
        text: "Feel extremely discouraged, apologize profusely, and walk away thinking you are terrible at professional writing and should just give up.",
        style: "Passive",
        points: 8,
        feedback: "Passive. Internalizing feedback as a personal failure rather than a structural learning opportunity hurts your growth and confidence."
      },
      {
        id: 'q2_d',
        text: "Argue immediately, saying, 'I checked this with a senior peer and they said it was perfect! Your standards are way too subjective!'",
        style: "Aggressive",
        points: 3,
        feedback: "Aggressive. Defending your work aggressively shuts down learning and creates an adversarial relationship with your mentor."
      }
    ]
  },
  {
    id: 3,
    context: "Negotiating Deadlines",
    scenario: "Your project manager messages you at 4:30 PM: 'We need this competitive analysis slide deck completed by 9 AM tomorrow. Can you handle this?' You already have a major final exam tomorrow at 11 AM.",
    options: [
      {
        id: 'q3_a',
        text: "Say, 'Yes, absolutely, no problem!' Then stay up until 4 AM completing the slides, getting only 2 hours of sleep before your crucial exam.",
        style: "Passive",
        points: 6,
        feedback: "Passive. Failing to advocate for your critical boundaries leads to burnout, poor exam results, and potentially sloppy slide work."
      },
      {
        id: 'q3_b',
        text: "Reply: 'I have an exam tomorrow so I can't do this. You shouldn't be giving me tasks this late in the afternoon anyway.'",
        style: "Aggressive",
        points: 4,
        feedback: "Aggressive. While you protect your boundary, your blunt tone and blaming style damages your reputation as a reliable teammate."
      },
      {
        id: 'q3_c',
        text: "Say: 'Sure, I love how everything is always an emergency around here. I guess I'll just fail my final exam tomorrow so we can have pretty slides.'",
        style: "Passive-Aggressive",
        points: 2,
        feedback: "Passive-Aggressive. This is highly unprofessional, guilt-tripping language that creates massive interpersonal resentment."
      },
      {
        id: 'q3_c2',
        text: "Reply: 'I have a critical final exam tomorrow at 11 AM. To ensure the slides are top-tier, I can draft the core layout tonight by 8 PM, or complete the deep-dive tomorrow immediately after my exam at 1 PM. Which option works best?'",
        style: "Assertive",
        points: 25,
        feedback: "Assertive. Phenomenal. You clearly state your boundary (exam), show commitment to quality, and present two constructive alternative pathways."
      }
    ]
  }
];

export const phrasePairs: PhrasePair[] = [
  {
    id: 'p1',
    casual: "You didn't explain this clearly.",
    polished: "Could you please help me understand this section a bit better?",
    context: "Clarifying details with a peer or instructor without sounding accusing.",
    whyItWorks: "Shifts the focus from accusing the speaker of failing ('You didn't...') to a collaborative request for guidance, which prevents defensiveness."
  },
  {
    id: 'p2',
    casual: "I don't care, whatever the group wants is fine with me.",
    polished: "I am supportive of either approach, but let's weigh the timelines of each before deciding.",
    context: "Expressing flexibility in a group discussion while maintaining active presence.",
    whyItWorks: "Replaces passive disinterest ('I don't care') with constructive consensus-building, keeping you positioned as a valuable, active teammate."
  },
  {
    id: 'p3',
    casual: "Stop interrupting me while I'm talking!",
    polished: "I'd love to finish my thought on this point, and then I'd be glad to get your feedback.",
    context: "Handling an over-enthusiastic colleague who keeps cutting you off.",
    whyItWorks: "Politely but firmly holds your speaking boundary. It labels the interruption without attacking the person, showing supreme emotional self-regulation."
  },
  {
    id: 'p4',
    casual: "I hate to bother you, and I'm really sorry to ask, but can you send the file?",
    polished: "Could you please share the project file at your earliest convenience?",
    context: "Asking for a routine deliverable from a colleague.",
    whyItWorks: "Deletes unnecessary self-deprecating apologies ('sorry to ask', 'bother you') which erode your perceived authority and make standard requests sound like major burdens."
  },
  {
    id: 'p5',
    casual: "That won't work at all, it's a bad idea.",
    polished: "That is an interesting perspective. How do you propose we address the budget constraints with that model?",
    context: "Critiquing an unfeasible proposal in a brainstorming session.",
    whyItWorks: "Instead of flatly shooting down an idea, it uses open-ended, diagnostic inquiry. It shifts the burden of proof to the proposer in a curious, respectful way."
  }
];

export const teleprompterScripts: TeleprompterScript[] = [
  {
    id: 'pitch',
    title: 'The Persuasive Project Pitch',
    category: 'Vocalics & Confidence',
    text: "Good morning, team. Today, I want to share a solution that will save us ten hours... every single week. Currently, our data intake is manual, repetitive, and prone to human error. By shifting to an automated cloud flow, we don't just save critical time; we eliminate ninety percent of our data entry friction. Imagine... a world where your morning starts with polished, ready-to-use insights, rather than tedious spreadsheet typing. Let's make this shift together, starting this Friday.",
    targetWpm: 135,
    pacingHints: [
      { wordIndex: 2, hint: 'Pause. Let the greeting settle.' },
      { wordIndex: 11, hint: 'Lower your pitch slightly for "save us ten hours" to show high value.' },
      { wordIndex: 14, hint: 'Pause for 1.5 seconds to let the benefit sink in.' },
      { wordIndex: 28, hint: 'Enunciate "automated cloud flow" clearly and with enthusiasm.' },
      { wordIndex: 37, hint: 'Pause. Take a slow breath.' },
      { wordIndex: 38, hint: 'Paint a picture with your voice on "Imagine". Speak warmly.' }
    ]
  },
  {
    id: 'apology',
    title: 'The Professional Client Update',
    category: 'Empathy & Crisis Management',
    text: "Thank you for joining the call, Marcus. I want to address the server outage directly. Our primary responsibility is to keep your storefront online, and we fell short of that standard last night. We have identified the memory leak and deployed a permanent hotfix as of four A.M. moving forward, we are setting up automated, real-time alerts to prevent this from ever happening again. I deeply value your partnership, and I am here to answer any questions you have.",
    targetWpm: 125,
    pacingHints: [
      { wordIndex: 5, hint: 'Maintain consistent, sincere eye contact.' },
      { wordIndex: 11, hint: 'Speak slowly and with gravity on "fell short of that standard".' },
      { wordIndex: 15, hint: 'Pause. Show accountable ownership.' },
      { wordIndex: 25, hint: 'Speed up slightly to show proactive resolution.' },
      { wordIndex: 36, hint: 'Pause for 1 second. Soften your tone for "deeply value".' }
    ]
  }
];
