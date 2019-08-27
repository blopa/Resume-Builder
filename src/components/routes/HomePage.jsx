import React from 'react';

export default function HomePage() {
    return (
        <section style={{ backgroundColor: '#ffffff', margin: '0 auto', maxWidth: '600px' }}>
            <h2>What is Resume Builder?</h2>
            <p>
                Resume Builder is a free open-source project that allows anyone to
                easily maintain and build any kind of resume using Google Spreadsheets or{' '}
                <a
                    href="https://jsonresume.org/schema/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    jsonresume.org
                </a>.
            </p>
            <h2>How?</h2>
            <p>
                Make a copy of{' '}
                <a
                    href="https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/copy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    this Google Spreadsheet
                </a>{' '}
                or use your JSON file from{' '}
                <a
                    href="https://jsonresume.org/schema/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    jsonresume.org
                </a>{' '}
                and{' '}
                <a
                    href="#/upload"
                >
                    upload it here
                </a>.
            </p>
            <h2>Why?</h2>
            <p>
                You know you have the skills for that job you're applying to,
                and to show that you should tail your resume to match that opening.
            </p>
            <p>
                For this job, it doesn't matter that you were a Space Police for 5 years,
                all they care about is if you can be a Professional Dog Carer.
            </p>
            <p>
                So you open your text editor and start erasing stuff you don't need for
                this job opening. Cool.
            </p>
            <p>
                But then you got rejected, and a new opening show up, but this time they
                do care if you were a Space Police. What now? Did you save the new resume as
                "resume-final-2.pdf"? Do you still have the old version? OMG what a pain!
            </p>
            <h2>Resume Builder for the rescue!</h2>
            <p>
                With Resume Builder you can have Spreadsheet or JSON file with all your
                skills and experiences, and simply toggle on/off the ones you want out
                via the Resume Builder UI and save your new awesome tailed resume as PDF.
            </p>
        </section>
    );
}
