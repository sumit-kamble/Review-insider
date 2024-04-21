// Sample product data (replace with your actual product data)
const products = [
  {
    name: "Fire HD 8 Tablet with Alexa",
    image: "https://m.media-amazon.com/images/I/61jTlnxey6L._AC_SY450_.jpg",
    category: "Electronics,iPad & Tablets",
    manufacturer: "Amazon",
    reviews: [
      "This product so far has not disappointed. My children love to use it and I like the ability to monitor control what content they see with ease.",
      "great for beginner or experienced person. Bought as a gift and she loves it",
      "Inexpensive tablet for him to use and learn on, step up from the NABI. He was thrilled with it, learn how to Skype on it already...",
    ],
  },
  {
    name: "Kindle Oasis E-reader",
    image: "https://m.media-amazon.com/images/I/71anPiIT+TL._AC_SX679_.jpg",
    category: "eBook Readers,Kindle E-readers",
    manufacturer: "Amazon",
    reviews: [
      "Very lightweight and portable with excellent battery life.",
      "I like this so much more than the Voyage. The shape makes for easier holding. I only wish this devise was maybe 2 inches taller then it would look like a real book",
      "Replacing older reader without a light and traveling overseas soon. With electronics in the cabin under scrutiny, this very small and very lightweight reader fits the bill! Perfect in small purses and large pockets. I can read without annoying seatmate with cabin overhead seat light. Easy to hold in either hand and screen adjusts for whichever direction you're holding it.",
      "This is my first e-reader. I didn't know about the odd refresh and it took a little while to get used to but I do love how small and light it is and that I do not have to remember to plug it in everyday",
    ],
  },

  {
    name: "Echo Show 5 - Smart speaker",
    image: "https://m.media-amazon.com/images/I/61ucyJDDd1L._SX679_.jpg",
    category: "Amazon Echo,Virtual Assistant Speakers",
    manufacturer: "Amazon",
    reviews: [
      "Great product. Use it in the kitchen and can see who is at the front door with it being connected to my ring doorbell.",
      "Got one for my mom in order to video chat with her. Works awesome.",
      "Love Alexa especially the touch screen - can play games- like Jeopardy",
      "The echo show does so much,the music line up is good,it can do anything.",
    ],
  },
  {
    name: "Echo Plus with built-in Hub",
    image: "https://m.media-amazon.com/images/I/61k5jhhpZOL._AC_SX679_.jpg",
    category: "Amazon Echo,Smart Home",
    manufacturer: "Amazon",
    reviews: [
      "Have yet to explore all the aspects. Enjoy using it daily.",
      "Really enjoy having the echo to use to control the lights and music in our house",
      "Great way to introduce family and friends to A.I. Technology.",
    ],
  },
  {
    name: "All-New Fire 7 Kids Edition",
    image: "https://m.media-amazon.com/images/I/61HqG+mJN1L._SX679_.jpg",
    category: "Computers,Fire Tablets",
    manufacturer: "Amazon",
    reviews: [
      "Great for young children",
      "Great tablet even for kids",
      "Excellent for a 3 yr old",
      "It's worth getting to start off",
    ],
  },

  {
    name: "Tap - Alexa-Enabled Portable Bluetooth Speaker",
    image: "https://m.media-amazon.com/images/I/71Y9WlYwFaL._AC_SY450_.jpg",
    category: "Electronics",
    manufacturer: "Amazon",
    reviews: [
      "When I purchased the Tap I thought it was a portable speaker for the echo. It's actually it's own device. Yes, it's portable, can operate wireless.It does work with the same 'alexa' set up. The Echo operates with no hands Ä¶you can simply speak to Alexa. The tap has a microphone button you need to hold down to speak to Alexa. Great sound quality. Rechargeable base unit.",
      "I'm still learning what all i can do with this device, but I am continually amazed at it's capabilities. I love playing with it and learning from it. When doing other things, I have Tap playing music. I love this thing.",
      "This product, while the speaker is great, fails to deliver with a voice interface. Use your cell phone or computer and buy an Echo Dot.",
      "The only thing I have to recommend is that it will not hook up with a blue tooth device. Why is that?",
    ],
  },

  // Add more products as needed
];

// Function to generate product cards
function generateProductCards() {
  const productList = document.getElementById("productList");

  // Clear existing content
  productList.innerHTML = "";

  // Generate product cards
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Product image
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    card.appendChild(image);

    // Product name
    const name = document.createElement("p");
    name.textContent = product.name;
    card.appendChild(name);

    // Review button
    const reviewButton = document.createElement("button");
    reviewButton.textContent = "Review";
    reviewButton.addEventListener("click", () => {
      showReviewForm(product);
    });
    card.appendChild(reviewButton);

    // Append product card to the product list
    productList.appendChild(card);
  });
}

