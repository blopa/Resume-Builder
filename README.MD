# Resume Builder
### [resume-builder.js.org](https://resume-builder.js.org/)

**Gotta find a job!** Alright, let's make a new resume with this awesome template I found on Google, the problem is, this template might not be as awesome next month, or you might need to constantly add your new experience to the document. Gosh. Wouldn't be better to focus on adding new experiences in a raw format and let a automation process handle the layout? I agreed, and that's why Resume Builder is here.

#### You take care of the data, and we take care of the template.

> "Imagine you're an employer, and you have two resumes in front of you. One is filled wall-to-wall with text and uses four different fonts. It's also peppered with dozens of bolded, italicized, and underlined words and phrases.
   The second resume also offers a lot of information, but you can quickly scan the document because it makes good use of white space, features clear and consistent section headings, and uses bullets to make important items stand out.
   Which resume would you look at first?"
- [http://monster.com](https://www.monster.com/career-advice/article/resume-look-important-as-content)

<img src="/screenshots/v4/resume_builder.gif?raw=true" width="890px" />

## About
[Resume Builder](https://resume-builder.js.org) is a free open-source project that allows anyone to easily maintain and build any kind of resume using Google Spreadsheets. This was develop as a personal project to help a friend who was struggling spending up to an hour to make a custom resumes. **[TRY IT NOW](https://resume-builder.js.org).**

Older versions: [V1](https://github.com/blopa/Resume-Builder/blob/main/README_V1.MD), [V2](https://github.com/blopa/Resume-Builder/blob/main/README_V2.MD) and [V3](https://github.com/blopa/Resume-Builder/blob/main/README_V3.MD).

## Features
- Multiple Resume templates (soon)
- Parse data from Google Spreadsheet URL, .xls file or .json file.
- Support Json format from [github.com/jsonresume/resume-schema](https://github.com/jsonresume/resume-schema/tree/v1.0.0).
- Convert Google Spreadsheet data into [github.com/jsonresume/resume-schema](https://github.com/jsonresume/resume-schema/tree/v1.0.0) format.
- Theme created with [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/), so it's easy for you to customize.
- Cover Letter Editor

## JSON Resume Schema
This project uses the [jsonresume/resume-schema](https://github.com/jsonresume/resume-schema) v1.0.0, but due to a need to extend some of it's features, we also added 4 new fields:
- `__translation__` to translate template keys.
- `coverLetter` to add your own Cover Letter template.
- `work[].keywords` to add keywords to your work experience.
- `enableSourceDataDownload` to allow the JSON data to be downloaded from the resume itself.

## Build your resume from scratch
Don't have a JSON or don't fill like filling up a spreadsheet? No problem! You can make your resume from scratch by filling up some fields, and then you can download it as a JSON to use it later with this app [or others](https://github.com/search?q=json-resume).

<img src="/screenshots/v4/resume_builder_form.gif?raw=true" width="890px" />

## Online viewer
Create a GitHub repo [like this one](https://github.com/blopa/resume.json) with the name `resume.json` and a file called `resume.json` in a branch called `main` and following the JSON schema from [github.com/jsonresume/resume-schema](https://github.com/jsonresume/resume-schema/tree/v1.0.0) v1.0.0.

Then you can access your resume via https://resume-builder.js.org/view/TEMPLATE/GITHUB_USER, for example this URL: [https://resume-builder.js.org/view/default/blopa](https://resume-builder.js.org/view/default/blopa). You can also append `/lang` to the end of the URL to add a proper translation to your resume, for example [https://resume-builder.js.org/view/default/blopa/es](https://resume-builder.js.org/view/default/blopa/es).

## Cover Letter Editor
Now you can edit your own Cover Letter by using [mustache.js](https://github.com/janl/mustache.js/) bracket variables, for example:

With the text `This is a cover letter for {{company}}`, you will be able to edit the word `company` dynamically by typing another word in the variable input in the sidebar:

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/edit_variable.png)

Check the gif below for more details

<img src="/screenshots/v4/cover_letter_editor.gif?raw=true" width="890px" />

## Available Translations
We currently have translations for **English**, **Spanish** and **Brazilian Portuguese**, those are going to be used to translate sections of your resume, like the title "Publications", etc.

Don't like the way a translation key is translated? For example, you might prefer using "Projects" instead of "Publications".

Simply add a custom `__translations__` object to your `resume.json` file with the keys you would like to translate and their new translation, for example:

```json
{
  "__translation__": {
    "publications": "Projects",
    "education": "Study"
  }
}
```

You can also add it to your spreadsheet by creating columns with the value `__translation__`, like:

![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/translations.png)

Would you like to have your language added to Resume Builder? [Create a Pull Request](https://github.com/blopa/Resume-Builder/issues/18).

## Usage
First of all you need to create a Google Spreadsheet following the same rules as [this one](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/copy) (you can make a copy if you like) and populate with your resume information.
- **name:** Your full name
- **label:** Your resume Job Title
- **picture:** A URL for your picture
- **summary:** Summary of yourself
- **url:** Your website URL
- **email:** Your email
- **phone:** Your phone number
- **address:** Your address
- **postalCode:** Your postal code
- **city:** City where you're located
- **region:** Region where you're located
- **countryCode:** Country code where you're located
- **network:** Social media name
- **username:** Social media username
- **coverLetter:** Your cover letter template
- **__translation__:** Add your custom translations

###**Please make sure to [publish your Spreadsheet to the web](https://support.google.com/a/users/answer/9308870)**, otherwise it won't work.

## Libraries
- I'm using [gatsby.js](https://github.com/gatsbyjs/gatsby), [react.js](https://github.com/facebook/react), [js-xlsx](https://github.com/sheetjs/js-xlsx), [Material UI](https://material-ui.com/), [mustache.js](https://github.com/janl/mustache.js/) and [formik](https://github.com/formium/formik).
- Gatsby template from [gatsby-material-ui-blog-starter](https://github.com/blopa/gatsby-material-ui-blog-starter)
- Honorable mentions: [babel](https://github.com/babel/babel), [webpack](https://github.com/webpack/webpack), [IntelliJ IDEA](https://github.com/JetBrains/intellij-community), [and many others](https://github.com/blopa/Resume-Builder/blob/main/package.json#L22).

So a big thanks to all the developers that worked really hard on these libs and make our day easier :D.

## Development
Run `npm run start` and access the website on `http://localhost:8000`

## Deployment
Run `npm run build` then copy the `public/` folder into your website root directory. Done.

## Example
The following `JSON` is a result of [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/edit). For a better view of the `JSON` [click here](resume.json).
```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "coverLetter": "Some text with {{some}} custom {{variable}}, cool {{cool}} and now a {{superDuperBigVariable}}",
  "basics": {
    "name": "Richard Hendriks",
    "label": "Programmer",
    "image": "https://i.pravatar.cc/150?img=8",
    "email": "richard.hendriks@mail.com",
    "phone": "(912) 555-4321",
    "url": "http://richardhendricks.example.com",
    "summary": "Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford. (Go Sooners and Cardinal!) Before starting Pied Piper, he worked for Hooli as a part time software developer. While his work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants, his non-work interests range widely, everything from quantum computing to chaos theory. He could tell you about it, but THAT would NOT be a “length-limited” conversation!",
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
        "url": ""
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
      "description": "Awesome compression company",
      "position": "CEO/President",
      "url": "http://piedpiper.example.com",
      "startDate": "2013-12-01",
      "endDate": "2014-12-01",
      "summary": "Pied Piper is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™ that are not merely competitive, but approach the theoretical limit of lossless compression.",
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
      "summary": "Global movement of free coding clubs for young people.",
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
      "summary": "There is no spoon."
    }
  ],
  "publications": [
    {
      "name": "Video compression for 3d media",
      "publisher": "Hooli",
      "releaseDate": "2014-10-01",
      "url": "http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)",
      "summary": "Innovative middle-out compression algorithm that changes the way we store data."
    },
    {
      "name": "Video compression for 3d media part 2",
      "publisher": "Hooli",
      "releaseDate": "2015-10-01",
      "url": "http://hooli.com",
      "summary": "Innovative middle-out compression algorithm that changes the way we store data. Again!"
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
      "reference": "It is my pleasure to recommend Richard, his performance working as a consultant for Main St. Company proved that he will be a valuable addition to any company."
    }
  ],
  "projects": [
    {
      "name": "Miss Direction",
      "description": "A mapping engine that misguides you",
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
      "url": "missdirection.example.com",
      "roles": [
        "Team lead",
        "Designer"
      ],
      "entity": "Smoogle",
      "type": "application"
    }
  ],
  "__translation__": {
    "awards": "Prizes",
    "volunteers": "Volunteers",
    "skills": "Skills",
    "references": "References",
    "publications": "Publications",
    "languages": "Languages",
    "interests": "Interests",
    "education": "Study",
    "summary": "Summary",
    "experience": "Experience",
    "at": "at"
  },
  "enableSourceDataDownload": true
}
```

## Screenshot
**[Google Spreadsheet example](https://docs.google.com/spreadsheets/d/1jRMEvfI6OsWUwnaHgH5UwnoikZA0a3s8wPnCortNJ_A/copy)**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_1.png)

**Built Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_2.png)

**Printing Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v4/screenshot_3.png)

## Release Notes
- **v4.0.8:**
	- Add cover letter field to the resume builder forms.
	- Add param to the build page to go directly to a specific form.
- **v4.0.7:**
	- Fix builder page translations.
	- Add more Spanish translations (Thanks Leandro).
- **v4.0.6:**
	- Create form to create a JSON resume from scratch
	- Add theme switcher in the sidebar
- **v4.0.5:**
	- Fix `profiles` not being parsed correctly from the Spreadsheet
	- Fix parsing Google Spreadsheet (but you need to publish it to the web to work)
- **v4.0.4:**
	- *Error 404: Release not found*
	- Sorry I had to make this joke...
- **v4.0.3:**
	- Add toggler for `keywords` and `highlights` on the sidebar.
	- Bump Gatsby and plugins to 3.5.
	- Big refactor on the global state.
	- Data disabled from the spreadsheet can now be enabled via the sidebar.
	- Downloaded `JSON` resume will only contain enabled data.
- **v4.0.2:**
	- Filter out resume templates that are not ready yet.
	- Add download link to download the JSON data.
	- Fix resume viewer.
	- Add missing fields on `work` and `projects`.
	- Small layout fixes in the "Default" template.
	- Arrays from the spreadsheet are now parsed using `';'` instead of `','`.
- **v4.0.1:**
	- Add visual cue to the cover letter variables.
- **v4.0.0:**
	- Fix page break between title and items using a dirty hack (but hey it works).
	- Add cover letter editor.
	- Update JSON Schema to v1.0.0.
	- Update Gatsby to v3.

[Complete Release Notes here](https://github.com/blopa/Resume-Builder/blob/main/release-notes.md)

## Thanks to
 - SEO resume photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/resume?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText).

## F.A.Q.
**Q: Can you implement <???> function?**

A: I can try. Open an issue, and I'll see what I can do.

**Q: Your project is awesome. How can I help?**

A: Thank you! You can help by codding more features, creating pull requests, or donating via [https://bunq.me/BuyMeASoda](https://bunq.me/BuyMeASoda)

## TODO
- Fix all TODOs in the code
- Add proptypes to the components
- Add documentation on how to create new templates
- Add form to manually add resume data
- Add support for Redux Tools extension
- Use https://github.com/MrRio/jsPDF
- Load a JSON resume from any URL
- Actually create a second template
- Add unit tests
- Add list of recent used documents
- Add option to save a built resume
- Add check for valid spreadsheet URL on text input
- Add various missing error handlers
- Add job offers based on uploaded CV? (check for online APIs)

## License
MIT License

Copyright (c) 2021 blopa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Free Software, Hell Yeah!**
