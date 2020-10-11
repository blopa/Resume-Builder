# Resume Builder

**Gotta find a job!** Alright, let's make a new resume with this awesome template I found on Google, the problem is, this template might not be as awesome next month, or you might need to constantly add your new experience to the document. Gosh. Wouldn't be better to focus on adding new experiences in a raw format and let a automation process handle the layout? I agreed, and that's why Resume Builder is here.

#### You take care of the data and we take care of the template.

> "Imagine you're an employer, and you have two resumes in front of you. One is filled wall-to-wall with text and uses four different fonts. It's also peppered with dozens of bolded, italicized, and underlined words and phrases.
   The second resume also offers a lot of information, but you can quickly scan the document because it makes good use of white space, features clear and consistent section headings, and uses bullets to make important items stand out.
   Which resume would you look at first?"
- [http://monster.com](https://www.monster.com/career-advice/article/resume-look-important-as-content)

<img src="/screenshots/v2/resume_builder.gif?raw=true" width="890px">

**TESTED ONLY ON GOOGLE CHROME**

## About
[Resume Builder](https://blopa.github.io/Resume-Builder-V2/) is a free open-source project that allows anyone to easily maintain and build any kind of resume using Google Spreadsheets. This was develop as a personal project to help a friend who was struggling spending up to an hour to make a custom resumes. **[TRY IT NOW](https://blopa.github.io/Resume-Builder-V2/).**

For the latest version, access [https://resume-builder.js.org](https://resume-builder.js.org).

For version 1 [check here](https://github.com/blopa/Resume-Builder/blob/main/README_V1.MD).

## Features
- Multiple Resume templates (soon)
- Parse data from Google Spreadsheet URL, .xls file or .json file.
- Support Json format from [jsonresume.org](https://jsonresume.org/schema/).
- Convert Google Spreadsheet data into [jsonresume.org](https://jsonresume.org/schema/) format.

## Usage
First of all you need to create a Google Spreadsheet following the same rules as [this one](https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/copy) (you can make a copy if you like) and populate with your resume information.
- **name:** Your full name
- **label:** Your resume Job Title
- **picture:** A URL for your picture
- **summary:** Summary of yourself
- **website:** Your website URL
- **email:** Your email
- **phone:** Your phone number
- **address:** Your address
- **postalCode:** Your postal code
- **city:** City where you're located
- **region:** Region where you're located
- **countryCode:** Country code where you're located
- **network:** Social media name
- **username:** Social media name

TODO: list all

## Libraries
- I'm using [react.js](https://github.com/facebook/react), [js-xlsx](https://github.com/sheetjs/js-xlsx) and [Material UI](https://material-ui.com/).
- Honorable mentions: [babel](https://github.com/babel/babel), [webpack](https://github.com/webpack/webpack), [IntelliJ IDEA](https://github.com/JetBrains/intellij-community).

So a big thanks to all the developers that worked really hard on these libs and make our day easier :D.

## Deployment
Run `npm run build` then copy the `public/` folder into your website root directory. Done.

## Example
The following ``JSON`` is a result of [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/edit). For a better view of the ``JSON`` [click here](https://codebeautify.org/jsonviewer/cb7c68a1).
```json
{
  "basics": {
    "name": "John Doe",
    "label": "Programmer",
    "picture": "",
    "email": "john@gmail.com",
    "phone": "(912) 555-4321",
    "website": "http://johndoe.com",
    "summary": "A summary of John Doe...",
    "location": {
      "address": "2712 Broadway St",
      "postalCode": "CA 94115",
      "city": "San Francisco",
      "countryCode": "US",
      "region": "California"
    },
    "profiles": [{
      "network": "Twitter",
      "username": "john",
      "url": "http://twitter.com/john"
    }]
  },
  "work": [{
    "company": "Company",
    "position": "President",
    "website": "http://company.com",
    "startDate": "2013-01-01",
    "endDate": "2014-01-01",
    "summary": "Description...",
    "highlights": [
      "Started the company"
    ]
  }],
  "volunteer": [{
    "organization": "Organization",
    "position": "Volunteer",
    "website": "http://organization.com/",
    "startDate": "2012-01-01",
    "endDate": "2013-01-01",
    "summary": "Description...",
    "highlights": [
      "Awarded 'Volunteer of the Month'"
    ]
  }],
  "education": [{
    "institution": "University",
    "area": "Software Development",
    "studyType": "Bachelor",
    "startDate": "2011-01-01",
    "endDate": "2013-01-01",
    "gpa": "4.0",
    "courses": [
      "DB1101 - Basic SQL"
    ]
  }],
  "awards": [{
    "title": "Award",
    "date": "2014-11-01",
    "awarder": "Company",
    "summary": "There is no spoon."
  }],
  "publications": [{
    "name": "Publication",
    "publisher": "Company",
    "releaseDate": "2014-10-01",
    "website": "http://publication.com",
    "summary": "Description..."
  }],
  "skills": [{
    "name": "Web Development",
    "level": "Master",
    "keywords": [
      "HTML",
      "CSS",
      "Javascript"
    ]
  }],
  "languages": [{
    "language": "English",
    "fluency": "Native speaker"
  }],
  "interests": [{
    "name": "Wildlife",
    "keywords": [
      "Ferrets",
      "Unicorns"
    ]
  }],
  "references": [{
    "name": "Jane Doe",
    "reference": "Reference..."
  }]
}
```

## Screenshot
**[Google Spreadsheet example](https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/copy)**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v2/screenshot_1.png)

**Built Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v2/screenshot_2.png)

**Printing Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/screenshots/v2/screenshot_3.png)

## Release Notes
- **v2.0.3:** (not tagged yet)
	- ~~Fix CORS problem when loading a spreadsheet from URL.~~ (still trying to figure this one out)
	- Update packages.
	- Add new ESlint rules.
- **v2.0.2:**
	- Fix printing issue when sidebar is open.
	- Add Google Analytics option.
- **v2.0.1:**
	- Add option to parse spreadsheet from Google Spreadsheet URL.
- **v2.0.0:**
	- Everything rebuild from scratch.

## F.A.Q.
**Q: Can you implement <???> function?**

A: I can try. Open a issue and I'll see what I can do.

**Q: Your project is awesome. How can I help?**

A: Thank you! You can help by codding more features, creating pull requests, or donating via [https://bunq.me/BuyMeASoda](https://bunq.me/BuyMeASoda)

## TODO
- Add list of recent used documents
- Add option to save a built resume
- Add check for valid spreadsheet URL on text input
- Add various missing error handlers
- Add job offers based on uploaded CV? (check for online APIs)

## License
MIT License

Copyright (c) 2019 blopa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Free Software, Hell Yeah!**
