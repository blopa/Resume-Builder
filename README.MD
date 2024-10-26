# Resume Builder
### [resume-builder.js.org](https://resume-builder.js.org/)

**Gotta find a job!** Creating a resume can be a hassle, especially when constantly updating or modifying templates. **Resume Builder** simplifies this process by allowing you to focus on adding new experiences in a raw format while the automation process handles the layout.

#### You take care of the data; we take care of the template.

> "Imagine you're an employer, and you have two resumes in front of you. One is filled wall-to-wall with text, using four different fonts and various bolded, italicized, and underlined words. The second resume offers the same information but is easily scannable due to good use of white space, clear section headings, and bullet points. Which resume would you prefer?"
- [Monster.com](https://www.monster.com/career-advice/article/resume-look-important-as-content)

<img src="/screenshots/v4/resume_builder.gif?raw=true" width="890px" />

## About
[Resume Builder](https://resume-builder.js.org) is a free, open-source project enabling users to easily maintain and create resumes using Google Spreadsheets. Originally developed to assist a friend with creating custom resumes, it now offers a streamlined solution for everyone. **[TRY IT NOW](https://resume-builder.js.org)**.

Older versions: [V1](https://github.com/blopa/Resume-Builder/blob/main/README_V1.MD), [V2](https://github.com/blopa/Resume-Builder/blob/main/README_V2.MD), [V3](https://github.com/blopa/Resume-Builder/blob/main/README_V3.MD).

## Features
- **Multiple Resume Templates** (coming soon)
- **Data Parsing**: Supports Google Spreadsheet URL, .xls files, or .json files.
- **JSON Resume Schema**: Compatible with [jsonresume/resume-schema](https://github.com/jsonresume/resume-schema/tree/v1.0.0).
- **Google Spreadsheet Conversion**: Converts data into the [jsonresume/resume-schema](https://github.com/jsonresume/resume-schema/tree/v1.0.0) format.
- **Customizable Themes**: Created with [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/).
- **Cover Letter Editor**: Customize and create cover letters.

## JSON Resume Schema
This project extends the [jsonresume/resume-schema](https://github.com/jsonresume/resume-schema) v1.0.0 with additional fields:
- `__translation__`: For translating template keys.
- `coverLetter`: Add custom cover letter templates.
- `work[].keywords`: Include keywords in your work experience.
- `enableSourceDataDownload`: Allow downloading JSON data from the resume.

## Build Your Resume from Scratch
Don't have a JSON file or a spreadsheet? You can create a resume from scratch by filling out fields, then download it as JSON for later use.

<img src="/screenshots/v4/resume_builder_form.gif?raw=true" width="890px" />

## Online Viewer
Create a GitHub repository named `resume.json` with a file called `resume.json` in the `main` branch, adhering to the JSON schema. Your resume will be accessible via `https://resume-builder.js.org/view/TEMPLATE/GITHUB_USER`. For example: [https://resume-builder.js.org/view/default/blopa](https://resume-builder.js.org/view/default/blopa). You can also add `/lang` to the URL for translations, e.g., [https://resume-builder.js.org/view/default/blopa/es](https://resume-builder.js.org/view/default/blopa/es).

## Cover Letter Editor
Edit your cover letter using [mustache.js](https://github.com/janl/mustache.js/) bracket variables. For example, `This is a cover letter for {{company}}` allows you to dynamically replace "company" with another word.

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/edit_variable.png)

<img src="/screenshots/v4/cover_letter_editor.gif?raw=true" width="890px" />

## Available Translations
We currently offer translations for **English**, **Spanish**, and **Brazilian Portuguese**. Customize translations by adding a `__translations__` object to your `resume.json` file.

Example:
```json
{
  "__translation__": {
    "publications": "Projects",
    "education": "Study"
  }
}
```
Or, add them directly to your spreadsheet as columns labeled `__translation__`.

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/translations.png)

Want to add a new language? [Create a Pull Request](https://github.com/blopa/Resume-Builder/issues/18).

## Usage
1. Create a Google Spreadsheet following the format of [this example](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/copy). You can make a copy and populate it with your resume information.
2. **Important**: [Publish your Spreadsheet to the web](https://support.google.com/a/users/answer/9308870) to enable functionality.

### Required Fields
- **name**: Full name
- **label**: Job title
- **picture**: URL for your picture
- **summary**: A brief summary about yourself
- **url**: Website URL
- **email**: Email address
- **phone**: Phone number
- **address**: Address
- **postalCode**: Postal code
- **city**: City
- **region**: Region
- **countryCode**: Country code
- **network**: Social media platform
- **username**: Social media username
- **coverLetter**: Cover letter template
- **__translation__**: Custom translations

## Libraries
- **Frontend**: [Gatsby.js](https://github.com/gatsbyjs/gatsby), [React.js](https://github.com/facebook/react), [Material UI](https://material-ui.com/), [Formik](https://github.com/formium/formik)
- **Data Processing**: [js-xlsx](https://github.com/sheetjs/js-xlsx)
- **Template Customization**: [mustache.js](https://github.com/janl/mustache.js/)
- **Template**: [gatsby-material-ui-blog-starter](https://github.com/blopa/gatsby-material-ui-blog-starter)

Special thanks to all the developers who contributed to these libraries.

## Development
Run `npm run start` and access the site at `http://localhost:8000`.

## Deployment
Run `npm run build` and copy the contents of the `public/` folder to your website's root directory.

## Example
The following JSON was generated from [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/edit). [View JSON](resume.json).

__Tip__: Notice that you can use Markdown in the cover letter, summaries and description fields.

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "coverLetter": "Dear Hiring Manager,\n\nI am excited to apply for the **Software Engineer** position at {{company}}. I believe my experience in _web development_ and {{variable}} makes me a strong candidate. Please visit my [GitHub profile](https://github.com/richard-hendriks) for more details.\n\nSincerely,\n\n**Richard Hendriks**",
  "basics": {
    "name": "Richard Hendriks",
    "label": "Programmer",
    "image": "https://i.pravatar.cc/150?img=8",
    "email": "richard.hendriks@mail.com",
    "phone": "(912) 555-4321",
    "url": "http://richardhendricks.example.com",
    "summary": "Richard hails from Tulsa. He has earned degrees from the **University of Oklahoma** and **Stanford**. _(Go Sooners and Cardinal!)_ Before starting Pied Piper, he worked for **Hooli** as a part-time software developer. His work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants. His non-work interests range widely, from quantum computing to chaos theory. He could tell you about it, but _that_ would _not_ be a **“length-limited”** conversation!",
    "location": {
      "address": "2712 Broadway St",
      "postalCode": "CA 94115",
      "city": "San Francisco",
      "countryCode": "US",
      "region": "California"
    },
    "profiles": [
      {
        "network": "Twitter",
        "username": "neutralthoughts",
        "url": "https://twitter.com/neutralthoughts"
      },
      {
        "network": "SoundCloud",
        "username": "dandymusicnl",
        "url": "https://soundcloud.example.com/dandymusicnl"
      }
    ]
  },
  "work": [
    {
      "name": "Pied Piper",
      "location": "Palo Alto, CA",
      "description": "**Awesome** compression company focusing on innovative solutions.",
      "position": "CEO/President",
      "url": "http://piedpiper.example.com",
      "startDate": "2013-12-01",
      "endDate": "2014-12-01",
      "summary": "**Pied Piper** is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™. The technology is _not merely competitive_, but approaches the **theoretical limit** of lossless compression.",
      "highlights": [
        "Build an algorithm for artist to detect if their music was violating copy right infringement laws",
        "Successfully won Techcrunch Disrupt",
        "Optimized an algorithm that holds the current world record for Weisman Scores"
      ],
      "keywords": [
        "Javascript",
        "React"
      ]
    }
  ],
  "volunteer": [
    {
      "organization": "CoderDojo",
      "position": "Teacher",
      "url": "http://coderdojo.example.com/",
      "startDate": "2012-01-01",
      "endDate": "2013-01-01",
      "summary": "Global movement of free coding clubs for young people, teaching them programming and tech skills.",
      "highlights": [
        "Awarded 'Teacher of the Month'"
      ]
    }
  ],
  "education": [
    {
      "institution": "University of Oklahoma",
      "url": "https://www.ou.edu/",
      "area": "Information Technology",
      "studyType": "Bachelor",
      "startDate": "2011-06-01",
      "endDate": "2014-01-01",
      "score": "4.0",
      "courses": [
        "DB1101 - Basic SQL",
        "CS2011 - Java Introduction"
      ]
    }
  ],
  "awards": [
    {
      "title": "Digital Compression Pioneer Award",
      "date": "2014-11-01",
      "awarder": "Techcrunch",
      "summary": "Recognized for pioneering advancements in digital compression technology. _There is no spoon._"
    }
  ],
  "certificates": [
    {
      "name": "Certified Pied Piper Compressionist",
      "date": "2014-10-01",
      "url": "http://piedpiper.example.com/certificates/compressionist",
      "issuer": "Pied Piper Certification Authority"
    }
  ],
  "publications": [
    {
      "name": "Video compression for 3d media",
      "publisher": "Hooli",
      "releaseDate": "2014-10-01",
      "url": "http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)",
      "summary": "Innovative middle-out compression algorithm that changes the way we store data. Learn more [here](http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series))."
    },
    {
      "name": "Video compression for 3d media part 2",
      "publisher": "Hooli",
      "releaseDate": "2015-10-01",
      "url": "http://hooli.com",
      "summary": "Innovative middle-out compression algorithm that changes the way we store data. _Again!_"
    }
  ],
  "skills": [
    {
      "name": "Web Development",
      "level": "Master",
      "keywords": [
        "HTML",
        "CSS",
        "Javascript"
      ]
    },
    {
      "name": "Compression",
      "level": "Master",
      "keywords": [
        "Mpeg",
        "MP4",
        "GIF"
      ]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native speaker"
    }
  ],
  "interests": [
    {
      "name": "Wildlife",
      "keywords": [
        "Ferrets",
        "Unicorns"
      ]
    }
  ],
  "references": [
    {
      "name": "Erlich Bachman",
      "reference": "It is my pleasure to recommend **Richard**. His performance as a consultant for _Main St. Company_ proved that he will be a valuable addition to any company."
    }
  ],
  "projects": [
    {
      "name": "Miss Direction",
      "description": "A mapping engine that misguides you intentionally. [Visit the project](http://missdirection.example.com).",
      "highlights": [
        "Won award at AIHacks 2016",
        "Built by all women team of newbie programmers",
        "Using modern technologies such as GoogleMaps, Chrome Extension and Javascript"
      ],
      "keywords": [
        "GoogleMaps",
        "Chrome Extension",
        "Javascript"
      ],
      "startDate": "2016-08-24",
      "endDate": "2016-08-24",
      "url": "http://missdirection.example.com",
      "roles": [
        "Team lead",
        "Designer"
      ],
      "entity": "Smoogle",
      "type": "application"
    }
  ],
  "meta": {
    "canonical": "https://raw.githubusercontent.com/jsonresume/resume-schema/81d9e75a3d7b599e202e7c3e31c55e634c7f1e39/sample.resume.json",
    "version": "v1.0.0",
    "lastModified": "2017-12-24T15:53:00"
  },
  "__translation__": {
    "awards": "Prizes",
    "volunteers": "Volunteers",
    "skills": "Skills",
    "references": "References",
    "publications": "Publications",
    "languages": "Languages",
    "interests": "Interests",
    "education": "Education",
    "summary": "Summary",
    "experience": "Experience",
    "at": "at"
  },
  "enableSourceDataDownload": true
}

```

## Screenshots
**[Google Spreadsheet example](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/copy)**

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_1.png)

**Built Resume**

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_2.png)

**Printing Resume**

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_3.png)

## Release Notes
- **v4.2.0:**
	- Bump NPM package versions.
	- Fix issue when parsing LLM prompt.
	- Add French, German, Japanese, and Russian translations ([thanks](https://github.com/blopa/Resume-Builder/pull/50) and [thanks](https://github.com/blopa/Resume-Builder/pull/86)).
- **v4.1.0:**
	- Bump NPM package versions.
	- Fix issue [#74](https://github.com/blopa/Resume-Builder/issues/74).
	- Add option to use markdown in the cover letter, summaries, and descriptions.
	- Add option to add LLM easter-egg to the resume.
	- Add description to fields in the builder form.
- **v4.0.12:**
	- Bump NPM package versions.
	- Fix "0" showing up in the Cover Letter component.
	- Update Babel and ESLint configuration.
- **v4.0.11:**
	- Bump NPM package versions.
- **v4.0.10:**
	- Replace `gatsby-plugin-intl` with `gatsby-plugin-react-intl`.
- **v4.0.9:**
	- Bump NPM package versions.
- **v4.0.8:**
	- Add cover letter field to the resume builder forms.
	- Add parameter to the build page for direct form access.
- **v4.0.7:**
	- Fix builder page translations.
	- Add more Spanish translations (Thanks Leandro).
- **v4.0.6:**
	- Create form to generate a JSON resume from scratch.
	- Add theme switcher in the sidebar.
- **v4.0.5:**
	- Fix `profiles` parsing from the Spreadsheet.
	- Fix parsing Google Spreadsheet (ensure it's published to the web).
- **v4.0.4:**
	- *Error 404: Release not found*
	- Sorry, I had to make this joke...
- **v4.0.3:**
	- Add toggler for `keywords` and `highlights` in the sidebar.
	- Bump Gatsby and plugins to 3.5.
	- Major refactor on the global state.
	- Data disabled from the spreadsheet can now be enabled via the sidebar.
	- Downloaded `JSON` resume will contain only enabled data.
- **v4.0.2:**
	- Filter out incomplete resume templates.
	- Add download link for JSON data.
	- Fix resume viewer.
	- Add missing fields in `work` and `projects`.
	- Minor layout fixes in the "Default" template.
	- Parse arrays from the spreadsheet using `';'` instead of `','`.
- **v4.0.1:**
	- Add visual cue for cover letter variables.
- **v4.0.0:**
	- Fix page break between title and items using a dirty hack (but hey, it works).
	- Add cover letter editor.
	- Update JSON Schema to v1.0.0.
	- Update Gatsby to v3.

[Complete Release Notes here](https://github.com/blopa/Resume-Builder/blob/main/release-notes.md)

## Thanks to
- SEO resume photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/resume?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText).

## F.A.Q.
**Q: Can you implement <???> function?**

A: We can try. Open an issue, and we'll see what we can do.

**Q: Your project is awesome. How can I help?**

A: Thank you! You can contribute by coding new features, creating pull requests, or donating via [https://bunq.me/BuyMeASoda](https://bunq.me/BuyMeASoda).

## TODO
- Fix all TODOs in the code.
- Add PropTypes to the components (or even better, migrate to Typescript).
- Document how to create new templates.
- Add a form to manually input resume data.
- Support Redux Tools extension.
- Use [jsPDF](https://github.com/MrRio/jsPDF).
- Load a JSON resume from any URL.
- Create a second template.
- Add unit tests and E2E tests.
- List recently used documents.
- Enable saving a built resume.
- Validate spreadsheet URL input.
- Add missing error handlers.
- Integrate job offers based on uploaded CV (explore online APIs).

## License
MIT License

Copyright (c) 2024 blopa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Free Software, Hell Yeah!**
