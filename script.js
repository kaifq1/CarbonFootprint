// Global variables
let currentQuestionIndex = 0
let score = 0
let shuffledQuestions = []
const questionsPerSession = 10

// DOM Elements
const loadingContainer = document.getElementById("loading-container")
const quizCard = document.getElementById("quiz-card")
const resultScreen = document.getElementById("result-screen")
const scoreDisplay = document.getElementById("score-display")
const questionNumber = document.getElementById("question-number")
const questionEmoji = document.getElementById("question-emoji")
const itemTitle = document.getElementById("item-title")
const carbonFootprint = document.getElementById("carbon-footprint")
const questionText = document.getElementById("question-text")
const choicesContainer = document.getElementById("choices-container")
const feedbackContainer = document.getElementById("feedback-container")
const feedbackBox = document.getElementById("feedback-box")
const feedbackTitle = document.getElementById("feedback-title")
const correctAnswer = document.getElementById("correct-answer")
const bonusFactText = document.getElementById("bonus-fact-text")
const resultEmoji = document.getElementById("result-emoji")
const resultMessage = document.getElementById("result-message")
const progressBar = document.getElementById("progress-bar")
const resultScore = document.getElementById("result-score")
const restartButton = document.getElementById("restart-button")

// Quiz data - consolidated from quiz-data.js
const quizData = [
  // Original questions
  {
    item: "Plastic Bisleri Bottle",
    co2e_kg: 0.6,
    question: "How can we reduce the footprint of drinking water?",
    choices: ["Buy Bisleri daily", "Use a copper bottle", "Drink more", "Boil water each time"],
    answer: "Use a copper bottle",
    bonus_fact: "Reusable bottles can cut plastic waste by over 90%",
  },
  {
    item: "Vada Pav",
    co2e_kg: 0.3,
    question: "What makes a Vada Pav more eco-friendly?",
    choices: ["Using plastic wrap", "Adding more oil", "Using local ingredients", "Eating two instead of one"],
    answer: "Using local ingredients",
    bonus_fact: "Local ingredients travel shorter distances, reducing transport emissions by up to 70%!",
  },
  {
    item: "Auto Rickshaw Ride",
    co2e_kg: 0.8,
    question: "How can you make your auto rickshaw trips greener?",
    choices: ["Take longer routes", "Share rides with friends", "Use multiple autos", "Ask driver to go faster"],
    answer: "Share rides with friends",
    bonus_fact: "Sharing rides can reduce per-person emissions by up to 50%!",
  },
  {
    item: "Chai Time",
    co2e_kg: 0.2,
    question: "What's the most eco-friendly way to enjoy chai?",
    choices: ["Use disposable cups", "Make a large pot for family", "Buy from different shops", "Use electric kettle"],
    answer: "Make a large pot for family",
    bonus_fact: "Making chai in bulk uses 40% less energy than individual cups!",
  },
  {
    item: "School Notebook",
    co2e_kg: 0.5,
    question: "How can you make your school supplies greener?",
    choices: [
      "Buy new books every month",
      "Use both sides of paper",
      "Throw away half-used notebooks",
      "Use plastic covers",
    ],
    answer: "Use both sides of paper",
    bonus_fact: "Using both sides of paper can save up to 50% of paper waste!",
  },
  {
    item: "Home Lighting",
    co2e_kg: 1.2,
    question: "Which light bulb is best for the environment?",
    choices: ["Traditional bulb", "LED bulb", "Always keep lights on", "Use candles only"],
    answer: "LED bulb",
    bonus_fact: "LED bulbs use 75% less energy and last 25 times longer than traditional bulbs!",
  },
  {
    item: "Mumbai to Delhi Flight",
    co2e_kg: 104,
    question: "What's the most eco-friendly way to travel long distances in India?",
    choices: ["Always fly", "Take a train when possible", "Drive alone", "Use a new car each time"],
    answer: "Take a train when possible",
    bonus_fact: "Trains produce about 75% less carbon emissions per passenger than flights in India!",
  },
  {
    item: "Washing Clothes",
    co2e_kg: 0.7,
    question: "How can you make washing clothes more eco-friendly?",
    choices: [
      "Wash small loads daily",
      "Use cold water when possible",
      "Always use hot water",
      "Buy new clothes instead of washing",
    ],
    answer: "Use cold water when possible",
    bonus_fact: "Cold water washing reduces energy use by up to 90% compared to hot water!",
  },
  {
    item: "Mobile Phone Charging",
    co2e_kg: 0.1,
    question: "What's the greenest way to charge your phone?",
    choices: [
      "Keep it plugged in all day",
      "Charge during the day",
      "Use solar charger when possible",
      "Buy a new phone",
    ],
    answer: "Use solar charger when possible",
    bonus_fact: "Solar chargers can reduce your phone's carbon footprint by up to 85%!",
  },
  {
    item: "Diwali Celebration",
    co2e_kg: 5.2,
    question: "How can you make Diwali more eco-friendly?",
    choices: [
      "Use more firecrackers",
      "Use diyas instead of electric lights",
      "Leave lights on all night",
      "Use plastic decorations",
    ],
    answer: "Use diyas instead of electric lights",
    bonus_fact: "Traditional clay diyas are biodegradable and produce fewer emissions than electric lights!",
  },
  {
    item: "Single-Use Plastic Bag",
    co2e_kg: 0.04,
    question: "What's the best alternative to plastic bags?",
    choices: ["Use more plastic bags", "Cloth bag", "Ask for extra bags", "Throw bags in regular trash"],
    answer: "Cloth bag",
    bonus_fact:
      "Indians use 5 MILLION plastic bags every minute! A single cloth bag can replace 700+ plastic bags in its lifetime.",
  },
  {
    item: "Idli Breakfast",
    co2e_kg: 0.15,
    question: "What makes idli one of the most eco-friendly Indian foods?",
    choices: ["Adding more rice", "Its steaming process", "Using plastic plates", "Adding food coloring"],
    answer: "Its steaming process",
    bonus_fact: "Steaming idlis uses 84% less energy than deep-frying foods like pakoras!",
  },
  {
    item: "Air Conditioner Use",
    co2e_kg: 3.1,
    question: "How can you reduce AC carbon footprint in summer?",
    choices: ["Set to lowest temperature", "Use ceiling fans when possible", "Leave windows open", "Run multiple ACs"],
    answer: "Use ceiling fans when possible",
    bonus_fact: "A ceiling fan uses just 2-5% of the electricity of an AC! That's 20 times less energy!",
  },
  {
    item: "School Bus Ride",
    co2e_kg: 0.05,
    question: "What's the most eco-friendly way to get to school?",
    choices: ["Private car each day", "School bus", "New vehicle each day", "Skip school"],
    answer: "School bus",
    bonus_fact: "One school bus can take 50 cars off the road! That saves over 20 tons of CO₂ emissions per year!",
  },
  {
    item: "Banana Leaf Plate",
    co2e_kg: 0.01,
    question: "Why are banana leaf plates better than plastic plates?",
    choices: ["They're more expensive", "They're biodegradable", "They last longer", "They're harder to find"],
    answer: "They're biodegradable",
    bonus_fact: "Banana leaf plates decompose in just 2-3 days while plastic plates take 500+ years!",
  },
  {
    item: "Tandoori Roti",
    co2e_kg: 0.08,
    question: "What makes tandoor cooking eco-friendly?",
    choices: ["Using more coal", "Its heat efficiency", "Cooking one roti at a time", "Using electric tandoor"],
    answer: "Its heat efficiency",
    bonus_fact:
      "Traditional tandoors can reach 480°C and cook 200+ rotis with the same fuel that a stove uses for 50 rotis!",
  },
  {
    item: "Coconut Shell Craft",
    co2e_kg: 0.02,
    question: "What's the best use for coconut shells after eating?",
    choices: ["Throw them away", "Burn them", "Make crafts or utensils", "Bury them"],
    answer: "Make crafts or utensils",
    bonus_fact: "India produces 14.7 BILLION coconuts yearly! Reusing shells as crafts prevents 294,000 tons of waste!",
  },
  {
    item: "Holi Celebration",
    co2e_kg: 2.8,
    question: "How can you make Holi more eco-friendly?",
    choices: ["Use chemical colors", "Use natural colors from flowers", "Use more water", "Buy new clothes"],
    answer: "Use natural colors from flowers",
    bonus_fact: "Chemical Holi colors contain lead, mercury and can use up to 4,500 liters of water per person!",
  },
  {
    item: "Pressure Cooker Dal",
    co2e_kg: 0.3,
    question: "Why is a pressure cooker good for the environment?",
    choices: ["It uses more gas", "It cooks slower", "It saves up to 70% energy", "It needs more water"],
    answer: "It saves up to 70% energy",
    bonus_fact:
      "Pressure cookers cook dal in 1/3 the time and use 70% less gas than open pots! India has 250+ million pressure cookers!",
  },
  {
    item: "Cotton T-shirt",
    co2e_kg: 8.3,
    question: "How can you reduce the carbon footprint of your clothes?",
    choices: ["Buy new clothes weekly", "Wear clothes longer before replacing", "Wash daily", "Use hot water washing"],
    answer: "Wear clothes longer before replacing",
    bonus_fact:
      "It takes 2,700 liters of water to make ONE cotton t-shirt! That's enough drinking water for one person for 2.5 YEARS!",
  },
 {
    item: "Reusable Lunch Box",
    co2e_kg: 0.2,
    question: "What's the best way to pack your lunch sustainably?",
    choices: ["Use disposable plastic bags", "Wrap in aluminum foil", "Use a reusable lunch box", "Buy lunch daily"],
    answer: "Use a reusable lunch box",
    bonus_fact: "Using a reusable lunch box can prevent up to 180 single-use bags from ending up in landfills each year!"
    },
    {
    item: "Bamboo Toothbrush",
    co2e_kg: 0.05,
    question: "How can you make brushing your teeth more eco-friendly?",
    choices: ["Use a plastic toothbrush", "Use a bamboo toothbrush", "Brush longer", "Use more toothpaste"],
    answer: "Use a bamboo toothbrush",
    bonus_fact: "Bamboo toothbrushes decompose in about 6 months, whereas plastic ones can take over 400 years!"
    },
    {
    item: "Walking to School",
    co2e_kg: 0,
    question: "What's the greenest way to get to school?",
    choices: ["Drive alone", "Take a bus", "Ride a bike", "Walk"],
    answer: "Walk",
    bonus_fact: "Walking to school reduces carbon emissions and promotes health—burning up to 150 calories per 30-minute walk!"
    },
    {
    item: "Planting a Tree",
    co2e_kg: -21,
    question: "How does planting a tree help the environment?",
    choices: ["It provides shade", "It looks nice", "It absorbs CO₂", "It attracts birds"],
    answer: "It absorbs CO₂",
    bonus_fact: "One tree can absorb up to 21 kg of CO₂ per year, helping combat climate change!"
    },
    {
    item: "Using Public Transport",
    co2e_kg: 0.5,
    question: "Why is public transport more eco-friendly than personal cars?",
    choices: ["It's faster", "It's cheaper", "It reduces traffic", "It lowers per-person emissions"],
    answer: "It lowers per-person emissions",
    bonus_fact: "Public transport can reduce greenhouse gas emissions by up to 45% compared to private vehicles!"
    },
    {
    item: "Recycling Paper",
    co2e_kg: -1.5,
    question: "What benefit does recycling paper have?",
    choices: ["Saves money", "Reduces waste", "Saves trees", "All of the above"],
    answer: "All of the above",
    bonus_fact: "Recycling one ton of paper saves 17 trees and reduces CO₂ emissions by 1.5 metric tons!"
    },
    {
    item: "Solar-Powered Calculator",
    co2e_kg: 0.01,
    question: "Why choose a solar-powered calculator?",
    choices: ["It's trendy", "It saves battery waste", "It's more accurate", "It's cheaper"],
    answer: "It saves battery waste",
    bonus_fact: "Using solar-powered devices reduces battery waste, which can take over 100 years to decompose!"
    },
    {
    item: "Composting Food Waste",
    co2e_kg: -0.5,
    question: "How does composting help the environment?",
    choices: ["Creates fertilizer", "Reduces landfill waste", "Cuts methane emissions", "All of the above"],
    answer: "All of the above",
    bonus_fact: "Composting can reduce household waste by up to 30% and significantly lower methane emissions!"
    },
    {
    item: "Using LED Night Light",
    co2e_kg: 0.1,
    question: "Why are LED night lights better?",
    choices: ["They are brighter", "They last longer", "They use less energy", "They are colorful"],
    answer: "They use less energy",
    bonus_fact: "LED lights use up to 80% less energy and can last 25 times longer than incandescent bulbs!"
    },
    {
    item: "Reusable Water Bottle",
    co2e_kg: 0.2,
    question: "What's the benefit of using a reusable water bottle?",
    choices: ["Saves money", "Reduces plastic waste", "Keeps water cold", "All of the above"],
    answer: "All of the above",
    bonus_fact: "Using a reusable bottle can save an average of 167 plastic bottles per person annually!"
    },
    {
    item: "Eco-Friendly School Bag",
    co2e_kg: 0.3,
    question: "Which school bag is more sustainable?",
    choices: ["Plastic bag", "Leather bag", "Recycled material bag", "Paper bag"],
    answer: "Recycled material bag",
    bonus_fact: "Bags made from recycled materials can reduce energy consumption by up to 70% during production!"
    },
    {
    item: "Using Cloth Napkins",
    co2e_kg: 0.05,
    question: "Why choose cloth napkins over paper ones?",
    choices: ["They're more colorful", "They're reusable", "They're softer", "They're cheaper"],
    answer: "They're reusable",
    bonus_fact: "Using cloth napkins can save over 3,000 paper napkins per person annually!"
    },
    
    {
    item: "Energy-Efficient Refrigerator",
    co2e_kg: 1.5,
    question: "How does an energy-efficient fridge help the planet?",
    choices: ["Keeps food colder", "Uses less electricity", "Makes less noise", "Costs more"],
    answer: "Uses less electricity",
    bonus_fact: "Energy-efficient refrigerators can reduce energy use by up to 40%, saving money and the environment!"
    },

    {
    item: "Rainwater Harvesting",
    co2e_kg: -0.3,
    question: "What's the benefit of collecting rainwater?",
    choices: ["Watering plants", "Reducing water bills", "Conserving water", "All of the above"],
    answer: "All of the above",
    bonus_fact: "Rainwater harvesting can save up to 50,000 liters of water per household annually!"
    },
    

        {
          item: "Reusable Shopping Bag",
          co2e_kg: 0.03,
          question: "What’s a good reason to carry your own bag when shopping?",
          choices: ["To look cool", "To avoid plastic", "To carry more things", "To match your outfit"],
          answer: "To avoid plastic",
          bonus_fact: "Carrying your own bag reduces the use of single-use plastic which takes 500+ years to decompose!"
        },
        {
          item: "Paper Straws",
          co2e_kg: 0.01,
          question: "Why are paper straws better than plastic ones?",
          choices: ["They taste better", "They’re bendy", "They decompose faster", "They are colorful"],
          answer: "They decompose faster",
          bonus_fact: "Paper straws break down in weeks, unlike plastic straws which harm marine life for hundreds of years!"
        },
        {
          item: "Eco Ganpati Celebration",
          co2e_kg: 2.1,
          question: "How can Ganpati celebrations be made greener?",
          choices: ["Use thermocol decorations", "Use natural clay idols", "Use loud speakers", "Use plastic flowers"],
          answer: "Use natural clay idols",
          bonus_fact: "Clay idols dissolve easily and don’t pollute Mumbai’s lakes and oceans!"
        },
        {
          item: "Mumbai Local Train",
          co2e_kg: 0.6,
          question: "Why is traveling by Mumbai local train eco-friendly?",
          choices: ["Fast travel", "Less traffic", "Fewer emissions per person", "Fun ride"],
          answer: "Fewer emissions per person",
          bonus_fact: "Mumbai locals carry millions with low carbon emissions, helping reduce traffic and pollution!"
        },
        {
          item: "Vegetable Garden at Home",
          co2e_kg: -0.4,
          question: "What is one benefit of growing veggies at home?",
          choices: ["Free food", "Fresh air", "Lower carbon footprint", "All of the above"],
          answer: "All of the above",
          bonus_fact: "Home gardens cut food transport emissions and reduce your grocery trips!"
        },
        {
          item: "Hand-Me-Down Clothes",
          co2e_kg: 0.0,
          question: "Why is wearing hand-me-downs eco-friendly?",
          choices: ["They’re stylish", "They reduce textile waste", "They’re free", "They’re unique"],
          answer: "They reduce textile waste",
          bonus_fact: "Reusing clothes saves resources used in making new ones—like water, fabric, and energy!"
        },
        {
          item: "Beach Cleanup",
          co2e_kg: -0.2,
          question: "What’s the purpose of a beach cleanup drive?",
          choices: ["To find seashells", "To collect plastic waste", "To play in sand", "To build sandcastles"],
          answer: "To collect plastic waste",
          bonus_fact: "Mumbai’s Versova Beach was once transformed from a garbage dump to a clean public beach!"
        },
        {
          item: "Biodegradable Lunch Plates",
          co2e_kg: 0.02,
          question: "Which plates are best for school picnics?",
          choices: ["Thermocol plates", "Plastic plates", "Biodegradable plates", "Steel plates"],
          answer: "Biodegradable plates",
          bonus_fact: "Biodegradable plates break down naturally without harming the earth!"
        },
        {
          item: "Eco Rakhi",
          co2e_kg: 0.01,
          question: "What makes an eco-rakhi special?",
          choices: ["It’s colorful", "It has seeds", "It glows in the dark", "It has a watch"],
          answer: "It has seeds",
          bonus_fact: "Seed rakhis can be planted after the festival, growing into a flower or herb!"
        },
        {
          item: "Online Homework",
          co2e_kg: -0.1,
          question: "How does submitting homework online help the planet?",
          choices: ["It’s faster", "No need to carry books", "It saves paper", "It gets better grades"],
          answer: "It saves paper",
          bonus_fact: "Going digital reduces the need for printing and saves trees!"
        },
        

            {
              item: "Switching Off Lights",
              co2e_kg: -0.05,
              question: "Why should you turn off lights when not in use?",
              choices: ["To avoid darkness", "To save money", "To save energy", "To confuse people"],
              answer: "To save energy",
              bonus_fact: "Saving electricity means less burning of fossil fuels like coal!"
            },
            {
              item: "Rainwater Harvesting",
              co2e_kg: -0.3,
              question: "What is rainwater harvesting?",
              choices: ["Playing in rain", "Storing rainwater", "Boiling rainwater", "Throwing rainwater away"],
              answer: "Storing rainwater",
              bonus_fact: "Collecting rain reduces the need for pumped water, saving energy and groundwater!"
            },
            {
              item: "Solar Panel",
              co2e_kg: -0.8,
              question: "What does a solar panel do?",
              choices: ["Cools your home", "Collects dust", "Converts sunlight to electricity", "Grows plants"],
              answer: "Converts sunlight to electricity",
              bonus_fact: "Solar energy is clean, renewable, and doesn’t pollute the air!"
            },
            {
              item: "Reusable Water Bottle",
              co2e_kg: 0.02,
              question: "Why use a reusable water bottle?",
              choices: ["It’s stylish", "It keeps water cold", "It avoids plastic waste", "It’s heavier"],
              answer: "It avoids plastic waste",
              bonus_fact: "One reusable bottle can replace hundreds of plastic ones every year!"
            },
            {
              item: "Planting a Tree",
              co2e_kg: -1.0,
              question: "What do trees do for the planet?",
              choices: ["Give shade", "Look nice", "Absorb CO2", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Trees are Earth’s lungs—each one can absorb up to 22 kg of CO2 yearly!"
            },
            {
              item: "Carpooling",
              co2e_kg: -0.5,
              question: "Why is carpooling eco-friendly?",
              choices: ["It’s fun", "It saves petrol", "It reduces traffic", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Fewer cars on the road means less air pollution and traffic jams!"
            },
            {
              item: "Organic Food",
              co2e_kg: 0.1,
              question: "What makes food 'organic'?",
              choices: ["It’s tastier", "Grown without chemicals", "It’s colorful", "It’s from another planet"],
              answer: "Grown without chemicals",
              bonus_fact: "Organic farming avoids harmful pesticides and supports soil health!"
            },
            {
              item: "Refilling Ink Pens",
              co2e_kg: -0.01,
              question: "How does refilling pens help?",
              choices: ["Saves money", "Reduces plastic waste", "Looks cool", "Writes better"],
              answer: "Reduces plastic waste",
              bonus_fact: "Refillable pens last longer and cut down on disposable plastic waste!"
            },
            {
              item: "Using a Bicycle",
              co2e_kg: -1.2,
              question: "Why is cycling good for the planet?",
              choices: ["No fuel", "No emissions", "Healthy exercise", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Bicycles are zero-emission vehicles—perfect for short trips in Mumbai!"
            },
            {
              item: "Eco-Friendly Diya",
              co2e_kg: 0.01,
              question: "Which diya is better for Diwali?",
              choices: ["Plastic diya", "Clay diya", "Glass diya", "LED diya"],
              answer: "Clay diya",
              bonus_fact: "Traditional clay diyas are biodegradable and support local potters!"
            },
            {
              item: "Say No to Balloons",
              co2e_kg: 0.15,
              question: "Why should we avoid balloons at parties?",
              choices: ["They pop loudly", "They scare animals", "They pollute land and water", "They fly away"],
              answer: "They pollute land and water",
              bonus_fact: "Balloons can harm birds and sea animals if eaten by mistake!"
            },
            {
              item: "Composting Kitchen Waste",
              co2e_kg: -0.7,
              question: "What can composting do?",
              choices: ["Smell bad", "Create soil", "Waste food", "Attract bugs"],
              answer: "Create soil",
              bonus_fact: "Kitchen scraps become natural fertilizer when composted, not garbage!"
            },
            {
              item: "Using Cloth Napkins",
              co2e_kg: -0.02,
              question: "How do cloth napkins help the environment?",
              choices: ["Look fancy", "Used again and again", "Match the table", "Are soft"],
              answer: "Used again and again",
              bonus_fact: "They reduce paper waste and can be washed and reused many times!"
            },
            {
              item: "Avoiding Fast Fashion",
              co2e_kg: 1.3,
              question: "What is fast fashion?",
              choices: ["Trendy clothes", "Quick delivery", "Cheap clothes that change fast", "Wearing pajamas"],
              answer: "Cheap clothes that change fast",
              bonus_fact: "Fast fashion creates huge waste and pollution. Choose timeless styles instead!"
            },
            {
              item: "Eco-Friendly School Bag",
              co2e_kg: 0.08,
              question: "Which school bag is better for nature?",
              choices: ["Leather bag", "Plastic bag", "Recycled material bag", "Cartoon bag"],
              answer: "Recycled material bag",
              bonus_fact: "Recycled bags give new life to waste and reduce landfill burden!"
            },
            {
              item: "Digital Greeting Cards",
              co2e_kg: -0.05,
              question: "How do e-cards help the environment?",
              choices: ["They sparkle", "Save paper and postage", "Arrive instantly", "They sing songs"],
              answer: "Save paper and postage",
              bonus_fact: "Sending e-cards saves trees and transport energy!"
            },
            {
              item: "Fixing Leaky Taps",
              co2e_kg: -0.25,
              question: "Why fix a dripping tap?",
              choices: ["To stop noise", "To save water", "To avoid mess", "To clean the floor"],
              answer: "To save water",
              bonus_fact: "One leaky tap can waste up to 20 liters a day—that’s a lot!"
            },
            {
              item: "Thrift Store Shopping",
              co2e_kg: -0.9,
              question: "What’s cool about buying from thrift stores?",
              choices: ["It’s cheap", "It’s trendy", "It reduces waste", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Thrift shopping gives clothes a second life and cuts demand for new production!"
            },
            {
              item: "Local Farmers' Market",
              co2e_kg: -0.4,
              question: "Why buy local veggies?",
              choices: ["They’re fresher", "They travel less", "They support farmers", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Buying local reduces emissions from long-distance transport!"
            },
            {
              item: "Sharing Books",
              co2e_kg: -0.15,
              question: "What’s great about sharing books with friends?",
              choices: ["More stories", "Saves money", "Reduces printing", "All of the above"],
              answer: "All of the above",
              bonus_fact: "Sharing books means fewer trees cut for new pages!"
            }
                    
      
]

// Initialize the quiz
document.addEventListener("DOMContentLoaded", initQuiz)

function initQuiz() {
  // Shuffle questions and select random ones
  shuffleQuestions()

  // Set up event listeners
  restartButton.addEventListener("click", restartQuiz)

  // Start the quiz
  showQuestion()
}

function shuffleQuestions() {
  // Create a copy of the quiz data and shuffle it
  const shuffled = [...quizData].sort(() => Math.random() - 0.5)

  // Select the first few questions for this session
  shuffledQuestions = shuffled.slice(0, questionsPerSession)

  // Hide loading and show quiz card
  setTimeout(() => {
    loadingContainer.classList.add("hidden")
    quizCard.classList.remove("hidden")
  }, 100)
}

function showQuestion() {
  const question = shuffledQuestions[currentQuestionIndex]

  // Update question number
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}`

  // Set emoji based on item
  questionEmoji.textContent = getEmoji(question.item)

  // Update question details
  itemTitle.textContent = question.item
  carbonFootprint.textContent = `Carbon Footprint: ${question.co2e_kg} kg CO₂e`
  questionText.textContent = question.question

  // Clear previous choices
  choicesContainer.innerHTML = ""

  // Add choices
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button")
    button.className = "choice-button"
    button.innerHTML = `
      <span class="choice-letter">${String.fromCharCode(65 + index)}.</span>
      ${choice}
    `

    button.addEventListener("click", () => handleAnswer(choice, question))
    choicesContainer.appendChild(button)
  })

  // Hide feedback
  feedbackContainer.classList.add("hidden")
}

function handleAnswer(selectedChoice, question) {
  const isCorrect = selectedChoice === question.answer

  // Update score if correct
  if (isCorrect) {
    score++
    scoreDisplay.textContent = score
  }

  // Disable all choice buttons
  const choiceButtons = document.querySelectorAll(".choice-button")
  choiceButtons.forEach((button) => {
    button.disabled = true

    // Highlight the selected answer
    if (button.textContent.includes(selectedChoice)) {
      if (isCorrect) {
        button.classList.add("correct")
        button.innerHTML += '<span class="choice-icon">✓</span>'
      } else {
        button.classList.add("incorrect")
        button.innerHTML += '<span class="choice-icon">✗</span>'
      }
    }

    // Highlight the correct answer if user selected wrong
    if (!isCorrect && button.textContent.includes(question.answer)) {
      button.classList.add("correct")
    }
  })

  // Show feedback
  feedbackBox.className = "feedback-box " + (isCorrect ? "correct" : "incorrect")
  feedbackTitle.textContent = isCorrect ? "Correct! 🎉" : "Not quite right 😕"

  if (!isCorrect) {
    correctAnswer.textContent = `The correct answer is: ${question.answer}`
    correctAnswer.classList.remove("hidden")
  } else {
    correctAnswer.classList.add("hidden")
  }

  bonusFactText.textContent = question.bonus_fact
  feedbackContainer.classList.remove("hidden")

  // Move to next question or show results after delay
  setTimeout(() => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      currentQuestionIndex++
      showQuestion()
    } else {
      showResults()
    }
  }, 5000)
}




function showResults() {
  // Hide quiz card and show result screen
  quizCard.classList.add("hidden")
  resultScreen.classList.remove("hidden")

  // Calculate percentage
  const percentage = Math.round((score / shuffledQuestions.length) * 100)

  // Set result message and emoji based on score
  let message = ""
  let emoji = ""

  if (percentage >= 80) {
    message = "Eco Champion! You're a planet protector!"
    emoji = "🏆"
  } else if (percentage >= 60) {
    message = "Eco Warrior! You're doing great!"
    emoji = "🌟"
  } else if (percentage >= 40) {
    message = "Eco Learner! Keep improving!"
    emoji = "📚"
  } else {
    message = "Eco Beginner! Let's try again!"
    emoji = "🌱"
  }

  // Update result screen
  resultEmoji.textContent = emoji
  resultMessage.textContent = message
  resultScore.textContent = `Your Score: ${score}/${shuffledQuestions.length} (${percentage}%)`

  // Animate progress bar
  setTimeout(() => {
    progressBar.style.width = `${percentage}%`
  }, 500)
}

function restartQuiz() {
  // Reset variables
  window.location.reload()

  // Hide result screen and show loading
  resultScreen.classList.add("hidden")
  loadingContainer.classList.remove("hidden")


  // Shuffle questions again
  shuffleQuestions()
}

// Helper function to get emoji based on item
function getEmoji(item) {
  const lowerItem = item.toLowerCase()
  if (lowerItem.includes("food") || lowerItem.includes("vada") || lowerItem.includes("chai")) return "🍲"
  if (lowerItem.includes("bottle") || lowerItem.includes("plastic")) return "🧴"
  if (lowerItem.includes("car") || lowerItem.includes("bus") || lowerItem.includes("auto")) return "🚗"
  if (lowerItem.includes("light") || lowerItem.includes("electricity")) return "💡"
  if (lowerItem.includes("water")) return "💧"
  return "🌍"
}


// Main JavaScript for the Quiz Question Form
// Modify your fetch call in the front-end script.js
// Quiz Question Form Functionality
document.addEventListener('DOMContentLoaded', function () {
  const postQuestionBtn = document.getElementById('postQuestionBtn');
  const questionFormContainer = document.getElementById('questionFormContainer');
  const questionForm = document.getElementById('questionForm');
  const hideFormBtn = document.getElementById('hideFormBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const categorySelect = document.getElementById('categorySelect');

  // Show/hide form buttons
  postQuestionBtn?.addEventListener('click', () => {
    questionFormContainer.style.display = 'block';
    postQuestionBtn.style.display = 'none';
  });

  hideFormBtn?.addEventListener('click', () => {
    questionFormContainer.style.display = 'none';
    postQuestionBtn.style.display = 'block';
  });

  cancelBtn?.addEventListener('click', () => {
    questionFormContainer.style.display = 'none';
    postQuestionBtn.style.display = 'block';
    questionForm.reset();
  });

  // Populate dropdown
  if (categorySelect) {
    const categories = ['General Knowledge', 'Science', 'History', 'Geography', 'Entertainment', 'Sports', 'Other'];

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Select a category';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    categorySelect.appendChild(placeholderOption);

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  // Form submission handler
  questionForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn') || document.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const questionData = {
      name: document.getElementById('nameInput')?.value || '',
      category: document.getElementById('categorySelect')?.value || '',
      question: document.getElementById('questionInput')?.value || '',
      age: document.getElementById('ageInput')?.value || '', // New age field
      timestamp: new Date().toISOString()
    };
      
    // Validate form data
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyvjHv6inOsDETRvoL-G3dAqQ8DZxbwq8XdyutvGaTNUUjV6_JZsPXcydM2QMX7FWE2Mg/exec'; // Replace with your Web app URL
    const encodedData = new URLSearchParams();
    encodedData.append('data', JSON.stringify(questionData));

    fetch(scriptURL, {
      method: 'POST',
      body: encodedData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        if (data.result === 'success') {
          alert('Your question has been submitted successfully!');
        
          // Immediately add question to quiz
          quizData.push({
            item: `${questionData.category} Question by ${questionData.name}`,
            co2e_kg: 0.5,
            question: questionData.question,
            choices: ["Option A", "Option B", "Option C", "Option D"], // Placeholder
            answer: "Option A", // Placeholder
            bonus_fact: `Submitted by ${questionData.name}`
          });

          shuffleQuestions(); // Refresh the quiz question
          questionForm.reset();
          questionFormContainer.style.display = 'none';
          postQuestionBtn.style.display = 'block';
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Your question has been submitted successfully!');
      })
      .finally(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        window.location.reload(); // Refresh the page after alert
      });
  });
});
