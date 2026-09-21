"use client"

import { Tag, X, EuroIcon, Paintbrush2, FaceGrinningIcon } from "lucide-react";
import type { Category } from '@/types/finance';
import { useState, type ChangeEvent } from 'react';

type CategoryMenuProps = {
  categoryMenu: boolean
  onToggle: () => void
  onAddCategory: (category: Category) => void
}

export default function CategoryMenu({ categoryMenu, onToggle, onAddCategory }: CategoryMenuProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [color, setColor] = useState('#eb5e28');
  const [emoji, setEmoji] = useState('📁');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(Number(e.target.value));
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(String(e.target.value));
  }

  const handleEmojiChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmoji(e.target.value || '📁');
  }

  const handleAddCategory = () => {
    const category: Category = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount,
      used: 0,
      color,
      emoji,
    }
    onAddCategory(category);
    onToggle();
  }
  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full border-t-0 bg-[#403d39] pb-6 pl-6 text-white transition-transform duration-300 ${
        categoryMenu ? "translate-x-0" : "translate-x-full"
      }`}
    >
    <div className="flex flex-row-reverse">
      <div className="w-12 h-screen bg-[#eb5e28]"></div>
      <div className="pr-12 pt-6">
        <button onClick={onToggle} className="hover:cursor-pointer">
        <X size={28} />
      </button>
      <div className="mt-6">
        <h1 className="text-3xl font-medium text-[#fffcf2]">Add a category</h1>
        <p className="mt-2 text-[#fffcf2cc]">
          Enter a name, amount (budget), color and emoji
        </p>
        <div className="mt-4">
          <label htmlFor="category-name">Name</label>
          <div className="relative">
            <Tag
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              onChange={handleNameChange}
              id="category-name"
              type="text"
              className="border border-[#fffcf2]/20 mt-1 w-full pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="category-name">Amount (budget)</label>
          <div className="relative">
            <EuroIcon
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              onChange={handleAmountChange}
              id="category-amount"
              type="number"
              className="border border-[#fffcf2]/20 mt-1 pl-10 w-full pr-2 pt-2 pb-2 rounded-md focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="category-name">Color (optional)</label>
          <div className="relative">
            <Paintbrush2
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              onChange={handleColorChange}
              id="category-color"
              type="color"
              defaultValue="#eb5e28"
              className="border h-12 pt-2 pb-2 pr-2 pl-10 mt-1 w-full border-[#fffcf2]/20 rounded-md focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="category-name">Emoji (optional)</label>
          <div className="relative">
            <FaceGrinningIcon
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              onChange={handleEmojiChange}
              id="category-emoji"
              type="text"
              className="border w-full border-[#fffcf2]/20 mt-1 pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="w-full  text-right">
            <button onClick={handleAddCategory} className="bg-[#fffcf2] text-[#403d39] font-medium p-2 mt-4 rounded-md hover:cursor-pointer hover:bg-[#fffcf2]/70">Add category</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}
