'use client';
import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Loader2 } from 'lucide-react';

type CoverageResult = {
  status?: string;
  message?: string;
  data?: any;
  [key: string]: unknown;
};

type UserLocation = {
  lat: number;
  lng: number;
};

type PlacePrediction = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
};

interface CoverageMapsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userLocation: UserLocation | null;
  result: CoverageResult | null;
  isLoading?: boolean;
  onLocationChange?: (location: UserLocation, address: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
};

const CoverageMaps: React.FC<CoverageMapsProps> = ({
  open,
  onOpenChange,
  userLocation,
  result,
  isLoading = false,
  onLocationChange
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(userLocation);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ['places']
  });

  useEffect(() => {
    setCurrentLocation(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (!open) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      setSearchValue('');
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      setSelectedAddress('');
      setCurrentLocation(userLocation);
    }
  }, [open, userLocation]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (isLoaded && window.google) {
      const dummyDiv = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);


  const searchPlaces = useCallback(
    async (query: string) => {
      if (!query.trim() || !isLoaded || !window.google) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);

      const autocompleteService = new google.maps.places.AutocompleteService();

      const request = {
        input: query,
        componentRestrictions: { country: 'id' },
        types: ['establishment', 'geocode']
      };

      autocompleteService.getPlacePredictions(request, (predictions, status) => {
        setIsSearching(false);

        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    },
    [isLoaded]
  );

  // Handle input change with debouncing
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        searchPlaces(value);
      }, 300); // 300ms debounce
    },
    [searchPlaces]
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: PlacePrediction) => {
      if (!placesServiceRef.current) return;

      setSearchValue(suggestion.description);
      setShowSuggestions(false);
      setIsSearching(true);

      const request = {
        placeId: suggestion.place_id,
        fields: ['geometry', 'formatted_address', 'name']
      };

      placesServiceRef.current.getDetails(request, (place, status) => {
        setIsSearching(false);

        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          if (place.geometry && place.geometry.location) {
            const newLocation: UserLocation = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };

            const address = place.formatted_address || place.name || suggestion.description;

            setCurrentLocation(newLocation);
            setSelectedAddress(address);

            // Call parent callback to trigger coverage check
            if (onLocationChange) {
              onLocationChange(newLocation, address);
            }
          }
        }
      });
    },
    [onLocationChange]
  );
  const MapComponent = useMemo(() => {
    if (!currentLocation || !isLoaded) return null;

    return (
      <div className="w-full rounded-lg overflow-hidden border border-gray-200">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      </div>
    );
  }, [currentLocation, isLoaded]);

  const ResultMessage = useMemo(() => {
    if (isLoading) {
      return (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-600">Memeriksa coverage di lokasi Anda…</p>
        </div>
      );
    }

    // Handle different result formats from API
    if (result) {
      // Case 1: result.data.errors.message (error case)
      if (result?.data?.errors?.message) {
        return (
          <div
            className={cn(
              'p-4 rounded-lg text-sm',
              result?.data?.errors?.message.includes('maaf') ||
                result?.data?.errors?.message.includes('tidak')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            )}
          >
            <p>{result.data.errors.message}</p>
          </div>
        );
      }

      // Case 2: result.data.message (success case)
      if (result?.data?.message) {
        return (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{result.data.message}</p>
          </div>
        );
      }

      // Case 3: result.message (direct message)
      if (result?.message) {
        return (
          <div
            className={cn(
              'p-4 rounded-lg text-sm',
              result.status === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            )}
          >
            <p>{result.message}</p>
          </div>
        );
      }

      // Case 4: Any other result data
      if (result?.data) {
        return (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">Response received</p>
            <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        );
      }

      // Case 5: Result exists but no specific data
      return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">Coverage check completed</p>
          <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      );
    }

    return null;
  }, [isLoading, result]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-orange-600">
            Coverage Area & Lokasi Anda
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Berikut adalah peta lokasi Anda dan informasi coverage area layanan kami.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Maps Section */}
          {currentLocation && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Lokasi Anda</h3>

              {/* Custom Search Bar */}
              {isLoaded && (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      value={searchValue}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Cari alamat atau lokasi..."
                      className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      onBlur={() => {
                        // Delay hiding suggestions to allow clicking on them
                        setTimeout(() => setShowSuggestions(false), 150);
                      }}
                    />
                    {isSearching && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
                    )}
                  </div>

                  {/* Custom Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          onClick={() => handleSuggestionSelect(suggestion)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                        >
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {suggestion.structured_formatting.main_text}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {suggestion.structured_formatting.secondary_text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    Ketik alamat untuk mencari lokasi dan cek coverage area
                  </p>
                </div>
              )}

              {/* Maps */}
              {!isLoaded ? (
                <div className="w-full h-[400px] rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                  <p className="text-gray-500">Memuat peta...</p>
                </div>
              ) : (
                MapComponent
              )}

              {/* Location Info */}
              <div className="space-y-1">
                {selectedAddress && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Alamat:</span> {selectedAddress}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Koordinat: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}

          {/* Result Section */}
          {(ResultMessage || isLoading || result) && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Status Coverage</h3>
              {ResultMessage}

              {/* Debug information - remove in production */}
              {/* {process.env.NODE_ENV === 'development' && result && (
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs">
                  <details>
                    <summary className="cursor-pointer font-mono">Debug: Raw API Response</summary>
                    <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              )} */}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Tutup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CoverageMaps;
