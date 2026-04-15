import { BaseSkill } from '../core/base.skill.js';

export class DragDropSkill extends BaseSkill {
  async run(input) {
    console.log('[DragDropSkill] Emitting Drag and Drop logic generation...');

    const reactCode = `
import React, { useState } from 'react';

export const DraggableList = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems || ['Item 1', 'Item 2', 'Item 3']);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };

  const onDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex');
    if(dragIndex === dropIndex) return;

    const newItems = [...items];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setItems(newItems);
  };

  return (
    <ul className="draggable-list p-4 bg-gray-50 rounded shadow">
      {items.map((item, idx) => (
        <li 
            key={idx}
            draggable
            onDragStart={(e) => onDragStart(e, idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, idx)}
            className="p-3 mb-2 bg-white border border-gray-200 rounded cursor-move hover:bg-blue-50 transition-colors"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
`;

    return {
        artifact: 'DraggableList',
        code: reactCode.trim(),
        instructions: 'Render DraggableList in your React tree. It uses HTML5 native drag and drop API.'
    };
  }
}