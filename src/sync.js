export const syncData = async (households) => {
  // This is where you would integrate your server sync logic
  const response = await fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(households),
  });

  if (!response.ok) throw new Error('Sync failed');
};
