import "@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    const prompt = `
    You are an AI Financial Advisor.

    Analyze this monthly financial report.

    Income: ₹${body.income}
    Expenses: ₹${body.expenses}
    Savings: ₹${body.savings}
    Savings Rate: ${body.savingsRate}%
    Financial Score: ${body.financialScore}/100
    Top Expense Category: ${body.topCategory}
    Expense Change: ${body.expenseChange}%
    Best Mover: ${body.bestMover?.category}

    Respond ONLY in JSON.

    {
      "summary": "",
      "recommendations": [
        "",
        "",
        ""
      ]
    }
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        }),
      }
    );

    const data = await response.json();

    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return Response.json(
      {
        success: true,
        ai: JSON.parse(aiText),
      },
      {
        headers: corsHeaders,
      }
    );


  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});