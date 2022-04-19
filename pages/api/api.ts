// Types
import { FetchVariables } from '../../types/types';

// Constants
const API_URL: string = process.env.API_URL || '';

async function fetchApi(query: string, { variables }: FetchVariables = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) {
    console.log(errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API ' + JSON.stringify(errors, null, 2));
  }

  return data;
}
