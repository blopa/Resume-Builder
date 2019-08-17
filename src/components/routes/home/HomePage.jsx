import React from 'react';
import Button from 'components/ui/Button/Button';

export default function HomePage() {
    return (
        <div>
            <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
                React Pages Boilerplate
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button theme="blue">Click me!!</Button>
            </div>
        </div>
    );
}
