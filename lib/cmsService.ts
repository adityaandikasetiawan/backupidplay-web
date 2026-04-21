export const fetchAPI = async (path: string): Promise<any> => {
  const cmsServerBaseUrl = process.env.CMS_URL || 'http://127.0.0.1:1337';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const requestUrl = typeof window === 'undefined'
    ? `${cmsServerBaseUrl}/api${normalizedPath}`
    : `/api/cms${normalizedPath}`;

  const response = await fetch(requestUrl, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
