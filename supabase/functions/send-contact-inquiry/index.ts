import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
      to: ["admin@mahesevapoint.in"],
      subject: emailSubject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    // Format WhatsApp message
    const whatsappMessage = `*New Contact Inquiry - Maharashtra E-Seva Kendra*

*Name:* ${name}
*Mobile:* ${mobile}
${service ? `*Service:* ${service}` : ''}
*Message:* ${message}

_Please respond to this inquiry promptly._`;

    // Send WhatsApp notification using WhatsApp Business API
    // You'll need to replace this URL with your actual WhatsApp Business API endpoint
    const whatsappResponse = await fetch(`https://api.whatsapp.com/send?phone=918956548048&text=${encodeURIComponent(whatsappMessage)}`, {
      method: "GET",
    });

    console.log("WhatsApp notification attempted");

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