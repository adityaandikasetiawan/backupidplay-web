'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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

type Product = {
  product_code: string;
  name: string;
  price: number;
};

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '380px',
  borderRadius: '12px'
};

function EntriProspekForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading, user } = useAuth();
  
  // UTM State
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  // Capture UTM from URL and store in sessionStorage
  useEffect(() => {
    const params: UTMParams = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
    };

    // Jika ada UTM di URL, simpan ke sessionStorage
    if (params.utm_source || params.utm_medium || params.utm_campaign) {
      sessionStorage.setItem('utm_params', JSON.stringify(params));
      setUtmParams(params);
    } else {
      // Coba ambil dari sessionStorage jika tidak ada di URL
      const stored = sessionStorage.getItem('utm_params');
      if (stored) {
        setUtmParams(JSON.parse(stored));
      }
    }
  }, [searchParams]);

  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('62');
  const [ktp, setKtp] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ['places']
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      const dummy = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummy);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCurrentLocation(coords);
      },
      () => {
        setCurrentLocation({ lat: -6.200000, lng: 106.816666 });
      }
    );
  }, []);

  useEffect(() => {
    if (zipCode.length >= 5) {
      const fetchProducts = async () => {
        setIsProductLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/common/products?offset=1&list_per_page=10&customer_type=Retail&product_type=NORMAL&zip_code=${zipCode}`
          );
          const data = await response.json();
          if (response.ok && data?.data) {
            setProducts(
              data.data.map((item: any) => ({
                product_code: item.Product_Code,
                name: item.Product_Name,
                price: item.Price
              }))
            );
          } else {
            setProducts([]);
          }
        } catch (error) {
          setProducts([]);
        } finally {
          setIsProductLoading(false);
        }
      };
      fetchProducts();
    } else {
      setProducts([]);
      setSelectedProduct('');
    }
  }, [zipCode]);

  const searchPlaces = useCallback(
    async (query: string) => {
      if (!query.trim() || !isLoaded || !window.google) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      const autocomplete = new google.maps.places.AutocompleteService();
      const request = {
        input: query,
        componentRestrictions: { country: 'id' },
        types: ['establishment', 'geocode']
      } as google.maps.places.AutocompletionRequest;
      autocomplete.getPlacePredictions(request, (predictions, status) => {
        setIsSearching(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions as unknown as PlacePrediction[]);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    },
    [isLoaded]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => searchPlaces(value), 300);
    },
    [searchPlaces]
  );

  const extractPostalCode = (place: google.maps.places.PlaceResult): string => {
    const comps = place.address_components || [];
    for (const c of comps) {
      if (c.types.includes('postal_code')) return c.long_name;
    }
    return '';
  };

  const extractRegion = (place: google.maps.places.PlaceResult) => {
    const comps = place.address_components || [];
    let province = '';
    let city = '';
    for (const c of comps) {
      if (c.types.includes('administrative_area_level_1')) {
        province = c.long_name;
      }
      if (c.types.includes('administrative_area_level_2')) {
        city = c.long_name;
      }
    }
    setProvinsi(province);
    setKota(city);
  };

  const handleSuggestionSelect = useCallback((suggestion: PlacePrediction) => {
    if (!placesServiceRef.current) return;
    setSearchValue(suggestion.description);
    setShowSuggestions(false);
    setIsSearching(true);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: suggestion.place_id,
      fields: ['geometry', 'formatted_address', 'name', 'address_components']
    };
    placesServiceRef.current.getDetails(request, (place, status) => {
      setIsSearching(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        if (place.geometry && place.geometry.location) {
          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          setCurrentLocation(coords);
          const addr = place.formatted_address || place.name || suggestion.description;
          setSelectedAddress(addr);
          setAddress(addr);
          setZipCode(extractPostalCode(place));
          extractRegion(place);
        }
      }
    });
  }, []);

  const MapComponent = useMemo(() => {
    if (!currentLocation || !isLoaded) return (
      <div className="w-full h-[380px] rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Memuat peta...</p>
      </div>
    );
    return (
      <div className="w-full rounded-lg overflow-hidden border border-gray-200">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          options={{ zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
        >
          <Marker
            position={currentLocation}
            draggable={true}
            onDragEnd={(e) => {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              if (!lat || !lng) return;
              const coords = { lat, lng };
              setCurrentLocation(coords);
              const geocoder = new google.maps.Geocoder();
              geocoder.geocode({ location: coords }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  const place = results[0];
                  const addr = place.formatted_address;
                  setSelectedAddress(addr);
                  setAddress(addr);
                  setZipCode(extractPostalCode(place));
                  extractRegion(place);
                }
              });
            }}
          />
        </GoogleMap>
      </div>
    );
  }, [currentLocation, isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Format email tidak valid. Gunakan format seperti email@contoh.com');
      setSubmitting(false);
      return;
    }

    // Validasi nomor WhatsApp
    const phoneNumber = phone.replace(/\D/g, '');
    if (!phoneNumber.startsWith('62') || phoneNumber.length < 10 || phoneNumber.length > 13) {
      alert('Nomor WhatsApp harus diawali dengan 62 dan panjang total 10-13 digit');
      setSubmitting(false);
      return;
    }

    try {
      const latlng = currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : '';
      const redirectUrl = new URL("https://oss.supercorridor.co.id/idplayform/thankyou.php");
      
      // Form Data
      redirectUrl.searchParams.set("key", "98733234567643fgtfr4eerty77t53w424356t7y8524354657687864534wert6yu7jmngrdWF$$z5678yun");
      redirectUrl.searchParams.set("namalengkap", fullname);
      redirectUrl.searchParams.set("nowhatsapp5", phoneNumber);
      redirectUrl.searchParams.set("email", email);
      redirectUrl.searchParams.set("alamatlengkap", address);
      redirectUrl.searchParams.set("provinsi80", provinsi);
      redirectUrl.searchParams.set("kotakabupaten81", kota);
      redirectUrl.searchParams.set("kodepos82", zipCode);
      redirectUrl.searchParams.set("pilihpaket", selectedProduct);
      redirectUrl.searchParams.set("typea86", latlng);
      redirectUrl.searchParams.set("typea88", selectedProduct);
      
      // UTM Parameters - Tambahkan ke redirect URL
      if (utmParams.utm_source) {
        redirectUrl.searchParams.set("utm_source", utmParams.utm_source);
      }
      if (utmParams.utm_medium) {
        redirectUrl.searchParams.set("utm_medium", utmParams.utm_medium);
      }
      if (utmParams.utm_campaign) {
        redirectUrl.searchParams.set("utm_campaign", utmParams.utm_campaign);
      }
      if (utmParams.utm_term) {
        redirectUrl.searchParams.set("utm_term", utmParams.utm_term);
      }
      if (utmParams.utm_content) {
        redirectUrl.searchParams.set("utm_content", utmParams.utm_content);
      }
      
      // Referral Code jika ada
      if (referralCode) {
        redirectUrl.searchParams.set("referral_code", referralCode);
      }

      // Clear UTM dari sessionStorage setelah submit
      sessionStorage.removeItem('utm_params');

      console.log('Redirect URL with UTM:', redirectUrl.toString());
      
      window.location.href = redirectUrl.toString();
    } catch (err) {
      alert("Terjadi kesalahan saat redirect");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-600">Entri Prospek Retail</h1>
      <p className="text-gray-600 mt-1">Pilih lokasi Anda pada peta lalu isi data prospek.</p>

      {/* Debug: Tampilkan UTM yang tertangkap (hapus di production) */}
      {/* {(utmParams.utm_source || utmParams.utm_medium || utmParams.utm_campaign) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
          <p className="font-semibold mb-1">📊 UTM Tracking Detected:</p>
          <div className="flex flex-wrap gap-2">
            {utmParams.utm_source && <span className="bg-blue-100 px-2 py-1 rounded">Source: {utmParams.utm_source}</span>}
            {utmParams.utm_medium && <span className="bg-blue-100 px-2 py-1 rounded">Medium: {utmParams.utm_medium}</span>}
            {utmParams.utm_campaign && <span className="bg-blue-100 px-2 py-1 rounded">Campaign: {utmParams.utm_campaign}</span>}
            {utmParams.utm_term && <span className="bg-blue-100 px-2 py-1 rounded">Term: {utmParams.utm_term}</span>}
            {utmParams.utm_content && <span className="bg-blue-100 px-2 py-1 rounded">Content: {utmParams.utm_content}</span>}
          </div>
        </div>
      )} */}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari alamat atau lokasi..."
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[60] max-h-60 overflow-y-auto">
                {suggestions.map((s) => (
                  <div
                    key={s.place_id}
                    onClick={() => handleSuggestionSelect(s)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{s.structured_formatting.main_text}</p>
                      <p className="text-xs text-gray-500 truncate">{s.structured_formatting.secondary_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Ketik alamat untuk mencari lokasi.</p>
          </div>
          {MapComponent}
          <div className="space-y-1">
            {selectedAddress && (
              <p className="text-sm text-gray-700"><span className="font-medium">Alamat dipilih:</span> {selectedAddress}</p>
            )}
            {currentLocation && (
              <p className="text-xs text-gray-500">Koordinat: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Nama lengkap" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Whatsapp</label>
              <Input
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.startsWith('62')) {
                    if (value.length <= 13) setPhone(value);
                  } else if (value === '' || value.length <= 11) {
                    setPhone('62' + value);
                  }
                }}
                placeholder="6281234567890"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat pemasangan" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
              <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="15111" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produk</label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
                disabled={!zipCode || isProductLoading || products.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isProductLoading ? "Memuat produk..." : "Pilih produk"} />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-[50] max-h-60 overflow-y-auto">
                  {products.map((product) => (
                    <SelectItem
                      key={product.product_code}
                      value={product.product_code}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Referral (opsional)</label>
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Kode referral (6 digit alpha-numeric)"
              maxLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !currentLocation || !selectedProduct}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</span>
            ) : (
              'Berlangganan'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function EntriProspekPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      }>
        <EntriProspekForm />
      </Suspense>
    </div>
  );
}