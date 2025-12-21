import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";

// Allowed origins - add your production domain here
const ALLOWED_ORIGINS = [
  SUPABASE_URL.replace('//', '//').replace('supabase.co', 'lovable.app'), // Lovable preview
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Alternative local dev port
];

// Rate limiting
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is allowed, default to first allowed origin if not
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.includes(allowed.replace(/^https?:\/\//, '')))
    ? origin 
    : ALLOWED_ORIGINS[0] || '*';
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const recentRequests = (rateLimit.get(ip) || []).filter(
    time => now - time < RATE_LIMIT_WINDOW
  );
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}

interface ReferralNotificationRequest {
  referrerName: string;
  referrerEmail: string;
  referralName: string;
  referralEmail: string;
  referralPhone: string;
  referralLinkedin?: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Parcelis <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting based on IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("cf-connecting-ip") || 
             "unknown";
  
  if (!checkRateLimit(ip)) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const data: ReferralNotificationRequest = await req.json();
    console.log("Received referral notification request:", { 
      referrerName: data.referrerName, 
      referralName: data.referralName,
      ip 
    });

    // Send confirmation email to referrer
    const referrerEmailResponse = await sendEmail(
      [data.referrerEmail],
      "Thank you for your referral!",
      `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${data.referrerName}! 🎉</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="font-size: 16px; margin-bottom: 20px;">Your referral has been submitted successfully!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #667eea;">Referral Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${data.referralName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${data.referralEmail}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.referralPhone}</p>
              ${data.referralLinkedin ? `<p style="margin: 5px 0;"><strong>LinkedIn:</strong> ${data.referralLinkedin}</p>` : ''}
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 14px;"><strong>💰 Reminder:</strong> You'll earn $50 once your referral receives their first payout!</p>
            </div>
            
            <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">We'll reach out to ${data.referralName} shortly and keep you updated on the progress.</p>
            
            <p style="margin-top: 25px;">Best regards,<br><strong>The Parcelis Team</strong></p>
          </div>
        </body>
        </html>
      `
    );

    console.log("Referrer email sent:", referrerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        referrerEmail: referrerEmailResponse
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-referral-notification function:", error);
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
