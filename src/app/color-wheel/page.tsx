import { ColorWheel } from '@/components/colorwheel/ColorWheel';

export default function ColorWheelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ColorWheel />
      </div>
    </div>
  );
}
