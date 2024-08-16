// src\mockData\newDBSeeder.ts
import mongoose from 'mongoose';
import User from '../models/UserModel';
import Card from '../models/CardModel';
import Challenge from '../models/ChallengeModel';
import Deck from '../models/DeckModel';
import Answer from '../models/AnswerModel';
import Prize from '../models/PrizeModel';
import Store from '../models/StoreModel';
import Team from '../models/TeamModel';
import Media from '../models/MediaModel';
import FeedBack from '../models/FeedBackModel';
import { connect } from '../config/db';

export default async function seed() {
  console.log('###########  START seed  #########');
  connect();

  // Helper function to create ObjectId
  const createObjectId = () => new mongoose.Types.ObjectId();

  // Seed Users
  const seedUsers = async () => {
    const users = [
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        status: 'Coach',
        isActive: true,
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        status: 'User',
        isActive: true,
      },
      {
        fullName: 'Mike Ross',
        email: 'mike@example.com',
        status: 'User',
        isActive: true,
      },
      {
        fullName: 'Sara Connor',
        email: 'sara@example.com',
        status: 'User',
        isActive: true,
      },
    ];

    await User.insertMany(users);
    console.log('Users Seeded');
  };

  // Seed Cards
  const seedCards = async () => {
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!coach) {
      console.error('No coach found');
      return;
    }
    const cards = [
      {
        cardType: 'Quiz',
        title: 'Math Challenge',
        content: 'Solve this equation',
        coins: 5,
        coach: coach._id,
      },
      {
        cardType: 'Video',
        title: 'Workout Session',
        content: 'Follow the steps',
        coins: 10,
        coach: coach._id,
      },
      {
        cardType: 'Quiz',
        title: 'Science Challenge',
        content: 'Describe photosynthesis',
        coins: 8,
        coach: coach._id,
      },
      {
        cardType: 'Audio',
        title: 'Motivational Speech',
        content: 'Listen to this speech',
        coins: 6,
        coach: coach._id,
      },
    ];

    await Card.insertMany(cards);
    console.log('Cards Seeded');
  };

  // Seed Challenges
  const seedChallenges = async () => {
    const team = await Team.findOne().exec();
    const deck = await Deck.findOne().exec();
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!team || !deck || !coach) {
      console.error('No team, deck, or coach found');
      return;
    }
    const challenges = [
      {
        challengeName: 'Fitness Challenge',
        shortDescription: '30-day fitness program',
        longDescription: 'Get fit in 30 days',
        team: team._id,
        deck: deck._id,
        startDate: new Date(),
        coach: coach._id,
      },
      {
        challengeName: 'Mindfulness Challenge',
        shortDescription: '7-day mental wellness program',
        longDescription: 'Boost your mental health',
        team: team._id,
        deck: deck._id,
        startDate: new Date(),
        coach: coach._id,
      },
      {
        challengeName: 'Nutrition Challenge',
        shortDescription: '14-day healthy eating plan',
        longDescription: 'Eat healthier in 14 days',
        team: team._id,
        deck: deck._id,
        startDate: new Date(),
        coach: coach._id,
      },
      {
        challengeName: 'Productivity Challenge',
        shortDescription: '10-day productivity program',
        longDescription: 'Improve productivity',
        team: team._id,
        deck: deck._id,
        startDate: new Date(),
        coach: coach._id,
      },
    ];

    await Challenge.insertMany(challenges);
    console.log('Challenges Seeded');
  };

  // Seed Decks
  const seedDecks = async () => {
    const cards = await Card.find().limit(4).exec();
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!coach) {
      console.error('No coach found');
      return;
    }
    const decks = [
      {
        deckName: 'Beginner Deck',
        description: 'A deck for beginners',
        cards: [
          { card: cards[0]._id, day: 1, cardOrder: 1 },
          { card: cards[1]._id, day: 2, cardOrder: 2 },
        ],
        coach: coach._id,
      },
      {
        deckName: 'Intermediate Deck',
        description: 'A deck for intermediate users',
        cards: [
          { card: cards[2]._id, day: 1, cardOrder: 1 },
          { card: cards[3]._id, day: 2, cardOrder: 2 },
        ],
        coach: coach._id,
      },
    ];

    await Deck.insertMany(decks);
    console.log('Decks Seeded');
  };

  // Seed Answers
  const seedAnswers = async () => {
    const [challenge, card, user] = await Promise.all([
      Challenge.findOne().exec(),
      Card.findOne().exec(),
      User.findOne({ status: 'User' }).exec(),
    ]);
    if (!challenge || !card || !user) {
      console.error('No challenge, card, or user found');
      return;
    }
    const answers = [
      {
        challenge: challenge._id,
        card: card._id,
        day: 1,
        cardOrder: 1,
        user: user._id,
        answerValue: '42',
      },
      {
        challenge: challenge._id,
        card: card._id,
        day: 2,
        cardOrder: 2,
        user: user._id,
        answerValue: '24',
      },
      {
        challenge: challenge._id,
        card: card._id,
        day: 3,
        cardOrder: 3,
        user: user._id,
        answerValue: '36',
      },
      {
        challenge: challenge._id,
        card: card._id,
        day: 4,
        cardOrder: 4,
        user: user._id,
        answerValue: '15',
      },
    ];

    await Answer.insertMany(answers);
    console.log('Answers Seeded');
  };

  // Seed Prizes
  const seedPrizes = async () => {
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!coach) {
      console.error('No coach found');
      return;
    }
    const prizes = [
      {
        name: 'Free Membership',
        description: 'Get one month free',
        price: 50,
        quantity: 1,
        daysToAvailability: 5,
        image: 'https://example.com/free-membership.jpg',
        daysToExpiry: 30,
        cardType: 'Bonus',
        coach: coach._id,
      },
      {
        name: 'Discount Voucher',
        description: '10% off',
        price: 30,
        quantity: 2,
        daysToAvailability: 2,
        image: 'https://example.com/discount.jpg',
        daysToExpiry: 20,
        cardType: 'Bonus',
        coach: coach._id,
      },
      {
        name: 'Gym Access',
        description: 'Access to gym for a week',
        price: 40,
        quantity: 3,
        daysToAvailability: 3,
        image: 'https://example.com/gym.jpg',
        daysToExpiry: 10,
        cardType: 'Bonus',
        coach: coach._id,
      },
      {
        name: 'E-book',
        description: 'Download a fitness e-book',
        price: 20,
        quantity: 4,
        daysToAvailability: 1,
        image: 'https://example.com/ebook.jpg',
        daysToExpiry: 15,
        cardType: 'Bonus',
        coach: coach._id,
      },
    ];

    await Prize.insertMany(prizes);
    console.log('Prizes Seeded');
  };

  // Seed Stores
  const seedStores = async () => {
    const [prize, coach] = await Promise.all([
      Prize.find().exec(),
      User.findOne({ status: 'Coach' }).exec(),
    ]);
    if (!prize || !coach) {
      console.error('No prize or coach found');
      return;
    }
    const stores = [
      {
        storeName: 'Gym Store',
        prizes: prize.map((p) => p._id),
        coach: coach._id,
      },
      {
        storeName: 'Fitness Store',
        prizes: prize.map((p) => p._id),
        coach: coach._id,
      },
    ];

    await Store.insertMany(stores);
    console.log('Stores Seeded');
  };

  // Seed Teams
  const seedTeams = async () => {
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!coach) {
      console.error('No coach found');
      return;
    }
    const teams = [
      { teamName: 'Team Alpha', coach: coach._id },
      { teamName: 'Team Beta', coach: coach._id },
      { teamName: 'Team Gamma', coach: coach._id },
      { teamName: 'Team Delta', coach: coach._id },
    ];

    await Team.insertMany(teams);
    console.log('Teams Seeded');
  };

  // Seed Media
  const seedMedia = async () => {
    const coach = await User.findOne({ status: 'Coach' }).exec();
    if (!coach) {
      console.error('No coach found');
      return;
    }
    const media = [
      {
        fileName: 'workout.mp4',
        url: 'https://example.com/workout.mp4',
        size: 1024,
        type: 'video/mp4',
        coach: coach._id,
      },
      {
        fileName: 'speech.mp3',
        url: 'https://example.com/speech.mp3',
        size: 1024,
        type: 'audio/mp3',
        coach: coach._id,
      },
      {
        fileName: 'exercise.jpg',
        url: 'https://example.com/exercise.jpg',
        size: 1024,
        type: 'image/jpg',
        coach: coach._id,
      },
      {
        fileName: 'guide.pdf',
        url: 'https://example.com/guide.pdf',
        size: 1024,
        type: 'application/pdf',
        coach: coach._id,
      },
    ];

    await Media.insertMany(media);
    console.log('Media Seeded');
  };

  // Seed Feedback
  const seedFeedback = async () => {
    const user = await User.findOne({ status: 'User' }).exec();
    if (!user) {
      console.error('No user found');
      return;
    }
    const feedbacks = [
      {
        subject: 'Session Feedback',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great session!',
      },
      {
        subject: 'Challenge Feedback',
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Very helpful!',
      },
      {
        subject: 'General Feedback',
        name: 'Mike Ross',
        email: 'mike@example.com',
      }, // No message (optional)
      {
        subject: 'App Feedback',
        name: 'Sara Connor',
        email: 'sara@example.com',
        message: 'Loved the challenge!',
      },
    ];

    await FeedBack.insertMany(feedbacks);
    console.log('Feedback Seeded');
  };

  // Main seed function
  const seedDatabase = async () => {
    try {
      console.log('deleteing database...');
      await User.deleteMany({});
      await Card.deleteMany({});
      await Challenge.deleteMany({});
      await Deck.deleteMany({});
      await Answer.deleteMany({});
      await Prize.deleteMany({});
      await Store.deleteMany({});
      await Team.deleteMany({});
      await Media.deleteMany({});
      await FeedBack.deleteMany({});
      console.log('database deleted');

      console.log('Seeding database...');
      await seedUsers();
      await seedTeams();
      await seedMedia();
      await seedCards();
      await seedDecks();
      await seedChallenges();
      await seedAnswers();
      await seedPrizes();
      await seedStores();
      await seedFeedback();
      console.log('Database Seeded');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  seedDatabase();
  console.log('###########  END seed  #########');
}
