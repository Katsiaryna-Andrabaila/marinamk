import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
    Text,
} from '@react-email/components';
import { getSlotDate } from 'shared/utils/getSlotDate';

type EmailMessageProps = {
    name: string;
    date: Date;
};

export const EmailMessage = ({ name, date }: EmailMessageProps) => {
    const previewText = `Remember your appointment, 🚀${name}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="my-[20px] mx-auto p-[20px] max-w-4xl">
                        <Heading className="text-black text-[20px] font-normal text-left">
                            <strong>Hello, {name}!</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            {`Your appointment to MarinaMK is for ${`${new Date(
                                date
                            ).getHours()}:${new Date(date)
                                .getMinutes()
                                .toString()
                                .padStart(2, '0')}`} ${getSlotDate(date)}`}
                        </Text>

                        <Hr className="my-[16px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px]">
                            This email is delivered to you through the Resend
                            SDK integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
