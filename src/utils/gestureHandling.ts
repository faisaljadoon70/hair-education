import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from 'framer-motion';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export function useSwipeGesture(config: SwipeConfig = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50
  } = config;

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], direction: [dx, dy], distance }) => {
        if (distance > threshold) {
          if (dx > 0 && onSwipeRight) onSwipeRight();
          if (dx < 0 && onSwipeLeft) onSwipeLeft();
          if (dy > 0 && onSwipeDown) onSwipeDown();
          if (dy < 0 && onSwipeUp) onSwipeUp();
        }
      }
    },
    {
      drag: {
        threshold: 0,
        filterTaps: true,
        rubberband: true
      }
    }
  );

  return bind;
}

interface PinchZoomConfig {
  onZoomStart?: () => void;
  onZoom?: (scale: number) => void;
  onZoomEnd?: () => void;
  minScale?: number;
  maxScale?: number;
}

export function usePinchZoom(config: PinchZoomConfig = {}) {
  const {
    onZoomStart,
    onZoom,
    onZoomEnd,
    minScale = 0.5,
    maxScale = 3
  } = config;

  const bind = useGesture(
    {
      onPinch: ({ offset: [scale], event }) => {
        event?.preventDefault();
        const clampedScale = Math.min(Math.max(scale, minScale), maxScale);
        if (onZoom) onZoom(clampedScale);
      },
      onPinchStart: () => {
        if (onZoomStart) onZoomStart();
      },
      onPinchEnd: () => {
        if (onZoomEnd) onZoomEnd();
      }
    },
    {
      pinch: { scaleBounds: { min: minScale, max: maxScale } }
    }
  );

  return bind;
}

interface DragConfig {
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: () => void;
  bounds?: { left: number; right: number; top: number; bottom: number };
}

export function useDragGesture(config: DragConfig = {}) {
  const { onDragStart, onDrag, onDragEnd, bounds } = config;

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        if (onDrag) {
          let boundedX = x;
          let boundedY = y;
          
          if (bounds) {
            boundedX = Math.min(Math.max(x, bounds.left), bounds.right);
            boundedY = Math.min(Math.max(y, bounds.top), bounds.bottom);
          }
          
          onDrag(boundedX, boundedY);
        }
      },
      onDragStart: () => {
        if (onDragStart) onDragStart();
      },
      onDragEnd: () => {
        if (onDragEnd) onDragEnd();
      }
    },
    {
      drag: {
        from: [0, 0],
        bounds: bounds ? [bounds.left, bounds.right, bounds.top, bounds.bottom] : undefined
      }
    }
  );

  return bind;
}
