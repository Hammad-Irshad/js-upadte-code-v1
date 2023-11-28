const fs = require('fs');
const nodemailer = require('nodemailer');

function sendEmail(links, lines) {
  const linesList = lines.map(line => `<li>${line}</li>`).join('\n');
  const linksList = links.map(link => `<li>${link}</li>`).join('\n');

  const html = `
    <h2>All Links:</h2>
    <ul>
        ${linesList}
    </ul>

    <h2>Interested Links:</h2>
    <ul>
        ${linksList}
    </ul>
  `;

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'hammadirshad305@outlook.com',
      pass: 'tgyfajllloxuuuim',
    },
  });

  const mailOptions = {
    from: 'hammad irshad <hammadirshad305@outlook.com>',
    to: 'hammadirshad23@gmail.com, iqna2018@gmail.com',
    subject: 'Udemy coupon sender node.js',
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email: ${error}`);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
}

function processLinks() {
  // Initialize an empty list to store links
  let links = [];
  // Initialize an empty list to store lines
  let lines = [];
  let temp = [];

  // Define the list of email addresses
  const maillist = ['hammadirshad23@gmail.com', 'iqna2018@gmail.com'];

  // Read the contents of link.txt
  const data = fs.readFileSync('link.txt', 'utf-8');
  lines = [...new Set(data.split('\n'))];

  // Read the contents of temp.txt
  const word = fs.readFileSync('temp.txt', 'utf-8');
  temp = word.split('\n');

  // Iterate through the lines
  for (const line of lines) {
    if (['php', 'python', 'google', 'aws', 'azure', 'scrap', 'bootcamp',
         'js', 'language', 'microsoft', 'learn', 'react', 'gcp', 'project', 'learning',
         'data', 'ielts', 'toefl', 'jquery', 'training','web','html','css'
        ].some(keyword => line.includes(keyword))) {
      links.push(line.trim());
    }
  }

  console.log("Interested Links:", links);

  // If there are links, send an email
  if (word !== data) {
    console.log("Sending email...");
    sendEmail(links, lines);
  }

  // Write the updated content to temp.txt
  fs.writeFileSync('temp.txt', lines.filter(line => line && !line.startsWith('\n')).join('\n'));

  // Clear the content of link.txt
  fs.writeFileSync('link.txt', '');
  

  console.log("Data written to file successfully.");
}

// Run the script
processLinks();
