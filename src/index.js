export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Only POST requests allowed", { status: 405 });
    }

    const body = await request.json();
    const urls = body.urls;

    if (!Array.isArray(urls)) {
      return new Response("Invalid request. Must contain 'urls' array.", { status: 400 });
    }

    // ⚠️ Replace with your local IP (from the Print Agent setup)
    const response = await fetch("http://192.168.1.123:4000/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls })
    });

    return new Response("Sent to print agent!", { status: 200 });
  }
};
