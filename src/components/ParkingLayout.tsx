import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const ParkingLayout: React.FC = () => {
  const navigate = useNavigate();
  const parkingSlots = useStore(state => state.parkingSlots);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleSlotClick = (slotId: string, status: 'available' | 'occupied') => {
    if (status === 'occupied') {
      alert(`Slot ${slotId} is already occupied.`);
    } else {
      navigate(`/booking?slotId=${slotId}`);
    }
  };

  const getSlotColor = (status: 'available' | 'occupied') => {
    return status === 'available' ? '#10b981' : '#ef4444';
  };

  // base resolution
  const virtualWidth = 500;
  const scale = dimensions.width > 0 ? dimensions.width / virtualWidth : 1;
  const finalScale = Math.min(scale, 1.4); // limit scale

  // center mobile layout
  const offsetX = dimensions.width > virtualWidth * finalScale 
     ? (dimensions.width - (virtualWidth * finalScale)) / 2 
     : 0;

  return (
    <div ref={containerRef} className="w-full h-[550px] bg-slate-50/50 rounded-2xl overflow-hidden shadow-inner border border-slate-200 mt-6 relative cursor-grab active:cursor-grabbing">
      <Stage 
        width={dimensions.width} 
        height={dimensions.height}
        draggable
      >
        <Layer x={offsetX} scaleX={finalScale} scaleY={finalScale}>
          {parkingSlots.map((slot) => {
            const w = slot.size === 'large' ? 120 : slot.size === 'medium' ? 100 : 80;
            const h = 55;

            return (
              <Group 
                key={slot.id} 
                x={slot.x} 
                y={slot.y}
                onClick={() => handleSlotClick(slot.id, slot.status)}
                onTap={() => handleSlotClick(slot.id, slot.status)}
                onMouseEnter={() => {
                  document.body.style.cursor = slot.status === 'available' ? 'pointer' : 'not-allowed';
                }}
                onMouseLeave={() => {
                  document.body.style.cursor = 'default';
                }}
              >
                <Rect
                  width={w}
                  height={h}
                  fill={getSlotColor(slot.status)}
                  cornerRadius={10}
                  shadowColor={getSlotColor(slot.status)}
                  shadowBlur={12}
                  shadowOpacity={0.4}
                  shadowOffsetY={4}
                />
                <Text
                  text={slot.id}
                  width={w}
                  height={h}
                  align="center"
                  verticalAlign="middle"
                  fill="white"
                  fontSize={18}
                  fontFamily="Inter, sans-serif"
                  fontStyle="bold"
                />
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
