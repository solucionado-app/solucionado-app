import { type EmailRequestData } from "@/app/api/mail/serviceRequest/route";

const baseUrl = `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}`;

export const sendEmail = async (data: EmailRequestData) => {
            try {
                    const response = await fetch(`${baseUrl}/api/mail/serviceRequest`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const responseData = await response.json();
                    console.log(responseData);
                    return response; // Return null if no error occurred
            } catch (error) {
                    if (error instanceof Error) {
                        console.error('An error occurred while sending the email:', error);
                        return error.message; // Return the error message
                    }

                    // If the error is not an instance of Error, return a generic error message
                    return 'An error occurred while sending the email.'; // Return the error message
     }
};