import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set.");
}
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  mobile: string;
  message: string;
  service?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, mobile, message, service }: ContactRequest = await req.json();

    console.log("Contact inquiry received:", { name, mobile, message, service });

    // Format email content
    const emailSubject = service 
      ? `New Service Inquiry: ${service}` 
      : "New Contact Inquiry - Maharashtra E-Seva Kendra";
    
    const emailContent = `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>This inquiry was submitted through Maharashtra E-Seva Kendra website.</em></p>
    `;

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Maharashtra E-Seva Kendra <onboarding@resend.dev>",
      to: ["vwadekar753@gmail.com"],
      subject: emailSubject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    // WhatsApp notification has been removed because the previous implementation was incorrect.
    // The URL used (`https://api.whatsapp.com/send`) is for creating a "click to chat" link
    // and does not send a message programmatically from a server.
    //
    // To implement WhatsApp notifications correctly, you need to:
    // 1. Set up a WhatsApp Business Account.
    // 2. Get an access token for the WhatsApp Business API (Meta Graph API).
    // 3. Send a POST request to the correct API endpoint (e.g., `https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages`).
    // 4. The request body must be a valid WhatsApp message template.
    //
    // Example of a correct fetch call:
    /*
    const whatsappResponse = await fetch(`https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_ACCESS_TOKEN`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "RECIPIENT_PHONE_NUMBER",
        type: "template",
        template: {
          name: "your_template_name",
          language: { code: "en_US" },
          components: [ ... ]
        }
      })
    });
    */

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Contact inquiry sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);