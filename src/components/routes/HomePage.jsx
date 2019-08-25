import React from 'react';

export default function HomePage() {
    return (
        <section style={{ backgroundColor: '#ffffff', margin: '0 15px' }}>
            <h2>What is Resume Builder?</h2>
            <p>
                Resume Builder is a free open-source project that allows anyone to easily maintain and build any kind of
                resume using Google Spreadsheets. This was develop as a personal project to help a friend who was
                struggling spending up to an hour to make a single customization on their resumes.
            </p>
            <p>
                Make a copy of{' '}
                <a
                    href="https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/copy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    this Google Spreadsheet
                </a>{' '}
                of use your Json file from{' '}
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
        </section>
    );
}
