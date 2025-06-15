import { Button } from 'flowbite-react';
import type { ButtonProps } from './../../types.tsx';

export default function CreateButton({ onClick, text }: ButtonProps) {
    return (
        <div className="flex justify-end mb-4">
            <Button onClick={onClick}>{ text }</Button>
        </div>
    );
}