import { Html, Head, Font, Preview, Heading, Row, Section, Text} from "@react-email/components";

interface VerificationProps{
    username: string;
    otp:string
}

export default function VerificationEmail({username,otp}:VerificationProps){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification code</title>
                <Font fontFamily="Roboto" fallbackFontFamily="Verdana" webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.woff2",
                    format: "woff2"
                }} fontWeight={400} fontStyle="normal" />
            </Head> 
            <Preview>Here&pos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following code to verify your account:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>If you did not sign up, please ignore this email.</Text>
                </Row>
            </Section>
        </Html>
    )
}