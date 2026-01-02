// Define the possible values for the registration code
export type RegistrationCode =
  | 'application'
  | 'open'
  | 'invite only'
  | 'closed'
  | 'unknown';

// Define the structure of the Forum object
export type Forum = {
  id: string; // A unique identifier (similar to 'slug', e.g. 'abook-link')
  name: string; // The name to display (e.g. 'ABook.link')
  registration: RegistrationCode; // Registration status (e.g. 'invite only')
  content: string; // Description of the content (e.g. 'Audiobooks', 'English', etc.)
  opened: string; // Optional date or status, e.g. '2025-12-24' or 'never'
};
