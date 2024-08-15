// src\mockData\newDBSeeder.ts
import mongoose from "mongoose";
import User from "../models/UserModel";
import Card from "../models/CardModel";
import Challenge from "../models/ChallengeModel";
import Deck from "../models/DeckModel";
import Answer from "../models/AnswerModel";
import Prize from "../models/PrizeModel";
import Store from "../models/StoreModel";
import Team from "../models/TeamModel";
import Media from "../models/MediaModel";
import FeedBack from "../models/FeedBackModel";
import { connect } from "../config/db";


export default async function seed() {
  connect();
  console.log("###########  START seed  #########");

  // Helper function to create ObjectId
  const createObjectId = () => new mongoose.Types.ObjectId();

  // Seed Users
  const seedUsers = async () => {
    const users = [
      {
        fullName: "John Doe",
        email: "john@example.com",
        status: "Coach",
        isActive: true,
      },
      {
        fullName: "Jane Smith",
        email: "jane@example.com",
        status: "User",
        isActive: true,
      },
      {
        fullName: "Mike Ross",
        email: "mike@example.com",
        status: "User",
        isActive: true,
      },
    ];

    await User.insertMany(users);
    console.log("Users Seeded");
  };

  // Seed Cards
  const seedCards = async () => {
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!coach) {
      console.error("No coach found");
      return;
    }
    const cards = [
      {
        cardType: "Quiz",
        title: "Math Challenge",
        content: "Solve this equation",
        coins: 5,
        coach: coach._id,
      },
      {
        cardType: "Video",
        title: "Workout Session",
        content: "Follow the steps",
        coins: 10,
        coach: coach._id,
      },
    ];

    await Card.insertMany(cards);
    console.log("Cards Seeded");
  };

  // Seed Challenges
  const seedChallenges = async () => {
    const team = await Team.findOne().exec();
    const deck = await Deck.findOne().exec();
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!team || !deck || !coach) {
      console.error("No team, deck, or coach found");
      return;
    }
    const challenges = [
      {
        challengeName: "Fitness Challenge",
        shortDescription: "30-day fitness program",
        longDescription: "Get fit in 30 days",
        team: team._id,
        deck: deck._id,
        startDate: new Date(),
        coach: coach._id,
      },
    ];

    await Challenge.insertMany(challenges);
    console.log("Challenges Seeded");
  };

  // Seed Decks
  const seedDecks = async () => {
    const cards = await Card.find().limit(2).exec();
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!coach) {
      console.error("No coach found");
      return;
    }
    const decks = [
      {
        deckName: "Beginner Deck",
        description: "A deck for beginners",
        cards: [
          { card: cards[0]._id, day: 1, cardOrder: 1 },
          { card: cards[1]._id, day: 2, cardOrder: 2 },
        ],
        coach: coach._id,
      },
    ];

    await Deck.insertMany(decks);
    console.log("Decks Seeded");
  };

  // Seed Answers
  const seedAnswers = async () => {
    const [challenge, card, user] = await Promise.all([
      Challenge.findOne().exec(),
      Card.findOne().exec(),
      User.findOne({ status: "User" }).exec(),
    ]);
    if (!challenge || !card || !user) {
      console.error("No challenge, card, or user found");
      return;
    }
    const answers = [
      {
        challenge: challenge._id,
        card: card._id,
        day: 1,
        cardOrder: 1,
        user: user._id,
        answerValue: "42",
      },
    ];

    await Answer.insertMany(answers);
    console.log("Answers Seeded");
  };

  // Seed Prizes
  const seedPrizes = async () => {
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!coach) {
      console.error("No coach found");
      return;
    }
    const prizes = [
      {
        name: "Free Membership",
        description: "Get one month free",
        price: 50,
        quantity: 1,
        daysToAvailability: 5,
        image: "https://example.com/free-membership.jpg",
        daysToExpiry: 30,
        cardType: "Bonus",
        coach: coach._id,
      },
    ];

    await Prize.insertMany(prizes);
    console.log("Prizes Seeded");
  };

  // Seed Stores
  const seedStores = async () => {
    const [prize, coach] = await Promise.all([
      Prize.findOne().exec(),
      User.findOne({ status: "Coach" }).exec(),
    ]);
    if (!prize || !coach) {
      console.error("No prize or coach found");
      return;
    }
    const stores = [
      { storeName: "Gym Store", prizes: [prize._id], coach: coach._id },
    ];

    await Store.insertMany(stores);
    console.log("Stores Seeded");
  };

  // Seed Teams
  const seedTeams = async () => {
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!coach) {
      console.error("No coach found");
      return;
    }
    const teams = [{ teamName: "Team Alpha", coach: coach._id }];

    await Team.insertMany(teams);
    console.log("Teams Seeded");
  };

  // Seed Media
  const seedMedia = async () => {
    const coach = await User.findOne({ status: "Coach" }).exec();
    if (!coach) {
      console.error("No coach found");
      return;
    }
    const media = [
      {
        fileName: "workout.mp4",
        link: "http://example.com/video",
        size: "500MB",
        type: "video",
        coach: coach._id,
      },
    ];

    await Media.insertMany(media);
    console.log("Media Seeded");
  };

  // Seed Feedback
  const seedFeedback = async () => {
    const feedback = [
      {
        subject: "App Issue",
        name: "User1",
        email: "user1@example.com",
        message: "I found a bug.",
      },
    ];

    await FeedBack.insertMany(feedback);
    console.log("Feedback Seeded");
  };

  // Main seed function
  const seedDatabase = async () => {
    try {

      console.log("deleteing database...");
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
      console.log("database deleted");
  
      console.log("Seeding database...");
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
      console.log("Database Seeded");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      mongoose.disconnect();
    }
    console.log("###########  DONE  #########");
  };
  seedDatabase()
}
