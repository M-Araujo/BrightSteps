
export default function Card({
    children,
    title,
    className = ''
}: {
    children: React.ReactNode,
    title?: string,
    className?: string
}) {

    return (
        <>
            <div className={`rounded-lg shadow-md p-4 bg-white min-h-40 p-6 text-lg font-medium leading-relaxed ${className}`}>
                {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
                {children}
            </div>

        </>
    );
}