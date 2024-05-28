let users = [
  {
    "name": "Yossi Cohen",
    "email": "yossi@example.com",
    "phone": "052-1234567",
    "image": "https://pic1.calcalist.co.il/PicServer3/2019/07/03/918094/1LM.jpg",
    "motto": "Always strive forward",
    "link": "https://example.com/yossi",
    "social_links": [
      "https://facebook.com/yossi",
      "https://twitter.com/yossi"
    ],
    "my_challenges": ["challenge1", "challenge2"],
    "coins": 100,
    "notifications": [
      {
        "challenge": "challenge1",
        "type": "join",
        "title": "Joined Challenge",
        "content": "Yossi joined the first challenge",
        "sender": "Yossi Cohen"
      },
      {
        "challenge": "challenge2",
        "type": "sent support",
        "title": "Sent Support",
        "content": "Yossi sent support for the second challenge",
        "sender": "Yossi Cohen"
      }
    ]
  },
  {
    "name": "Ronit Levy",
    "email": "ronit@example.com",
    "phone": "053-9876543",
    "image": "https://img.mako.co.il/2023/03/08/Anashim2023_e_NoLogo_re.jpg",
    "motto": "Live in the moment",
    "link": "https://example.com/ronit",
    "social_links": [
      "https://linkedin.com/in/ronit",
      "https://instagram.com/ronit"
    ],
    "my_challenges": ["challenge3"],
    "coins": 150,
    "notifications": [
      {
        "challenge": "challenge3",
        "type": "sent message",
        "title": "New Message",
        "content": "Ronit sent a message in the third challenge",
        "sender": "Ronit Levy"
      }
    ]
  },
  {
    "name": "David Israeli",
    "email": "david@example.com",
    "phone": "054-1239876",
    "image": "https://admin.drushim.co.il/Content/Uploads/637744851028105969_shutterstock_1723935472.jpg",
    "motto": "Push boundaries",
    "link": "https://example.com/david",
    "social_links": [
      "https://twitter.com/david",
      "https://facebook.com/david"
    ],
    "my_challenges": ["challenge4", "challenge5"],
    "coins": 200,
    "notifications": [
      {
        "challenge": "challenge4",
        "type": "join",
        "title": "Joined Challenge",
        "content": "David joined the fourth challenge",
        "sender": "David Israeli"
      }
    ]
  },
  {
    "name": "Hana Shahar",
    "email": "hana@example.com",
    "phone": "050-4567890",
    "image": "https://inbarcohen.com/wp-content/uploads/2022/12/-%D7%9C%D7%A9%D7%A4%D7%A8-%D7%91%D7%99%D7%98%D7%97%D7%95%D7%9F-%D7%A2%D7%A6%D7%9E%D7%99-%D7%A0%D7%A4%D7%97-%D7%9E%D7%95%D7%A7%D7%98%D7%9F-1-e1671784788649.jpg",
    "motto": "Never give up",
    "link": "https://example.com/hana",
    "social_links": [
      "https://linkedin.com/in/hana",
      "https://instagram.com/hana"
    ],
    "my_challenges": ["challenge6"],
    "coins": 250,
    "notifications": [
      {
        "challenge": "challenge6",
        "type": "sent support",
        "title": "Sent Support",
        "content": "Hana sent support for the sixth challenge",
        "sender": "Hana Shahar"
      }
    ]
  }
]

let coachs = [
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "052-1234567",
    "image": "https://admin.drushim.co.il/Content/Uploads/637744851028105969_shutterstock_1723935472.jpg"
  }

]

let challenges = [
  {
    "challenge_1": {
      "challenge_name": "Fitness Challenge",
      "cover_image": "https://www.dietmaster.co.il/wp-content/uploads/2015/02/%D7%A9%D7%99%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%96%D7%99%D7%94.jpg",
      "subtitle": "Get fit in 30 days",
      "duration_days": 30,
      "tags": ["fitness", "health", "wellness"],
      "is_public": true,
      "is_template": false,
      "creator": null,  // Relevant if is_template is true
      "store": [
        {
          "name": "Water Bottle",
          "description": "Stainless steel water bottle",
          "image": "https://www.ewines.co.il/wp-content/uploads/2022/08/3-%D7%9E%D7%99%D7%9D.jpg",
          "coins": 50,
          "days_to_expire": 30,
          "quantity": 100
        }
      ],
      "cards": [
        {
          "day": 1,
          "card_number": 1,
          "card_type": "question",
          "sub_type": "open",
          "title": "What do you like to eat?",
          "content": "Long text",
          "media": {
            "type": "image",
            "content": "https://static1.s123-cdn-static-a.com/uploads/1898061/2000_5c88fac711626.jpg"
          },
          "coins": 10,
          "image": "https://www.yo-yoo.co.il/coolpics/images/uploads/sim1.png",
          "appearance_percentage": 0,  // Only for lottery card
          "win_percentage": 0  // Only for lottery card
        }
      ],
      "invited": ["example1@example.com", "example2@example.com"]
    }
  },
  {
    "challenge_2": {
      "challenge_name": "Reading Challenge",
      "cover_image": "https://meyda.education.gov.il/files/pop/10322/kriaa.jpg",
      "subtitle": "Read 10 books in 60 days",
      "duration_days": 60,
      "tags": ["reading", "books", "education"],
      "is_public": true,
      "is_template": false,
      "creator": null,
      "store": [
        {
          "name": "Bookmark",
          "description": "Elegant bookmark",
          "image": "https://i.pinimg.com/736x/8c/f7/0b/8cf70b1a4a54c9cda9d40d5db77d75e8.jpg",
          "coins": 20,
          "days_to_expire": 60,
          "quantity": 200
        }
      ],
      "cards": [
        {
          "day": 1,
          "card_number": 1,
          "card_type": "question",
          "sub_type": "open",
          "title": "What is your favorite book?",
          "content": "Long text",
          "media": {
            "type": "text",
            "content": "The Great Gatsby"
          },
          "coins": 5,
          "image": null,
          "appearance_percentage": 0,
          "win_percentage": 0
        }
      ],
      "invited": ["reader1@example.com", "reader2@example.com"]
    }
  }

]