// Function to display review form for a specific product
function showReviewForm(product) {
  const reviewFormContainer = document.getElementById("reviewFormContainer");

  // Clear existing content
  reviewFormContainer.innerHTML = "";

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  // Create review form
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    // event.preventDefault();
    // const reviewInput = form.querySelector("textarea").value;
    // if (reviewInput.trim() !== "") {
    //   // Store the review for the product
    //   product.reviews.push(reviewInput);
    //   // Perform sentiment analysis and display result (dummy implementation)
    //   const sentiment = analyzeSentiment(reviewInput);
    //   const resultText = `Review for ${product.name}: ${
    //     sentiment === "positive" ? "Positive" : "Negative"
    //   }`;
    //   displayResult(resultText);
    // } else {
    //   alert("Please enter your review.");
    // }

    event.preventDefault();
    const reviewInput = form.querySelector("textarea").value;
    if (reviewInput.trim() !== "") {
      product.reviews.push(reviewInput);
      // Send the review to the backend for sentiment analysis
      submitReview(reviewInput);
    } else {
      alert("Please enter your review.");
    }
  });

  // Apply CSS styles to the form
  form.style.maxWidth = "400px";
  form.style.margin = "0 auto";
  form.style.padding = "20px";
  form.style.border = "1px solid #ccc";
  form.style.borderRadius = "5px";
  form.style.backgroundColor = "#f9f9f9";
  form.style.transition = "opacity 0.5s ease"; // Transition for opacity

  // Animation for form appearance
  form.style.opacity = "0";
  setTimeout(() => {
    form.style.opacity = "1";
  }, 100);

  // Product details
  const heading = document.createElement("h2");
  heading.textContent = product.name;
  heading.style.marginBottom = "20px"; // Add margin bottom for spacing
  form.appendChild(heading);

  const detailsList = document.createElement("ul");
  detailsList.style.listStyleType = "none"; // Remove bullet points
  const categoryItem = document.createElement("li");
  categoryItem.textContent = `Category: ${product.category}`;
  detailsList.appendChild(categoryItem);

  const manufacturerItem = document.createElement("li");
  manufacturerItem.textContent = `Manufacturer: ${product.manufacturer}`;
  detailsList.appendChild(manufacturerItem);

  form.appendChild(detailsList);

  // Review input
  const reviewInput = document.createElement("textarea");
  reviewInput.placeholder = "Write your review here...";
  reviewInput.style.width = "100%";
  reviewInput.style.padding = "8px";
  reviewInput.style.border = "1px solid #ccc";
  reviewInput.style.borderRadius = "3px";
  reviewInput.style.boxSizing = "border-box";
  reviewInput.style.marginBottom = "20px"; // Add margin bottom for spacing
  form.appendChild(reviewInput);

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Review";
  submitButton.style.padding = "10px 20px";
  submitButton.style.backgroundColor = "#007bff";
  submitButton.style.color = "#fff";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "3px";
  submitButton.style.cursor = "pointer";
  form.appendChild(submitButton);

  // Reviews section
  const reviewsHeading = document.createElement("h3");
  reviewsHeading.textContent = "Reviews";
  reviewsHeading.style.marginTop = "20px"; // Add margin top for spacing
  form.appendChild(reviewsHeading);

  const reviewsList = document.createElement("ul");
  reviewsList.classList.add("reviews-list");
  //reviewsList.style.listStyleType = "none"; // Remove bullet points
  form.appendChild(reviewsList);

  // Display existing reviews
  showReviews(product, reviewsList);
  reviewFormContainer.appendChild(form);
}

// Function to display existing reviews for a specific product
function showReviews(product, reviewsList) {
  // Clear existing reviews
  if (reviewsList) {
    reviewsList.innerHTML = "";
  }

  // Display existing reviews
  if (product.reviews.length > 0) {
    product.reviews.forEach((review) => {
      const reviewItem = document.createElement("li");
      reviewItem.textContent = review;
      if (reviewsList) {
        reviewsList.appendChild(reviewItem);
      } else {
        // If reviewsList is not provided, display reviews in the result container
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.appendChild(reviewItem);
      }
    });
  } else {
    const noReviewsMessage = document.createElement("li");
    noReviewsMessage.textContent = "No reviews yet.";
    if (reviewsList) {
      reviewsList.appendChild(noReviewsMessage);
    } else {
      // If reviewsList is not provided, display message in the result container
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.appendChild(noReviewsMessage);
    }
  }
}

