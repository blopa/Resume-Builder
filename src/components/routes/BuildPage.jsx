import React from 'react';
import Button from '../ui/Button/Button';

export default function BuildPage() {
    return (
        <div>
            <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
                React Pages Boilerplate
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button theme="blue">Click me 2!!</Button>
            </div>
        </div>
    );
}
