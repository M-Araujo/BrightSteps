
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
            <div className={`card ${className}`} >
                {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
                {children}
            </div>

        </>
    );
}