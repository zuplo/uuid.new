export const config = {
  matcher: "/",
};

export default function middleware(request: Request) {
  // Get the accept header from the request
  const acceptHeader = request.headers.get("accept") || "";

  // If accept header includes application/json, return JSON response
  if (acceptHeader.includes("application/json")) {
    return Response.json({ uuid: crypto.randomUUID() });
  }

  // If the accept header does not include text/html, return a plain text response
  if (!acceptHeader.includes("text/html")) {
    return new Response(crypto.randomUUID(), {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
