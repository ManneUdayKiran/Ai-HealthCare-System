
import React from 'react';
import { cn } from '@/hooks/lib/utils';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  content: string;
  className?: string;
}

export const UserMessage: React.FC<MessageProps> = ({ content, className }) => {
  return (
    <div className={cn("flex items-start gap-3 ml-auto max-w-[80%]", className)}>
      <div className="flex-1 bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none">
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
        <User className="h-4 w-4" />
      </div>
    </div>
  );
};

export const AIMessage: React.FC<MessageProps> = ({ content, className }) => {
  return (
    <div className={cn("flex items-start gap-3 mr-auto max-w-[80%]", className)}>
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex-1 bg-gray-100 p-3 rounded-lg rounded-tl-none">
        <p className="whitespace-pre-wrap break-words text-gray-800">{content}</p>
      </div>
    </div>
  );
};
