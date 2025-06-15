import { Button } from 'flowbite-react';
import type { ButtonProps } from './../../types.tsx';

export default function ModelActionButton({ onClick, text, type, variant = 'default' }: ButtonProps) {
    const variantColors = {
        default: 'blue',
        cancel: 'gray',
        failure: 'red', 
        create: 'green',
        edit: 'yellow',
      };

    return (
        <Button type={type} onClick={onClick} color={variantColors[variant] || variantColors.default}>
            {text}
        </Button>
    );
}