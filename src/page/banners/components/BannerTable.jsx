import BannerTableRow from "./BannerTableRow";

const BannerTable = ({ banners, onDelete, initialIndex }) => {
    const rows = banners.map((each) => (
        <BannerTableRow key={each.id} banner={each} onDelete={onDelete} indexNumber={initialIndex++} />
    ));

    return (
        <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-700 border table-auto">
                <thead className="bg-green-200 divide-y">
                    <tr>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
                            No
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
                            ID
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide w-40">
                            Image
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap max-w-min">
                            Product id
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                            Create at
                        </th>
                        <th className="border border-slate-600 p-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
};

export default BannerTable;
