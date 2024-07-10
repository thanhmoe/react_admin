import CategoryTableRow from "./CategoryTableRow"

const CategoryTable = ({ categories }) => {
   const rows = categories.map(
      each => <CategoryTableRow key={each.id} category={each} />
   )

   return (
      <div className="overflow-x-auto my-2">
         <table className="min-w-full divide-y divide-gray-500 border table-auto">
            <thead className="bg-green-200 divide-y">
               <tr>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap max-w-min">
                     ID
                  </th>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/4">
                     Name
                  </th>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                     Description
                  </th>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                     Create at
                  </th>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">
                     Modify at
                  </th>
                  <th className="border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                     Action
                  </th>
               </tr>
            </thead>
            <tbody>
               {rows}
            </tbody>
         </table>
      </div>
   )
}

export default CategoryTable