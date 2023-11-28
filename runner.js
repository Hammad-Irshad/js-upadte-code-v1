// const { exec } = require('child_process');

// // Function to run the scrap.js script
// function runScrapScript() {
//   const scrapProcess = exec('node scrap.js', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing scrap.js: ${error}`);
//       return;
//     }
//     console.log(`Output from scrap.js: ${stdout}`);
//     console.error(`Error from scrap.js: ${stderr}`);
//   });

//   // Log the scrap.js process ID
//   console.log(`scrap.js process ID: ${scrapProcess.pid}`);
// }

// // Run the scrap.js script initially
// runScrapScript();

// // Schedule the script to run every 30 seconds
// const interval = 30 * 1000; // 30 seconds in milliseconds
// setInterval(() => {
//   console.log('Running scrap.js...');
//   runScrapScript();
// }, interval);

///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ display text on browser

// const express = require('express');
// const fs = require('fs').promises;

// const app = express();
// const port = 3000;

// app.get('/', async (req, res) => {
//   try {
//     // Read the contents of temp.txt
//     const data = await fs.readFile('temp.txt', 'utf8');
//     res.send(`<pre>${data}</pre>`);
//   } catch (error) {
//     console.error(`Error reading temp.txt: ${error}`);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   display text on browser


const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Serve static files (if any)

// Endpoint to fetch the contents of temp.txt
app.get('/', async (req, res) => {
  try {
    // Read the contents of temp.txt
    const data = await fs.readFile('link.txt', 'utf8');
    res.send(`<pre>${data}</pre>`);
  } catch (error) {
    console.error(`Error reading temp.txt: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});

// Function to run the scrap.js script and update temp.txt
function runScrapScript() {
  exec('node scrap.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing scrap.js: ${error}`);
      return;
    }

    // Write the output to temp.txt
    fs.writeFile('temp.txt', stdout, (err) => {
      if (err) {
        console.error(`Error writing to temp.txt: ${err}`);
      }
    });

    console.log(`Output from scrap.js: ${stdout}`);
    console.error(`Error from scrap.js: ${stderr}`);
  });
}



function runmailScript() {
  exec('node mail.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing scrap.js: ${error}`);
      return;
    }

    console.log(`Output from scrap.js: ${stdout}`);
    console.error(`Error from scrap.js: ${stderr}`);
  });
}




// Run the scrap.js script initially
runScrapScript();


// Schedule the script to run every 30 seconds
const interval = 2 * 60 * 1000;   // 2 min in milliseconds
const interval2 = 15 * 60 * 1000; // 15 min in milliseconds
setInterval(() => {
  console.log('Running scrap.js...');
  runScrapScript();
}, interval);

setInterval(() => {
  console.log('Running mail.js...');
  runmailScript();
}, interval2);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



