'use client';

import { ReverseFormula } from '@/components/reverseformula/ReverseFormula';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ReverseFormulaPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ReverseFormula />
      </div>
    </ProtectedRoute>
  );
}
