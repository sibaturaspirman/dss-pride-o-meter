// app/api/submit-result/route.js
export async function POST(req) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/pride-o-meter/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_APP_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
