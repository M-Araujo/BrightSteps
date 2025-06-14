
import type { PageTitleProps } from './../../types';

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <h1 className="text-2xl font-bold mb-8 border-b pb-2 border-[var(--color-muted)]">{title}</h1>
    );
}