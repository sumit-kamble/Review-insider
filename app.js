const express = require("express");
const { PythonShell } = require("python-shell");
const bodyParser = require("body-parser");
const path = require("path");
const { exec } = require("child_process");
const { stdout } = require("process");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Dummy ML model function (replace with your actual ML model integration)
function predictSentiment(review) {
  // Dummy implementation: Just returns positive sentiment for any review
  return { sentiment: "positive", review: review };
}

// Route to handle review submission
app.post("/api/submit-review", (req, res) => {
  // const review = req.body.review; // Assuming this contains the input text

  // // Command to execute the Python script with input text
  // const command = `python sentiment_analysis.py "${review}"`;

  // // Execute the command
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error("Error:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //     return;
  //   }

  //   if (stderr) {
  //     console.error("Error:", stderr);
  //     res.status(500).json({ error: "Internal server error" });
  //     return;
  //   }

  //   try {
  //     // Parse the JSON result and send it back to the frontend
  //     const data = JSON.parse(stdout);
  //     data["review"] = review;
  //     console.log("Sentiment analysis result:", data); // Debugging output
  //     res.json(data);
  //   } catch (parseError) {
  //     console.error("Error parsing JSON result:", parseError);
  //     res.status(500).json({ error: "Error parsing JSON result" });
  //   }
  // });

  const review = req.body.review;

  // Path to the Python script using the library
  const libraryPythonScriptPath = "sentiment_analysis.py";

  // Path to the Python script using the trained model
  const modelPythonScriptPath = "sentiment_analysis_model.py";

  // Path to the model file
  const modelFilePath = "model.pkl";

  // Command to execute the Python script using the library
  const libraryCommand = `python ${libraryPythonScriptPath} "${review}"`;

  // Command to execute the Python script using the trained model
  const modelCommand = `python ${modelPythonScriptPath} ${modelFilePath} "${review}"`;

  // Execute both Python scripts as child processes
  exec(libraryCommand, (libraryError, libraryStdout, libraryStderr) => {
    if (libraryError) {
      console.error("Error executing library script:", libraryError);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const librarySentiment = libraryStdout.trim(); // Trim any whitespace from the result

    exec(modelCommand, (modelError, modelStdout, modelStderr) => {
      if (modelError) {
        console.error("Error executing model script:", modelError);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const modelSentiment = modelStdout.trim(); // Trim any whitespace from the result
      let stdOut = librarySentiment;
      if (librarySentiment === modelSentiment) {
        stdOut = modelSentiment;
      } else {
        stdOut = librarySentiment;
      }
      // Return the outputs of both scripts to the frontend
      try {
        // Parse the JSON result and send it back to the frontend
        const data = JSON.parse(stdOut);
        data["review"] = review;
        console.log("Sentiment analysis result:", data); // Debugging output
        res.json(data);
      } catch (parseError) {
        console.error("Error parsing JSON result:", parseError);
        res.status(500).json({ error: "Error parsing JSON result" });
      }
      // res.json({
      //   librarySentiment: librarySentiment,
      //   modelSentiment: modelSentiment,
      // });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
