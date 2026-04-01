import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BannerModal = ({ open, onOpenChange }: IProps) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="sm:max-w-2xl w-full mx-auto space-y-4">
        <button
          className="hidden sm:block absolute top-6 right-6"
          onClick={() => {
            onOpenChange(false);
          }}
        >
          <X />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Find out if reliable, Idplay is available in your area.
          </AlertDialogTitle>
          <AlertDialogDescription>Enter your address below</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 lg:col-span-2">
            <Label>Address</Label>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 px-2 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-500" />
              </div>
              <Input
                autoComplete="off"
                placeholder="APT 123"
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>
              Apt, suite, etc <span className="text-gray-200">(Optional)</span>
            </Label>
            <Input
              autoComplete="off"
              placeholder="APT 123"
            />
          </div>
          <div className="space-y-2">
            <Label>Zip Code</Label>
            <Input
              autoComplete="off"
              placeholder="91284"
            />
          </div>

          <AlertDialogFooter className="sm:col-span-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
              className="w-full sm:w-auto rounded-full"
              type="button"
            >
              Cancel
            </Button>
            <Button className="w-full sm:w-auto gap-2 rounded-full bg-orange-500 text-white hover:bg-orange-400">
              Check Availability
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BannerModal;
