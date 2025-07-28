export default {
  async fetch(request, env, ctx) {
    const method = request.method;
    console.log(`📥 Request method: ${method}`);

    if (method === "POST") {
      const body = await request.text();
      console.log("📦 Raw body received:", body);

      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
        return new Response("Invalid JSON", { status: 400 });
      }

      console.log("✅ Parsed JSON:", JSON.stringify(data, null, 2));

      // ✅ Use your public Cloudflare Tunnel URL!
const response = await fetch("https://committees-adopted-andrew-oo.trycloudflare.com/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("🚀 Forwarded to Print Agent");

      return new Response("Sent to print agent", { status: 200 });
    }

    return new Response("Use POST only", { status: 405 });
  },
};
