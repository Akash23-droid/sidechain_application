const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');

app.use(cors());

app.post('/upload', upload.single('resume'), async (req, res) => {
    const { path, originalname } = req.file;
    console.log("path : ", path);
    console.log("originalname : ", originalname);
    let text = '';

    if (originalname.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(path);
        console.log("dataBuffer : ", dataBuffer);
        text = (await pdfParse(dataBuffer)).text;
        console.log("dataBuffer text : ", text);
    } else if (originalname.endsWith('.docx')) {
        const result = await mammoth.extractRawText({ path });
        text = result.value;
    } else {
        return res.status(400).send('Unsupported file format');
    }

    // Extract the skills section
    const skills = extractSkills(text);

    // Clean up the uploaded file
    fs.unlinkSync(path);

    res.json({ skills });
});

function extractSkills(text) {
    const skillsKeyword = /skills|technologies/i;
    const lines = text.split('\n');
    let skillsSection = '';

    for (let i = 0; i < lines.length; i++) {
        if (skillsKeyword.test(lines[i])) {
            for (let j = i + 1; j < lines.length; j++) {
                if (/experience|education|projects|certifications/i.test(lines[j])) {
                    break;
                }
                skillsSection += lines[j] + '\n';
            }
            break;
        }
    }

    // Further processing to clean up and extract specific skills
    const skillsArray = skillsSection.split(/,|\n/).map(skill => skill.trim()).filter(skill => skill);
    return skillsArray;
}

app.listen(3000, () => console.log('Server running on port 3000'));

// Approach 2 : 
// const express = require('express');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth'); // For DOCX files
// const app = express();
// const port = 3000;

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('resume'), async (req, res) => {
//     try {
//         const file = req.file;
//         let text = '';

//         if (file.mimetype === 'application/pdf') {
//             const data = await pdfParse(file);
//             text = data.text;
//         } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//             const result = await mammoth.extractRawText({ path: file.path });
//             text = result.value;
//         } else {
//             return res.status(400).send('Unsupported file type');
//         }

//         // Extract skills from text
//         const skills = extractSkills(text);
//         res.json({ skills });
//     } catch (error) {
//         console.error('Error processing resume:', error);
//         res.status(500).send('Error processing resume');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// function extractSkills(text) {
//     const skillsKeywords = ['skills', 'technologies', 'proficiencies', 'areas of expertise'];
//     const lowerText = text.toLowerCase();
//     const skillsSection = skillsKeywords
//         .map((keyword) => {
//             const index = lowerText.indexOf(keyword);
//             if (index !== -1) {
//                 return lowerText.slice(index);
//             }
//             return '';
//         })
//         .find((section) => section);

//     if (skillsSection) {
//         const lines = skillsSection.split('\n');
//         return lines.slice(1, 10); // Adjust this slice to get the relevant lines
//     }

//     return 'Skills section not found.';
// }