// Function to display sentiment analysis result
// function displayResult(resultText) {
//   const resultContainer = document.getElementById("resultContainer");
//   const resultParagraph = document.getElementById("resultText");
//   resultParagraph.textContent = resultText;
//   resultContainer.style.display = "block";
// }

// Dummy sentiment analysis function (replace with actual implementation)
// function analyzeSentiment(review) {
//   // Assume positive if review contains "great" or "excellent", otherwise negative
//   return review.toLowerCase().includes("great") ||
//     review.toLowerCase().includes("excellent")
//     ? "positive"
//     : "negative";
// }

function submitReview(review) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  const loader = document.getElementById("loader");
  loader.classList.remove("hidden"); // Display the loader

  fetch("/api/submit-review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: review }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayReviewResult(data);
      loader.classList.add("hidden"); // Hide the loader after getting response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayReviewResult(data) {
  // console.log("Sentiment:", data.sentiment);
  // console.log("Review:", data.review);

  // const resultContainer = document.getElementById("resultContainer");
  // resultContainer.innerHTML = "";

  // const resultText = `Review sentiment: ${
  //   data.sentiment === "positive" ? "Positive" : "Negative"
  // }`;

  // // Create a paragraph element to display the result
  // const resultParagraph = document.createElement("p");
  // resultParagraph.textContent = resultText;
  // resultContainer.style.display = "block";

  // // Append the result to the result container
  // resultContainer.appendChild(resultParagraph);

  // console.log("Sentiment:", data.sentiment);
  // console.log("Review:", data.review);

  // const resultContainer = document.getElementById("resultContainer");
  // resultContainer.innerHTML = "";

  // // Create a paragraph element to display the result
  // const resultParagraph = document.createElement("p");
  // resultParagraph.textContent = `Review sentiment: ${
  //   data.sentiment === "positive" ? "Positive" : "Negative"
  // }`;

  // // Apply CSS styles to the result container and result paragraph
  // resultContainer.style.display = "block";
  // resultContainer.style.padding = "10px";
  // resultContainer.style.borderRadius = "5px";
  // resultContainer.style.backgroundColor =
  //   data.sentiment === "positive" ? "#5cb85c" : "#d9534f"; // Green for positive, red for negative
  // resultContainer.style.color = "#fff";
  // resultContainer.style.fontWeight = "bold";
  // resultContainer.style.textAlign = "center";
  // resultContainer.style.marginTop = "20px";
  // resultContainer.style.opacity = "0"; // Set initial opacity to 0 for animation

  // // Append the result to the result container
  // resultContainer.appendChild(resultParagraph);

  // // Animation for result container
  // setTimeout(() => {
  //   resultContainer.style.opacity = "1"; // Fade in the result container
  // }, 100);

  console.log("Sentiment:", data.sentiment);
  console.log("Review:", data.review);

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  // Create a paragraph element to display the result
  const resultParagraph = document.createElement("p");
  let sentimentText = "";
  let backgroundColor = "";

  // Determine sentiment text and background color based on sentiment
  switch (data.sentiment) {
    case "positive":
      sentimentText = "Positive";
      backgroundColor = "#5cb85c"; // Green for positive
      break;
    case "negative":
      sentimentText = "Negative";
      backgroundColor = "#d9534f"; // Red for negative
      break;
    default:
      sentimentText = "Neutral";
      backgroundColor = "#f0ad4e"; // Yellow for neutral
      break;
  }

  resultParagraph.textContent = `Review sentiment: ${sentimentText}`;

  // Apply CSS styles to the result container and result paragraph
  resultContainer.style.display = "block";
  resultContainer.style.padding = "10px";
  resultContainer.style.borderRadius = "5px";
  resultContainer.style.backgroundColor = backgroundColor;
  resultContainer.style.color = "#fff";
  resultContainer.style.fontWeight = "bold";
  resultContainer.style.textAlign = "center";
  resultContainer.style.marginTop = "20px";
  resultContainer.style.opacity = "0"; // Set initial opacity to 0 for animation

  // Append the result to the result container
  resultContainer.appendChild(resultParagraph);

  // Animation for result container
  setTimeout(() => {
    resultContainer.style.opacity = "1"; // Fade in the result container
  }, 100);
}

// Generate product cards when the page loads
window.addEventListener("load", generateProductCards);
