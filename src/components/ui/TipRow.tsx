
import type { TipRowProps } from './../../types';

export default function TipRow({ tip, lang }: TipRowProps) {

    return (
        <div
            key={tip.id}
            className="grid grid-cols-2 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md">
            <div className="flex justify-start">{tip.title[lang]}</div>
            <div className="flex justify-start">{tip.description[lang]}</div>
        </div>
    );
}