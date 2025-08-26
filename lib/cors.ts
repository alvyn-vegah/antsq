import { NextRequest, NextResponse } from 'next/server';

export function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': 'https://www.antsq.com',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, DNT, User-Agent, If-Modified-Since, Range',
        'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
    };
}

export function handleCORS(request: NextRequest) {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: corsHeaders(),
        });
    }

    return null;
}

export function withCORS(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
        // Handle CORS preflight
        const corsResponse = handleCORS(request);
        if (corsResponse) return corsResponse;

        // Call the original handler
        const response = await handler(request);

        // Add CORS headers to the response
        Object.entries(corsHeaders()).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    };
}
