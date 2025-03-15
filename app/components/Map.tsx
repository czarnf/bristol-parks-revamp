import { useLoadScript } from '@react-google-maps/api';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  // ... rest of your map code ...
};

export default Map; 