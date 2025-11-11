import React, { useState } from 'react'
import { Upload, FileText, Loader2, CheckCircle, X } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
      const [uploadedFiles, setUploadedFiles] = useState([]);
      const [notification, setNotification] = useState(null);
      
      const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
      };
    
      const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
          id: Date.now() + Math.random(),
          file, //gerçek dosya nesnesi
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          status: 'processing',
          progress: 0
        }));
        
        setUploadedFiles(prev => [...prev, ...newFiles]);
        
        // parent a haber veriliyor
        if(onFileSelect) {
          onFileSelect(files) // UploadDocument e dosya dizisini gönderiyoruz
        }

        // yükleme süreci
        newFiles.forEach((file, index) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadedFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            ));
            
            if (progress >= 100) {
              clearInterval(interval);
              setUploadedFiles(prev => prev.map(f => 
                f.id === file.id ? { ...f, status: 'completed' } : f
              ));
              if (index === newFiles.length - 1) {
                showNotification('Tüm dosyalar başarıyla yüklendi ve işlendi');
              }
            }
          }, 200);
        });
      };
    
      const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      };
    

  return (
    <div className="pt-4"> 
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
       {/* <h2 className="text-xl font-semibold text-white mb-4">Doküman Yükleme</h2>
        <p className="text-white/60 mb-6">Dokümanlarınızı yükleyin. Sistem otomatik olarak chunk'lara ayırır ve embedding oluşturur.</p> */}
        
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-white/5 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="mb-3 text-white/40" size={48} />
            <p className="mb-2 text-white font-medium">Dosya yüklemek için tıklayın</p>
            <p className="text-sm text-white/40">PDF, DOCX, TXT, MD desteklenir</p>
          </div>
          <input type="file" className="hidden" multiple onChange={handleFileUpload} accept=".pdf,.docx,.txt,.md" />
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mt-2">
          <h3 className="text-lg font-semibold text-white mb-4">Yüklenen Dosya</h3>
          <div className="space-y-3">
            {uploadedFiles.map(file => (
              <div key={file.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="text-purple-400" size={20} />
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-sm text-white/40">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'completed' ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <Loader2 className="animate-spin text-purple-400" size={20} />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-white/10 rounded transition-all"
                    >
                      <X className="text-white/60" size={18} />
                    </button>
                  </div>
                </div>
                {file.status === 'processing' && (
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload