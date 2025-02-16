import { useState } from 'react';
import type { SavedFormula } from '@/types/formula';
import { motion } from 'framer-motion';

interface FormulaCardProps {
  formula: SavedFormula;
  onDelete?: (id: string) => void;
  onApply?: (formula: SavedFormula) => void;
  onEdit?: (formula: SavedFormula) => void;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  formula,
  onDelete,
  onApply,
  onEdit
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{formula.name}</h3>
        <div className="flex space-x-2">
          {onApply && (
            <button
              onClick={() => onApply(formula)}
              className="text-pink-600 hover:text-pink-700"
            >
              Apply
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(formula)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(formula.id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Level {formula.startingLevel} → {formula.targetLevel}</span>
          <span>{formula.developerVolume}Vol</span>
        </div>
        <div className="text-sm text-gray-500">
          Processing Time: {formula.processingTime} minutes
        </div>
      </div>

      {/* Expandable Content */}
      <motion.div
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        {formula.isCustom && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Custom Modifications</h4>
            {formula.customDeveloperVolume && (
              <div className="text-sm text-gray-600">
                Developer: {formula.customDeveloperVolume}Vol
              </div>
            )}
            {formula.customProcessingTime && (
              <div className="text-sm text-gray-600">
                Processing Time: {formula.customProcessingTime} minutes
              </div>
            )}
            {formula.customMixingRatio && (
              <div className="text-sm text-gray-600">
                Mixing Ratio: {formula.customMixingRatio}
              </div>
            )}
            {formula.customNotes && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Notes:</span>
                <p className="mt-1">{formula.customNotes}</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Expand/Collapse Button */}
      <button
        onClick={toggleExpand}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </motion.div>
  );
};
