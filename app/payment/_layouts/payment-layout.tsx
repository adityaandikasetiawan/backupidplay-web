'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  subscriptionRetailEntriProspekSchema,
  SubscriptionRetailEntriProspekType
} from '@/lib/validations/subscription-retail-entri-prospek';
import { NextPage } from 'next';
import { PaymentType } from '@/lib/validations/payment';
import { useRouter } from 'next/navigation';
import { UserCookieType } from '@/actions/save-user';

interface IProps {
  token: string;
  user: UserCookieType;
}

const PaymentLayout: NextPage<IProps> = ({ token, user }) => {
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const navigate = useRouter();

  const form = useForm<SubscriptionRetailEntriProspekType>({
    resolver: zodResolver(subscriptionRetailEntriProspekSchema),
    defaultValues: {
      zip_code: '15111',
      provider_id: '',
      fullname: '',
      email: '',
      address: '',
      phone: '',
      latitude: '',
      longitude: '',
      ktp: '',
      services: '',
      harga: '',
      product_code: 'RTL863'
    }
  });

  // Check if geolocation is supported
  const canUseGeolocation = typeof window !== 'undefined' && 'geolocation' in navigator;

  // Function to get current location
  const getCurrentLocation = useCallback(() => {
    setGeoError(null);

    if (!canUseGeolocation) {
      setGeoError('Geolocation tidak didukung di browser ini.');
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Update form with coordinates
        form.setValue('latitude', latitude.toString());
        form.setValue('longitude', longitude.toString());

        setGeoLoading(false);
        console.log('Location obtained:', { latitude, longitude });
      },
      (geoError) => {
        const message =
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Izin lokasi ditolak. Silakan isi koordinat secara manual.'
            : geoError.code === geoError.POSITION_UNAVAILABLE
              ? 'Lokasi tidak tersedia. Silakan isi koordinat secara manual.'
              : geoError.code === geoError.TIMEOUT
                ? 'Permintaan lokasi timeout. Silakan isi koordinat secara manual.'
                : 'Gagal mendapatkan lokasi. Silakan isi koordinat secara manual.';
        setGeoError(message);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [canUseGeolocation, form]);

  // Auto-request location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleCreatePayment = (values: PaymentType) => {
    (async () => {
      try {
        const resp = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(values)
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          toast.error(data?.error?.message || 'Gagal membuat payment.');
          return;
        }
        toast.success('Payment submitted successfully');
        if (data?.data?.payment_url) {
          navigate.push(data.data.payment_url);
        }
        form.reset();
      } catch (err) {
        toast.error('Terjadi kesalahan jaringan.');
      }
    })();
  };

  const onSubmit = async (values: SubscriptionRetailEntriProspekType) => {
    setLoading(true);
    setGeoError(null);
    try {
      const resp = await fetch('/api/subscription/retail/entri-prospek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(values)
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        toast.error(data?.error?.message || 'Gagal membuat subscription.');
        setLoading(false);
        return;
      }
      toast.success('Subscription submitted successfully');
      form.reset();
      // Jika ingin lanjut ke payment, bisa panggil handleCreatePayment di sini
      handleCreatePayment({
        task_id: user.task_id[0] || '',
        gateway: 'MIDTRANS',
        source: 'MOBILE'
      });
    } catch (err) {
      toast.error('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Ringkasan Pembayaran (Smaller Card) */}
        <Card className="bg-neutral-100 p-6 rounded-xl shadow-md lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pembayaran</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp500.000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>Rp50.000</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>Rp450.000</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-green-700 text-white">Check out</Button>
          <p className="text-center text-sm text-muted-foreground mt-1">
            Bayar 10 Bulan, Dapat 12 Bulan
          </p>

          {/* Promo Code */}
          <div className="mt-4 border-t pt-2">
            <p className="mb-1 text-sm font-medium">Promo code</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                className="bg-neutral-200"
              />
              <Button className="bg-green-700 text-white">Apply</Button>
            </div>
          </div>
        </Card>

        {/* Right: Metode Pembayaran */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:col-span-2"
          >
            <Card className="bg-white p-6 rounded-xl shadow-md border-0">
              <h2 className="text-lg font-semibold">Metode Pembayaran</h2>

              {/* Metode Buttons */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <Button
                  type="button"
                  className="w-full border border-green-600 bg-orange-100 text-green-700 font-medium justify-center"
                >
                  📦 Pay with card
                </Button>
                <Button
                  type="button"
                  className="w-full bg-neutral-200 text-gray-700 justify-center"
                >
                  ⚙️ Checkout with PayLater
                </Button>
                <Button
                  type="button"
                  className="w-full bg-neutral-200 text-gray-700 justify-center"
                >
                  Checkout with Apple Pay
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <Input
                  placeholder="Card number*"
                  className="bg-neutral-100"
                />
                <Input
                  placeholder="Expiration*"
                  className="bg-neutral-100"
                />
                <Input
                  placeholder="CVV*"
                  className="bg-neutral-100"
                />
              </div> */}

              {/* <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="billing" />
                <label
                  htmlFor="billing"
                  className="text-sm text-gray-700"
                >
                  Use shipping address as billing address
                </label>
              </div> */}

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Full name*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Phone number*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="name@example.com*"
                        className="bg-neutral-100"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Address*"
                        className="bg-neutral-100"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ktp"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="KTP Number (Optional)"
                        className="bg-neutral-100"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City + Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Zip code*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="provider_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Provider ID*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={geoLoading ? 'Getting location...' : 'Latitude*'}
                          className="bg-neutral-100"
                          disabled={loading || geoLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={geoLoading ? 'Getting location...' : 'Longitude*'}
                          className="bg-neutral-100"
                          disabled={loading || geoLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Geolocation status */}
              {(geoLoading || geoError) && (
                <div className="mb-3">
                  {geoLoading && (
                    <p className="text-sm text-blue-600">📍 Mendapatkan lokasi Anda...</p>
                  )}
                  {geoError && (
                    <div className="flex items-center justify-between text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <span>{geoError}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={getCurrentLocation}
                        className="ml-2 text-xs"
                      >
                        Coba Lagi
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Services*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Harga*"
                          className="bg-neutral-100"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="product_code"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Product Code*"
                        className="bg-neutral-100"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Order'}
              </Button>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default PaymentLayout;
