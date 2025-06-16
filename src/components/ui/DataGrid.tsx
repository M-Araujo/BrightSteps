type DataGridProps<T> = {
    gridHeader: { id: number; title: string }[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

export default function DataGrid<T>({ gridHeader, data, renderRow }: DataGridProps<T>) {

    const gridColsClassMap = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
    };
    const gridColsClass = gridColsClassMap[gridHeader.length] || 'md:grid-cols-1';
    console.log(gridColsClass);
    return (
        <div className="overflow-x-auto">

            <div className={`grid grid-cols-1 ${gridColsClass} py-2 mb-2 text-sm font-medium `}>

                {gridHeader.map((item) => (
                    <span key={item.id}>{item.title}</span>
                ))
                }
            </div>
            <div className="space-y-2 text-sm font-normal">
                {data.map((item, index) => renderRow(item, index))}
            </div>
        </div>
    );
}