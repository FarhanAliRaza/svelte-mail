import React from 'react';
import AWSVerifyEmail from './emails/my-email.tsx';
import { render } from '@react-email/render';
import { writeFileSync } from 'fs';

// Self-executing async function to handle the Promise
(async () => {
    const html = await render(<AWSVerifyEmail verificationCode="123456" />, {
        pretty: true,
    });

    console.log(html);

    // Save to a file
    writeFileSync('email-preview.html', html);
    console.log('Email saved to email-preview.html');
})(); 