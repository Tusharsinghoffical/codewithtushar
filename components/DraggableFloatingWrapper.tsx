import React, { useState, useRef, useEffect, useCallback } from 'react';

interface DraggableFloatingWrapperProps {
  id: string;
  initialBottom?: number;
  initialRight?: number;
  initialLeft?: number;
  initialTop?: number;
  className?: string;
  zIndex?: number;
  children: React.ReactNode;
}

export const DraggableFloatingWrapper: React.FC<DraggableFloatingWrapperProps> = ({
  id,
  initialBottom,
  initialRight,
  initialLeft,
  initialTop,
  className = '',
  zIndex = 120,
  children,
}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPosX: number; initialPosY: number; hasMoved: boolean }>({
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
    hasMoved: false,
  });

  // Calculate default position on first mount or resize
  const computeInitialPosition = useCallback(() => {
    if (typeof window === 'undefined') return { x: 20, y: 100 };
    
    // Check localStorage first
    try {
      const saved = localStorage.getItem(`pos_${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          const clampedX = Math.max(10, Math.min(window.innerWidth - 70, parsed.x));
          const clampedY = Math.max(10, Math.min(window.innerHeight - 70, parsed.y));
          return { x: clampedX, y: clampedY };
        }
      }
    } catch {
      // ignore
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = 20;
    let y = vh - 100;

    if (initialLeft !== undefined) {
      x = initialLeft;
    } else if (initialRight !== undefined) {
      x = vw - initialRight - 64;
    }

    if (initialTop !== undefined) {
      y = initialTop;
    } else if (initialBottom !== undefined) {
      y = vh - initialBottom - 64;
    }

    return {
      x: Math.max(10, Math.min(vw - 70, x)),
      y: Math.max(10, Math.min(vh - 70, y)),
    };
  }, [id, initialBottom, initialRight, initialLeft, initialTop]);

  useEffect(() => {
    setPosition(computeInitialPosition());

    const handleResize = () => {
      setPosition(prev => {
        if (!prev) return computeInitialPosition();
        return {
          x: Math.max(10, Math.min(window.innerWidth - 70, prev.x)),
          y: Math.max(10, Math.min(window.innerHeight - 70, prev.y)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [computeInitialPosition]);

  // Start dragging handler (Mouse or Touch)
  const handleStart = (clientX: number, clientY: number) => {
    if (!position) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialPosX: position.x,
      initialPosY: position.y,
      hasMoved: false,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only primary mouse button (left click)
    if (e.button !== 0) return;
    // Don't drag if user is typing inside an input/textarea
    const target = e.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(target.tagName)) return;

    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(target.tagName)) return;

    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  // Move & End Listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const deltaX = clientX - dragStartRef.current.startX;
      const deltaY = clientY - dragStartRef.current.startY;

      if (Math.hypot(deltaX, deltaY) > 5) {
        dragStartRef.current.hasMoved = true;
      }

      const newX = dragStartRef.current.initialPosX + deltaX;
      const newY = dragStartRef.current.initialPosY + deltaY;

      const clampedX = Math.max(8, Math.min(window.innerWidth - (nodeRef.current?.offsetWidth || 60) - 8, newX));
      const clampedY = Math.max(8, Math.min(window.innerHeight - (nodeRef.current?.offsetHeight || 60) - 8, newY));

      setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (position) {
        try {
          localStorage.setItem(`pos_${id}`, JSON.stringify(position));
        } catch {
          // ignore
        }
      }
    };

    // Capture click after drag to prevent inadvertent trigger of links/buttons
    const handleClickCapture = (e: MouseEvent) => {
      if (dragStartRef.current.hasMoved) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('click', handleClickCapture, { capture: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('click', handleClickCapture, { capture: true });
    };
  }, [isDragging, position, id]);

  if (!position) return null;

  return (
    <div
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? zIndex + 50 : zIndex,
        touchAction: 'none',
      }}
      className={`select-none cursor-grab active:cursor-grabbing transition-shadow ${
        isDragging ? 'shadow-2xl scale-105 opacity-90' : ''
      } ${className}`}
      title="Drag to reposition anywhere on screen"
    >
      {children}
    </div>
  );
};

export default DraggableFloatingWrapper;
