# Resume Builder

**Gotta find a job!** Alright, let's make a new resume with this awesome template I found on Google, the problem is, this template might not be as awesome next month, or you might need to constantly add your new experience to the document. Gosh. Wouldn't be better to focus on adding new experiences in a raw format and let a automation process handle the layout? I agreed, and that's why Resume Builder is here.

#### You take care of the data and we take care of the template.

> "Imagine you're an employer, and you have two resumes in front of you. One is filled wall-to-wall with text and uses four different fonts. It's also peppered with dozens of bolded, italicized, and underlined words and phrases.
   The second resume also offers a lot of information, but you can quickly scan the document because it makes good use of white space, features clear and consistent section headings, and uses bullets to make important items stand out.
   Which resume would you look at first?"
- [http://monster.com](https://www.monster.com/career-advice/article/resume-look-important-as-content)

<img src="/screenshots/v1/resume_builder.gif?raw=true" width="890px">

**TESTED ONLY ON GOOGLE CHROME**

## About
[Resume Builder](https://blopa.github.io/Resume-Builder-V1/) is a free open-source project that allows anyone to easily maintain and build any kind of resume using Google Spreadsheets. This was develop as a personal project to help a friend who was struggling spending up to an hour to make a custom resumes. **[TRY IT NOW](https://blopa.github.io/Resume-Builder-V1/).**

For the latest version, access [https://resume-builder.js.org](https://resume-builder.js.org).

## Features
- Multiple Resume templates
- Parse data from Google Spreadsheet or .xls file
- 21 different types of "data"

## Usage
First of all you need to create a Google Spreadsheet following the same rules as [this one](https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/copy) (you can make a copy if you like) and populate with your resume information.
- **Full Name:** Your full name
- **Job Title:** Your resume Job Title
- **Summary:** Summary of yourself
- **Website:** Your website URL
- **Languages:** Languages you speak
- **Email:** Your email
- **Phone:** Your phone number
- **Github:** Your Github profile link
- **City:** City where you're located
- **Country:** Country where you're located
- **Skills:** Your skills
- **Experience:** Job Title for your experience
    - **Company:** Company where you had this experience (must fill the ``data-for`` with the Experience ID)
    - **From:** Date of when you started the experience (must fill the ``data-for`` with the Experience ID)
    - **To:** Date of when you ended the experience (must fill the ``data-for`` with the Experience ID)
    - **Local:** Where you had this experience (must fill the ``data-for`` with the Experience ID)
    - **Item:** List here things you've done (must fill the ``data-for`` with the Experience ID)
- **Education:** Name of the course you've studied
    - **From:** Date of when you started the education (must fill the ``data-for`` with the Education ID)
    - **To:** Date of when you ended the education (must fill the ``data-for`` with the Education ID)
    - **Local:** Where did you studied (must fill the ``data-for`` with the Education ID)
    - **Item:** List here things you've done (must fill the ``data-for`` with the Education ID)
- **Side Project:** Name of your Side Project
    - **Description:** Description of your Side Project (must fill the ``data-for`` with the Side Project ID)
    - **Url:** URL of your Side Project (must fill the ``data-for`` with the Side Project ID)

So whenever you want a part of the resume to be an sub-item of another item, you should use the ``data-for`` field. Use your creativity.

## Libraries
- For the [react.js version](https://blopa.github.io/Resume-Builder-V1/) of this project I'm using [react.js](https://github.com/facebook/react), [js-xlsx](https://github.com/sheetjs/js-xlsx) and [Bootstrap](https://github.com/twbs/bootstrap).
- Honorable mentions: [babel](https://github.com/babel/babel), [webpack](https://github.com/webpack/webpack), [IntelliJ IDEA](https://github.com/JetBrains/intellij-community) and [Squarespace](https://logo.squarespace.com).

So a big thanks to all the developers that worked really hard on these libs and make our day easier :D and also a big thanks to [cdnjs.com](https://cdnjs.com/) for hosting those libs for us.

## Deployment
Run `npm run build` then copy the `dist/` folder into your website root directory. Done.

## Example
The following ``JSON`` is a result of [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/edit). For a better view of the ``JSON`` [click here](https://codebeautify.org/jsonviewer/cb1489cb).
```json
{
 "fullName": {
  "display": true,
  "content": "Your Full Name"
 },
 "jobTitle": {
  "display": true,
  "content": "Full stack developer"
 },
 "website": {
  "display": true,
  "content": "personalwebsite.com"
 },
 "github": {
  "display": true,
  "content": "github.com/yourgithub"
 },
 "email": {
  "display": true,
  "content": "yourprimaryemail@whatever.com"
 },
 "phone": {
  "display": true,
  "content": "+1 604 604 4444"
 },
 "city": {
  "display": true,
  "content": "City"
 },
 "country": {
  "display": true,
  "content": "Country"
 },
 "skills": {
  "display": true,
  "content": "React, Redux, ES6, Express, MongoDB, Sass, Webpack, Gulp, Git"
 },
 "languages": {
  "display": true,
  "content": "English, French"
 },
 "experience": {
  "display": true,
  "content": [
   {
    "id": "job-1",
    "jobTitle": {
     "display": false,
     "content": "Software Developer"
    },
    "company": {
     "display": true,
     "content": "Telesoft "
    },
    "display": false,
    "from": {
     "display": true,
     "content": "Feb/2015"
    },
    "to": {
     "display": true,
     "content": "Present"
    },
    "local": {
     "display": true,
     "content": "Seattle, WA"
    },
    "items": {
     "display": true,
     "content": [
      {
       "display": true,
       "content": "Led the development and adoption of React for a dashboard web app."
      },
      {
       "display": true,
       "content": "Full stack development using Node.js, Express, React, and MongoDB."
      }
     ]
    }
   },
   {
    "id": "job-2",
    "jobTitle": {
     "display": true,
     "content": "Web Developer"
    },
    "company": {
     "display": true,
     "content": "Plasmid Inc"
    },
    "display": true,
    "from": {
     "display": true,
     "content": "Nov/2013"
    },
    "to": {
     "display": true,
     "content": "Jan/2015"
    },
    "local": {
     "display": true,
     "content": "Denver, CO"
    },
    "items": {
     "display": true,
     "content": [
      {
       "display": true,
       "content": "Part of the front end development team of their AngularJS web app."
      },
      {
       "display": true,
       "content": "Developed & maintained a reusable components repository."
      }
     ]
    }
   }
  ]
 },
 "sideProject": {
  "display": true,
  "content": [
   {
    "id": "side-1",
    "projectName": {
     "display": true,
     "content": "Speakasso"
    },
    "url": {
     "display": true,
     "content": "http://www.csc.kth.se/~acvds/info_vis/speakasso/"
    },
    "display": true,
    "description": {
     "display": true,
     "content": "web-based generative art based on speech or conversation."
    }
   },
   {
    "id": "side-2",
    "projectName": {
     "display": true,
     "content": "Bubbles.js"
    },
    "url": {
     "display": true,
     "content": "https://github.com/krasimir/bubble.js"
    },
    "display": true,
    "description": {
     "display": true,
     "content": "open source generator of PNG images of bubbles."
    }
   }
  ]
 },
 "education": {
  "display": true,
  "content": [
   {
    "id": "edu-1",
    "degree": {
     "display": true,
     "content": "B.Sc. in Computer Science"
    },
    "local": {
     "display": true,
     "content": "University of Iowa"
    },
    "display": true,
    "from": {
     "display": true,
     "content": "2007"
    },
    "to": {
     "display": true,
     "content": "2012"
    },
    "items": {
     "display": true,
     "content": [
      {
       "display": true,
       "content": "Conducted a project on comparative analysis of 10 predictive data-mining techniques and authored 2 papers on the topic."
      }
     ]
    }
   }
  ]
 }
}
```

## Screenshot
**[Google Spreadsheet example](https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/copy)**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/v1/screenshots/screenshot_1.png)

**Built Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/v1/screenshots/screenshot_2.png)

**Printing Resume**
![ScreenShot](https://raw.githubusercontent.com/blopa/Resume-Builder/main/v1/screenshots/screenshot_3.png)

## Release Notes
- **v0.0.4:**
	- New resume display style
- **v0.0.3:**
	- Cleaning code to fit ESLint standards
	- Get JSON object from URL to parse a Resume
	- Replace CSS for SASS
- **v0.0.2:**
	- Tiny changes on template layout
- **v0.0.1:**
	- First working version

## F.A.Q.
**Q: Can you implement <???> function?**

A: I can try. Open a issue and I'll see what I can do.

**Q: Your project is awesome. How can I help?**

A: Thank you! You can help by codding more features, creating pull requests, or donating via [https://bunq.me/BuyMeASoda](https://bunq.me/BuyMeASoda)

## TODO
- Add list of recent used documents
- Add option to save a built resume
- Remove bootstrap include from template.html
- Make build.js smaller / add lazyloader

## License
MIT License

Copyright (c) 2018 blopa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Free Software, Hell Yeah!**
