import { FileText, X } from 'lucide-react'

const TopBar = () => {
    const documents = [
        { id: 1, name: 'Document 1' },
        { id: 2, name: 'Document 2' },
        // { id: 3, name: 'Document 3' },
        // { id: 4, name: 'Document 4' },
        // { id: 5, name: 'Document 5' },
    ]
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 z-40">
        <div className="flex items-center overflow-hidden sidebar-scroll gap-4">
            
            {/*  onClick={onAddDocument} */}
            {/* POPOP ÇIKMALI!!!!!!!!!! */}
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors whitespace-nowrap">
                <FileText size={16} />
                <span className="font-medium">Döküman Seç</span>
            </button>

            {documents.length > 0 && (
                <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-2">
                        {documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-2xl whitespace-nowrap">
                                <FileText size={14} className="text-gray-600 dark:text-gray-400"/>
                                <span className="text-sm text-gray-900 dark:text-white">
                                    {doc.name}
                                </span>
                                
                                {/* onClick={() => onRemoveDocument(doc.id)} */}
                                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                    <X size={16} />
                                </button>

                            </div> 
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default TopBar