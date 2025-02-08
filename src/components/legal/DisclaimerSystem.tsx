import { useState } from 'react';

interface DisclaimerProps {
  onAccept: () => void;
  onDecline?: () => void;
}

export default function DisclaimerSystem({ onAccept, onDecline }: DisclaimerProps) {
  const [hasRead, setHasRead] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Educational Purpose Disclaimer
          </h2>

          <div className="prose prose-sm max-w-none space-y-4">
            <section>
              <h3 className="text-lg font-semibold">1. Educational Purpose Only</h3>
              <p>
                This hair color education platform is designed SOLELY for educational and 
                informational purposes. The content, tools, and features provided are intended 
                to teach general hair coloring principles and are NOT a substitute for 
                professional training or certification.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">2. Not Professional Advice</h3>
              <p>
                The information provided does not constitute professional advice. All color 
                formulations, processing times, and techniques shown are generic examples 
                for educational purposes only and should not be used as direct instructions 
                for actual hair coloring services.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">3. No Brand Affiliation</h3>
              <p>
                This platform is not affiliated with, endorsed by, or sponsored by any 
                hair color manufacturers or brands. Any references to color systems or 
                techniques are generic and based on universal color theory principles.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">4. Professional Consultation Required</h3>
              <p>
                Always consult a licensed hair care professional before attempting any hair 
                coloring service. Professional stylists have the training and expertise 
                necessary to:
              </p>
              <ul className="list-disc pl-5">
                <li>Assess hair condition and history</li>
                <li>Determine appropriate products and techniques</li>
                <li>Ensure safe application and processing</li>
                <li>Handle any complications that may arise</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">5. No Guarantees</h3>
              <p>
                We make no guarantees or warranties about the accuracy, completeness, or 
                adequacy of the information provided. Results from applying these educational 
                concepts may vary significantly based on:
              </p>
              <ul className="list-disc pl-5">
                <li>Individual hair characteristics and condition</li>
                <li>Previous chemical treatments and color history</li>
                <li>Product selection and quality</li>
                <li>Application technique and timing</li>
                <li>Environmental factors</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">6. Limitation of Liability</h3>
              <p>
                By using this platform, you agree that we shall not be liable for any 
                damages arising from the use or inability to use these educational materials, 
                including but not limited to direct, indirect, incidental, punitive, and 
                consequential damages.
              </p>
            </section>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasRead}
                onChange={(e) => setHasRead(e.target.checked)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-700">
                I have read, understood, and agree to the above disclaimer
              </span>
            </label>

            <div className="flex space-x-4">
              <button
                onClick={onAccept}
                disabled={!hasRead}
                className={`flex-1 px-4 py-2 rounded-md text-white ${
                  hasRead 
                    ? 'bg-pink-600 hover:bg-pink-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Accept & Continue
              </button>
              {onDecline && (
                <button
                  onClick={onDecline}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Decline
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
