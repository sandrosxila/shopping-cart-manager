import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getToken} from '@/api/token';
 
export async function middleware(request: NextRequest) {

  const token = request.cookies.has('authToken') ? 
    request.cookies.get('authToken')!.value : 
    await getToken();
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set('authToken', token);
 
  return response
}