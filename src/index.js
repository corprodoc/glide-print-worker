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

      // 👉 Update to YOUR actual local IP address!
      const response = await fetch("http://192.168.29.132:4000/print", {
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
