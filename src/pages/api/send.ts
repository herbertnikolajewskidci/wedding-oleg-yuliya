import { EmailTemplate } from "@/components/mail-template.tsx";
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    const reqData = await request.json();
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: import.meta.env.EMAIL_SENDER,
        subject: "Hochzeit Zusage",
        react: EmailTemplate({ ...reqData }),
    } as any);

    if (error) {
        return new Response(
            JSON.stringify({
                message: error,
            }),
            { status: 400 }
        );
    }

    return new Response(
        JSON.stringify({
            message: data,
        }),
        { status: 200 }
    );
};
