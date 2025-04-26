import AWSVerifyEmail from './emails/my-email.tsx';
import { render } from '@react-email/render';

const html = render(AWSVerifyEmail({ verificationCode: '123456' }), {
    pretty: true,
});

console.log(html);